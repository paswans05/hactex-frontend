/*
 * Hactex React — Leaflet maps page.
 * Built with the shared component classes, inline token
 * styles, layer/overlay controls. The controls drive a real tile map — see
 * components/maps/LeafletMap, which owns the library and the token theming.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';
import { BRANCH_COUNT, LeafletMap, type BaseKey } from '../../components/maps/LeafletMap';

interface BaseLayer {
  id: BaseKey;
  name: string;
  desc: string;
}

const BASE_LAYERS: BaseLayer[] = [
  { id: 'positron', name: 'Positron', desc: 'Neutral light' },
  { id: 'dark', name: 'Dark Matter', desc: 'Warm graphite' },
  { id: 'voyager', name: 'Voyager', desc: 'Soft color' },
  { id: 'terrain', name: 'Terrain', desc: 'Topographic' },
];

export default function Leaflet(): React.JSX.Element {
  const [base, setBase] = useState<BaseKey>('positron');
  const [overlays, setOverlays] = useState<Record<string, boolean>>({
    regions: true,
    markers: true,
    heat: false,
  });
  const [opacity, setOpacity] = useState(40);
  // Bumped rather than boolean-toggled so every click drops another pin.
  const [addMarker, setAddMarker] = useState(0);

  return (
    <>
      <PageHead
        title="Leaflet Maps"
        subtitle="Open tile maps with switchable layers, GeoJSON region overlays and accent markers."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Manage layers</button>
            <button
              className="at-btn at-btn--primary at-press"
              onClick={() => setAddMarker((n) => n + 1)}
            >
              Add marker
            </button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Layer controls</div>
                <div className="at-eyebrow">Layers</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <div
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBlockEnd: 'var(--at-space-2)',
                  }}
                >
                  Base layer
                </div>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  {BASE_LAYERS.map((l) => {
                    const active = base === l.id;
                    return (
                      <label
                        key={l.id}
                        className="at-cluster"
                        style={{
                          gap: 'var(--at-space-3)',
                          padding: 'var(--at-space-3)',
                          border: `1px solid ${active ? 'var(--at-accent)' : 'var(--at-ink)'}`,
                          borderRadius: 'var(--at-radius-sm)',
                          background: active ? 'var(--at-accent-wash)' : undefined,
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="at-layer"
                          checked={active}
                          onChange={() => setBase(l.id)}
                          aria-label={l.name}
                        />
                        <span style={{ flex: '1 1 auto', minWidth: 0 }}>
                          <span
                            className="at-text-strong"
                            style={{ display: 'block', fontSize: 'var(--at-text-sm)' }}
                          >
                            {l.name}
                          </span>
                          <span
                            className="at-text-muted"
                            style={{ display: 'block', fontSize: 'var(--at-text-xs)' }}
                          >
                            {l.desc}
                          </span>
                        </span>
                        <span
                          className="at-avatar at-avatar--sm"
                          style={{ background: 'var(--at-surface)', color: 'var(--at-text-muted)' }}
                        >
                          ▦
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Overlays
                </div>
                {[
                  { id: 'regions', label: 'GeoJSON regions', shape: '3px' },
                  { id: 'markers', label: 'Branch markers', shape: '50%' },
                  { id: 'heat', label: 'Density heat', shape: '50%', color: 'var(--at-tertiary-text)' },
                ].map((o) => (
                  <label
                    key={o.id}
                    className="at-cluster"
                    style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                  >
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                      <i
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: o.shape,
                          background: o.color ?? 'var(--at-accent)',
                          display: 'inline-block',
                        }}
                      />
                      <span style={{ fontSize: 'var(--at-text-sm)' }}>{o.label}</span>
                    </span>
                    <button
                      type="button"
                      className={`at-switch${overlays[o.id] ? ' is-on' : ''}`}
                      onClick={() => setOverlays((p) => ({ ...p, [o.id]: !p[o.id] }))}
                    >
                      <span className="at-switch__thumb" />
                    </button>
                  </label>
                ))}
              </div>
              <div>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}
                >
                  <span style={{ fontSize: 'var(--at-text-sm)' }}>Region opacity</span>
                  <span className="at-badge at-badge--neutral">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  aria-label="Region fill opacity"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)', overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">European branches</div>
                <div className="at-eyebrow">
                  Base layer: {BASE_LAYERS.find((l) => l.id === base)?.name} ·{' '}
                  {overlays.markers ? `${BRANCH_COUNT} markers` : 'markers hidden'}
                </div>
              </div>
              <span className="at-badge at-badge--success">
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--at-success)',
                    display: 'inline-block',
                  }}
                />
                OpenStreetMap
              </span>
            </div>
            {/* Real OSM tiles. Zoom control and attribution are Leaflet's own,
                restyled onto the token core by leaflet-theme.css. */}
            <LeafletMap
              base={base}
              showMarkers={overlays.markers}
              showRegions={overlays.regions}
              showHeat={overlays.heat}
              opacity={opacity}
              addMarkerSignal={addMarker}
            />
          </div>
        </div>
      </div>
    </>
  );
}
