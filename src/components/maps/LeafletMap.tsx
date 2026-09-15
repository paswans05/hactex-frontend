/*
 * Hactex React — real Leaflet map.
 *
 * The library is imported lazily, like ApexChart, so ~150 kB of Leaflet only
 * lands on the one route that needs it. The stylesheets are static imports —
 * bundlers cannot code-split CSS that sits behind a dynamic import.
 *
 * Everything drawn on top of the tiles (pins, region fill, heat) is coloured
 * from --at-* tokens at draw time and redrawn on at:change, so the map follows
 * theme and preset switches like the rest of the shell. The base tile layer
 * follows the radio group rather than the theme, matching the reference.
 *
 * No router imports, so the component drops into any tree unchanged.
 */
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './leaflet-theme.css';

type LeafletModule = typeof import('leaflet');
type LeafletMapInstance = import('leaflet').Map;
type LeafletLayerGroup = import('leaflet').LayerGroup;
type LeafletTileLayer = import('leaflet').TileLayer;

export type BaseKey = 'positron' | 'dark' | 'voyager' | 'terrain';

/* Base tiles keyed by the page's radio group. CARTO hosts Positron / Dark
   Matter / Voyager; ESRI hosts the terrain raster. */
const BASES: Record<BaseKey, { url: string; attr: string }> = {
  positron: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  terrain: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
    attr: 'Tiles &copy; Esri',
  },
};

/** Branch offices shown as pins. Coordinates are real city centres; `weight`
 *  scales the heat blob so headcount reads as density. */
const BRANCHES: { name: string; coords: [number, number]; note: string; weight: number }[] = [
  { name: 'London', coords: [51.5074, -0.1278], note: 'HQ — 1,240 staff', weight: 1 },
  { name: 'Paris', coords: [48.8566, 2.3522], note: '412 staff', weight: 0.7 },
  { name: 'Amsterdam', coords: [52.3676, 4.9041], note: '298 staff', weight: 0.6 },
  { name: 'Berlin', coords: [52.52, 13.405], note: '367 staff', weight: 0.68 },
  { name: 'Madrid', coords: [40.4168, -3.7038], note: '221 staff', weight: 0.55 },
  { name: 'Milan', coords: [45.4642, 9.19], note: '186 staff', weight: 0.5 },
];

export const BRANCH_COUNT = BRANCHES.length;

/** Coarse polygon around Western Europe — the GeoJSON overlay demo. */
const REGION: GeoJSON.Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [-9.5, 43.5],
      [-9.5, 53.5],
      [2.5, 56.0],
      [12.5, 56.0],
      [16.0, 49.0],
      [16.0, 41.0],
      [3.0, 37.0],
      [-9.5, 43.5],
    ],
  ],
};

/* Stacked translucent discs per branch. Three rings fake a radial falloff
   without pulling in leaflet.heat for one switch. */
const HEAT_RINGS = [
  { radius: 240_000, opacity: 0.1 },
  { radius: 150_000, opacity: 0.12 },
  { radius: 80_000, opacity: 0.16 },
];

/* Leaflet ships UMD (its package `main` is dist/leaflet-src.js), so webpack
   hands back the namespace on `.default` while Vite also hoists the named
   exports. Take whichever is populated, and cache the promise so a remount
   does not re-import. */
let leafletP: Promise<LeafletModule> | null = null;
function loadLeaflet(): Promise<LeafletModule> {
  if (!leafletP) {
    leafletP = import('leaflet').then((m) => {
      const mod = m as unknown as { default?: LeafletModule };
      return mod.default ?? (m as LeafletModule);
    });
  }
  return leafletP;
}

function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export interface LeafletMapProps {
  base: BaseKey;
  showMarkers: boolean;
  showRegions: boolean;
  showHeat: boolean;
  /** Region fill strength, 0–100 (the page's slider value). */
  opacity: number;
  /** Bump to drop a pin at the current centre — the page-head "Add marker". */
  addMarkerSignal: number;
  height?: number;
}

export function LeafletMap({
  base,
  showMarkers,
  showRegions,
  showHeat,
  opacity,
  addMarkerSignal,
  height = 460,
}: LeafletMapProps): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement>(null);
  const L = useRef<LeafletModule | null>(null);
  const map = useRef<LeafletMapInstance | null>(null);
  const baseLayer = useRef<LeafletTileLayer | null>(null);
  const heatLayer = useRef<LeafletLayerGroup | null>(null);
  const regionLayer = useRef<LeafletLayerGroup | null>(null);
  const markerLayer = useRef<LeafletLayerGroup | null>(null);
  const pinLayer = useRef<LeafletLayerGroup | null>(null);
  /* Bumped each time a map instance is built. Every draw effect gates on it,
     which is what makes them run after the async import instead of silently
     no-op'ing against a null map. It counts rather than flips because React's
     dev StrictMode tears the map down and rebuilds it: a boolean would already
     be true on the second pass, so no draw effect would re-run and the fresh
     map would come up with no tiles on it. */
  const [epoch, setEpoch] = useState(0);

  // ── mount ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    void loadLeaflet().then((lib) => {
      // The component may have unmounted while the chunk was in flight.
      if (cancelled || map.current) return;
      L.current = lib;
      const instance = lib.map(host, {
        center: [48.5, 4.0],
        zoom: 4,
        zoomControl: false,
        attributionControl: true,
      });
      lib.control.zoom({ position: 'topleft' }).addTo(instance);
      // Group order is paint order: heat sits under the region fill, which
      // sits under the pins.
      heatLayer.current = lib.layerGroup().addTo(instance);
      regionLayer.current = lib.layerGroup().addTo(instance);
      markerLayer.current = lib.layerGroup().addTo(instance);
      pinLayer.current = lib.layerGroup().addTo(instance);
      map.current = instance;
      setEpoch((n) => n + 1);
    });

    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      // The groups belonged to the removed map; drop them so a draw effect
      // cannot append to an orphan.
      baseLayer.current = null;
      heatLayer.current = null;
      regionLayer.current = null;
      markerLayer.current = null;
      pinLayer.current = null;
    };
  }, []);

  /* Leaflet caches the container size and only recomputes on window resize, so
     collapsing the sidebar (which changes the card's width, not the window's)
     would otherwise leave the tiles cropped against dead grey. */
  useEffect(() => {
    const host = hostRef.current;
    if (!epoch || !host) return;
    const ro = new ResizeObserver(() => map.current?.invalidateSize());
    ro.observe(host);
    return () => ro.disconnect();
  }, [epoch]);

  /* Theme switches change the token values the overlays are drawn from, but
     not the DOM the effects depend on — the tick gives them something to
     depend on so a preset change repaints the pins, region and heat. */
  const [themeTick, setThemeTick] = useState(0);
  useEffect(() => {
    const bump = (): void => setThemeTick((n) => n + 1);
    window.addEventListener('at:change', bump);
    return () => window.removeEventListener('at:change', bump);
  }, []);

  // ── base tiles ─────────────────────────────────────────────────────────
  useEffect(() => {
    const lib = L.current;
    const instance = map.current;
    if (!epoch || !lib || !instance) return;
    const def = BASES[base] ?? BASES.positron;
    if (baseLayer.current) instance.removeLayer(baseLayer.current);
    baseLayer.current = lib
      .tileLayer(def.url, { attribution: def.attr, subdomains: 'abcd', maxZoom: 19 })
      .addTo(instance);
    baseLayer.current.bringToBack();
  }, [epoch, base]);

  // ── branch pins ────────────────────────────────────────────────────────
  useEffect(() => {
    const lib = L.current;
    const layer = markerLayer.current;
    if (!epoch || !lib || !layer) return;
    layer.clearLayers();
    if (!showMarkers) return;
    const fill = token('--at-accent') || '#2563eb';
    BRANCHES.forEach((b) => {
      lib
        .marker(b.coords, { icon: pinIcon(lib, fill) })
        .bindPopup(popupHtml(b.name, b.note))
        .addTo(layer);
    });
  }, [epoch, showMarkers, themeTick]);

  // ── GeoJSON region ─────────────────────────────────────────────────────
  useEffect(() => {
    const lib = L.current;
    const layer = regionLayer.current;
    if (!epoch || !lib || !layer) return;
    layer.clearLayers();
    if (!showRegions) return;
    const accent = token('--at-accent') || '#2563eb';
    lib
      .geoJSON(REGION, {
        style: { color: accent, weight: 2, fillColor: accent, fillOpacity: opacity / 100 },
      })
      .addTo(layer);
  }, [epoch, showRegions, opacity, themeTick]);

  // ── density heat ───────────────────────────────────────────────────────
  useEffect(() => {
    const lib = L.current;
    const layer = heatLayer.current;
    if (!epoch || !lib || !layer) return;
    layer.clearLayers();
    if (!showHeat) return;
    const hot = token('--at-tertiary') || '#7c3aed';
    BRANCHES.forEach((b) => {
      HEAT_RINGS.forEach((ring) => {
        lib
          .circle(b.coords, {
            radius: ring.radius * b.weight,
            stroke: false,
            fillColor: hot,
            fillOpacity: ring.opacity,
            interactive: false,
          })
          .addTo(layer);
      });
    });
  }, [epoch, showHeat, themeTick]);

  // ── "Add marker" ───────────────────────────────────────────────────────
  /* Dropped pins live in their own layer so toggling Branch markers — which
     clears markerLayer wholesale — cannot wipe them. */
  const lastSignal = useRef(addMarkerSignal);
  useEffect(() => {
    const lib = L.current;
    const layer = pinLayer.current;
    if (!epoch || !lib || !layer) return;
    if (addMarkerSignal === lastSignal.current) return;
    lastSignal.current = addMarkerSignal;
    const c = map.current?.getCenter();
    if (!c) return;
    lib
      .marker(c, { icon: pinIcon(lib, token('--at-tertiary') || '#7c3aed') })
      .bindPopup(popupHtml('New marker', `${c.lat.toFixed(3)}, ${c.lng.toFixed(3)}`))
      .addTo(layer);
  }, [epoch, addMarkerSignal]);

  return (
    <div
      ref={hostRef}
      style={{
        position: 'relative',
        height,
        borderRadius: 'var(--at-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--at-ink)',
        background: 'var(--at-surface)',
        // Own stacking context, so Leaflet's internal panes (z-index 400–700)
        // cannot climb over the app header or the sidebar rail.
        zIndex: 0,
      }}
    />
  );
}

/** Circular div-icon colored from tokens so pins match the active theme. */
function pinIcon(lib: LeafletModule, fill: string): import('leaflet').DivIcon {
  return lib.divIcon({
    className: 'at-leaflet-pin',
    html: `<span style="
        display:block;
        width:14px;height:14px;border-radius:50%;
        background:${fill};
        border:2px solid var(--at-paper);
        box-shadow:0 0 0 4px color-mix(in oklab,${fill} 30%,transparent);
      "></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  });
}

function popupHtml(title: string, note: string): string {
  return `<div style="font:600 13px/1.4 var(--at-font-body,inherit)">${title}</div>
    <div style="color:var(--at-text-muted);font-size:12px;margin-top:2px">${note}</div>`;
}
