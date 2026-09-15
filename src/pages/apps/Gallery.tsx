/*
 * Hactex React — Gallery app (fullscreen, no sidebar).
 * Built with the shared component classes, inline
 * token styles, and demo data. Renders inside <AppShell> (appbar + main);
 * no <PageHead>. Filtering, the lightbox and the filmstrip are React hooks.
 *
 * Page-scoped <style> (the .at-gal-* / .at-lb-* rules from the reference) is
 * rendered inline so the [data-at-route='apps/gallery'] selectors apply once
 * mounted.
 */
import { useMemo, useState } from 'react';

type Layout = 'masonry' | 'grid';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface Image {
  id: number;
  title: string;
  album: string;
  dim: string;
  size: string;
  ratio: string;
  angle: number;
  c1: string;
  c2: string;
  fav: boolean;
  cat: string;
}

const TABS: Tab[] = [
  { id: 'all', label: 'All', count: 48 },
  { id: 'brand', label: 'Brand', count: 12 },
  { id: 'product', label: 'Product', count: 18 },
  { id: 'lifestyle', label: 'Lifestyle', count: 11 },
  { id: 'events', label: 'Events', count: 7 },
];

const SEED_IMAGES: Image[] = [
  { id: 1, title: 'Aurora keyboard — hero', album: 'Product', dim: '3000×2000', size: '6.7 MB', ratio: '3/2', angle: 135, c1: 'var(--at-accent)', c2: 'var(--at-info)', fav: true, cat: 'product' },
  { id: 2, title: 'Studio portrait — Maya', album: 'Lifestyle', dim: '2400×3000', size: '5.1 MB', ratio: '4/5', angle: 160, c1: 'var(--at-tertiary)', c2: 'var(--at-lime)', fav: false, cat: 'lifestyle' },
  { id: 3, title: 'Logo lockup on slate', album: 'Brand', dim: '2000×2000', size: '1.8 MB', ratio: '1/1', angle: 120, c1: 'var(--at-info)', c2: 'var(--at-accent)', fav: false, cat: 'brand' },
  { id: 4, title: 'Launch night — stage', album: 'Events', dim: '3200×1800', size: '8.2 MB', ratio: '16/9', angle: 200, c1: 'var(--at-warning)', c2: 'var(--at-lime)', fav: false, cat: 'events' },
  { id: 5, title: 'Desk lamp — top down', album: 'Product', dim: '2400×2400', size: '4.4 MB', ratio: '1/1', angle: 135, c1: 'var(--at-warning)', c2: 'var(--at-accent)', fav: true, cat: 'product' },
  { id: 6, title: 'Brand gradient swatch', album: 'Brand', dim: '2560×1440', size: '2.2 MB', ratio: '16/9', angle: 110, c1: 'var(--at-accent)', c2: 'var(--at-tertiary)', fav: false, cat: 'brand' },
  { id: 7, title: 'Ceramic mug set', album: 'Product', dim: '2800×2100', size: '5.9 MB', ratio: '4/3', angle: 150, c1: 'var(--at-lime)', c2: 'var(--at-warning)', fav: false, cat: 'product' },
  { id: 8, title: 'Team offsite — Lisbon', album: 'Events', dim: '3000×2000', size: '7.1 MB', ratio: '3/2', angle: 185, c1: 'var(--at-info)', c2: 'var(--at-success)', fav: false, cat: 'events' },
  { id: 9, title: 'Workspace flat-lay', album: 'Lifestyle', dim: '2600×2600', size: '4.8 MB', ratio: '1/1', angle: 140, c1: 'var(--at-success)', c2: 'var(--at-info)', fav: true, cat: 'lifestyle' },
  { id: 10, title: 'Monitor riser — walnut', album: 'Product', dim: '2400×3000', size: '5.5 MB', ratio: '4/5', angle: 130, c1: 'var(--at-warning)', c2: 'var(--at-tertiary)', fav: false, cat: 'product' },
  { id: 11, title: 'Wordmark on white', album: 'Brand', dim: '2400×1200', size: '1.1 MB', ratio: '2/1', angle: 100, c1: 'var(--at-tertiary)', c2: 'var(--at-accent)', fav: false, cat: 'brand' },
  { id: 12, title: 'Coffee & notebook', album: 'Lifestyle', dim: '3000×2000', size: '6.0 MB', ratio: '3/2', angle: 170, c1: 'var(--at-lime)', c2: 'var(--at-info)', fav: false, cat: 'lifestyle' },
  { id: 13, title: 'Packaging unboxing', album: 'Product', dim: '2800×1575', size: '4.9 MB', ratio: '16/9', angle: 145, c1: 'var(--at-accent)', c2: 'var(--at-warning)', fav: false, cat: 'product' },
  { id: 14, title: 'Speaker — keynote close', album: 'Events', dim: '2400×3000', size: '6.3 MB', ratio: '4/5', angle: 210, c1: 'var(--at-info)', c2: 'var(--at-tertiary)', fav: true, cat: 'events' },
  { id: 15, title: 'Color study — terracotta', album: 'Brand', dim: '2200×2200', size: '1.6 MB', ratio: '1/1', angle: 125, c1: 'var(--at-success)', c2: 'var(--at-accent)', fav: false, cat: 'brand' },
  { id: 16, title: 'Morning desk light', album: 'Lifestyle', dim: '3000×1688', size: '5.2 MB', ratio: '16/9', angle: 155, c1: 'var(--at-warning)', c2: 'var(--at-lime)', fav: false, cat: 'lifestyle' },
];

/** Deterministic sample photo per image id (demo placeholder for the gradient
 *  surface). https://picsum.photos keeps the template self-running. */
function imgUrl(img: Image): string {
  const seed = img.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `https://picsum.photos/seed/${seed}/800/800`;
}

export default function Gallery(): React.JSX.Element {
  const [layout, setLayout] = useState<Layout>('masonry');
  const [album, setAlbum] = useState('all');
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [images, setImages] = useState<Image[]>(SEED_IMAGES);
  // index into `images` (the absolute list, not the filtered view) — mirrors
  // the index the lightbox + filmstrip both key off.
  const [lightbox, setLightbox] = useState(false);
  const [index, setIndex] = useState(0);

  const visible = useMemo(
    () => (album === 'all' ? images : images.filter((i) => i.cat === album)),
    [album, images],
  );
  const current = images[index];

  const toggle = (id: number): void => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // click on a wall tile: open lightbox anchored to the absolute index of the
  // clicked image.
  const open = (visIndex: number): void => {
    const img = visible[visIndex];
    const abs = images.findIndex((x) => x.id === img.id);
    setIndex(abs);
    setLightbox(true);
  };

  const next = (): void => setIndex((i) => (i + 1) % images.length);
  const prev = (): void => setIndex((i) => (i - 1 + images.length) % images.length);

  const toggleSelectMode = (): void => {
    setSelectMode((m) => {
      if (m) setSelected([]);
      return !m;
    });
  };

  const toggleCurrentFav = (): void => {
    setImages((prev) => prev.map((im) => (im.id === current.id ? { ...im, fav: !im.fav } : im)));
  };

  return (
    <>
      <style>{`
[data-at-route='apps/gallery'] .at-app-main {
  overflow-y: auto;
  overscroll-behavior: contain;
}
[data-at-route='apps/gallery'] .at-segment__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
[data-at-route='apps/gallery'] .at-segment__btn svg {
  width: var(--at-icon-sm);
  height: var(--at-icon-sm);
  display: block;
}
[data-at-route='apps/gallery'] .at-gal-masonry {
  column-count: 4;
  column-gap: var(--at-space-4);
}
[data-at-route='apps/gallery'] .at-gal-masonry > .at-gal-tile {
  break-inside: avoid;
  margin-block-end: var(--at-space-4);
}
[data-at-route='apps/gallery'] .at-gal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--at-space-4);
}
[data-at-route='apps/gallery'] .at-gal-tile {
  position: relative;
  border-radius: var(--at-radius-sm);
  overflow: hidden;
  border: 1px solid var(--at-ink);
  margin: 0;
}
[data-at-route='apps/gallery'] .at-gal-tile--grid {
  aspect-ratio: 1 / 1;
}
[data-at-route='apps/gallery'] .at-gal-tile.is-selected {
  box-shadow: 0 0 0 2px var(--at-accent);
  border-color: var(--at-accent);
}
[data-at-route='apps/gallery'] .at-gal-surface {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 140px;
  border: 0;
  padding: 0;
  cursor: pointer;
}
[data-at-route='apps/gallery'] .at-gal-grid .at-gal-surface,
[data-at-route='apps/gallery'] .at-gal-tile--grid .at-gal-surface {
  position: absolute;
  inset: 0;
}
[data-at-route='apps/gallery'] .at-gal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* hide until loaded so the gradient fallback shows underneath */
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
[data-at-route='apps/gallery'] .at-gal-img[src] {
  opacity: 1;
}
[data-at-route='apps/gallery'] .at-gal-cap {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: var(--at-space-2);
  padding: var(--at-space-5) var(--at-space-3) var(--at-space-3);
  background: linear-gradient(
    to top,
    color-mix(in oklab, var(--at-ink) 62%, transparent),
    transparent
  );
  opacity: 0;
  transition: opacity 0.12s ease;
  pointer-events: none;
}
[data-at-route='apps/gallery'] .at-gal-tile:hover .at-gal-cap {
  opacity: 1;
}
/* The overlay caption is a title over its meta line. Both were a step
   too low (sm over xs); stepping the pair to base over sm keeps the
   size contrast AND puts the meta line on the paragraph floor. */
[data-at-route='apps/gallery'] .at-gal-cap p:first-child {
  color: var(--at-paper);
  font-size: var(--at-text-base);
  font-weight: 500;
  margin: 0;
}
[data-at-route='apps/gallery'] .at-gal-cap p:last-child {
  color: color-mix(in oklab, var(--at-paper) 72%, transparent);
  font-size: var(--at-text-sm);
  margin-top: 1px;
}
[data-at-route='apps/gallery'] .at-gal-act {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: var(--at-radius-xs);
  background: transparent;
  cursor: pointer;
  font-size: 14px;
}
[data-at-route='apps/gallery'] .at-gal-act.is-fav {
  color: var(--at-warning-text);
}
[data-at-route='apps/gallery'] .at-gal-check {
  position: absolute;
  top: var(--at-space-2);
  inset-inline-start: var(--at-space-2);
  z-index: 2;
}
/* lightbox */
[data-at-route='apps/gallery'] .at-lb {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  flex-direction: column;
  background: color-mix(in oklab, var(--at-ink) 92%, transparent);
}
[data-at-route='apps/gallery'] .at-lb__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--at-space-4);
  padding: var(--at-space-4) var(--at-space-6);
}
[data-at-route='apps/gallery'] .at-lb__title {
  color: var(--at-paper);
  font-size: var(--at-text-lg);
  font-weight: 600;
  max-width: 420px;
  margin: 0;
}
[data-at-route='apps/gallery'] .at-lb__meta {
  color: color-mix(in oklab, var(--at-paper) 60%, transparent);
  font-size: var(--at-text-sm);
  margin-top: 2px;
}
[data-at-route='apps/gallery'] .at-lb__tools {
  display: flex;
  gap: var(--at-space-2);
  flex: 0 0 auto;
}
[data-at-route='apps/gallery'] .at-lb__tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: var(--at-radius-sm);
  background: color-mix(in oklab, var(--at-paper) 8%, transparent);
  color: var(--at-paper);
  cursor: pointer;
}
[data-at-route='apps/gallery'] .at-lb__tool.is-fav {
  color: var(--at-warning-text);
}
[data-at-route='apps/gallery'] .at-lb__stage {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--at-space-4);
  padding: 0 var(--at-space-4);
  min-height: 0;
}
[data-at-route='apps/gallery'] .at-lb__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  border: 0;
  border-radius: 999px;
  background: color-mix(in oklab, var(--at-paper) 8%, transparent);
  color: var(--at-paper);
  font-size: 24px;
  cursor: pointer;
}
[data-at-route='apps/gallery'] .at-lb__frame {
  flex: 1 1 auto;
  max-width: min(960px, 90%);
  max-height: 100%;
  aspect-ratio: 3 / 2;
  margin: 0;
  border-radius: var(--at-radius-sm);
  overflow: hidden;
}
[data-at-route='apps/gallery'] .at-lb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
[data-at-route='apps/gallery'] .at-lb__strip {
  display: flex;
  gap: var(--at-space-2);
  justify-content: center;
  padding: var(--at-space-4) var(--at-space-6);
  overflow-x: auto;
}
[data-at-route='apps/gallery'] .at-lb__thumb {
  flex: 0 0 auto;
  width: 64px;
  height: 44px;
  border: 2px solid transparent;
  border-radius: var(--at-radius-xs);
  cursor: pointer;
  opacity: 0.55;
}
[data-at-route='apps/gallery'] .at-lb__thumb.is-active {
  opacity: 1;
  border-color: var(--at-accent);
}
@media (max-width: 1280px) {
  [data-at-route='apps/gallery'] .at-gal-masonry {
    column-count: 3;
  }
}
@media (max-width: 768px) {
  [data-at-route='apps/gallery'] .at-gal-masonry {
    column-count: 2;
  }
}
@media (max-width: 480px) {
  [data-at-route='apps/gallery'] .at-gal-masonry {
    column-count: 1;
  }
}
`}</style>

      {/* toolbar: filter tabs + sort + view */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--at-space-4)',
          flexWrap: 'wrap',
          marginBlockEnd: 'var(--at-space-5)',
        }}
      >
        <nav style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`at-btn at-btn--ghost at-btn--sm at-press${album === t.id ? ' is-active' : ''}`}
              onClick={() => setAlbum(t.id)}
              aria-selected={album === t.id}
              style={{ border: '1px solid var(--at-ink)' }}
            >
              <span>{t.label}</span>
              <span className="at-badge at-badge--flat">{t.count}</span>
            </button>
          ))}
        </nav>
        <div className="at-segment">
          <button
            className={`at-segment__btn${layout === 'masonry' ? ' is-active' : ''}`}
            onClick={() => setLayout('masonry')}
            aria-label="Masonry layout"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="10" rx="1" />
              <rect x="3" y="15" width="7" height="6" rx="1" />
              <rect x="14" y="3" width="7" height="6" rx="1" />
              <rect x="14" y="11" width="7" height="10" rx="1" />
            </svg>
          </button>
          <button
            className={`at-segment__btn${layout === 'grid' ? ' is-active' : ''}`}
            onClick={() => setLayout('grid')}
            aria-label="Grid layout"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>
        </div>
        <button
          className="at-btn at-btn--outline at-press"
          onClick={toggleSelectMode}
          aria-pressed={selectMode}
        >
          <span>{selectMode ? 'Done' : 'Select'}</span>
        </button>
        <button className="at-btn at-btn--primary at-press">Upload</button>
      </div>

      {/* bulk bar (select mode) */}
      {selectMode && selected.length > 0 && (
        <div
          className="at-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--at-space-3)',
            padding: 'var(--at-space-3) var(--at-space-5)',
            marginBlockEnd: 'var(--at-space-5)',
            background: 'var(--at-accent-wash)',
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--at-text-strong)' }}>
            <span>{selected.length}</span> selected
          </span>
          <span style={{ width: '1px', height: '18px', background: 'var(--at-ink)' }} role="separator" />
          <button className="at-btn at-btn--ghost at-btn--sm at-press">Download</button>
          <button className="at-btn at-btn--ghost at-btn--sm at-press">Add to album</button>
          <button className="at-btn at-btn--ghost at-btn--sm at-press" style={{ color: 'var(--at-danger-text)' }}>
            Delete
          </button>
          <button
            className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
            style={{ marginInlineStart: 'auto' }}
            aria-label="Clear selection"
            onClick={() => setSelected([])}
          >
            ✕
          </button>
        </div>
      )}

      {/* wall */}
      <div className={layout === 'masonry' ? 'at-gal-masonry' : 'at-gal-grid'}>
        {visible.map((img, i) => (
          <figure
            key={img.id}
            className={`at-gal-tile${selected.includes(img.id) ? ' is-selected' : ''}${layout === 'grid' ? ' at-gal-tile--grid' : ''}`}
            style={layout === 'masonry' ? { aspectRatio: img.ratio } : undefined}
          >
            {/* image surface: gradient is a fallback while the photo loads */}
            <button
              type="button"
              className="at-gal-surface"
              style={{ background: `linear-gradient(${img.angle}deg, color-mix(in oklab, ${img.c1} 80%, var(--at-paper)), color-mix(in oklab, ${img.c2} 64%, var(--at-paper)))` }}
              onClick={() => (selectMode ? toggle(img.id) : open(i))}
              aria-label={selectMode ? `Select ${img.title}` : `Open ${img.title} in lightbox`}
            >
              <img className="at-gal-img" src={imgUrl(img)} alt={img.title} loading="lazy" />
              {!selectMode && (
                <span
                  className={`at-gal-act${img.fav ? ' is-fav' : ''}`}
                  style={{
                    position: 'absolute',
                    top: 'var(--at-space-2)',
                    insetInlineEnd: 'var(--at-space-2)',
                    background: 'color-mix(in oklab, var(--at-ink) 40%, transparent)',
                    color: 'var(--at-paper)',
                    pointerEvents: 'none',
                  }}
                >
                  ★
                </span>
              )}
            </button>

            {/* hover overlay caption */}
            <figcaption className="at-gal-cap">
              <div style={{ minWidth: 0 }}>
                <p
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {img.title}
                </p>
                <p>{img.dim} · {img.size}</p>
              </div>
            </figcaption>

            {/* select checkbox */}
            {selectMode && (
              <label
                className="at-gal-check"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(img.id)}
                  onChange={() => toggle(img.id)}
                  aria-label={`Select ${img.title}`}
                />
              </label>
            )}
          </figure>
        ))}
      </div>

      {/* lightbox */}
      {lightbox && current && (
        <div
          className="at-lb"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* top bar */}
          <div className="at-lb__top">
            <div style={{ minWidth: 0 }}>
              <p
                className="at-lb__title"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {current.title}
              </p>
              <p className="at-lb__meta">
                <span>{current.album}</span> · <span>{current.dim}</span> ·{' '}
                <span>{current.size}</span>
              </p>
            </div>
            <div className="at-lb__tools">
              <button
                type="button"
                className={`at-lb__tool${current.fav ? ' is-fav' : ''}`}
                onClick={toggleCurrentFav}
                aria-label="Favorite"
              >
                ★
              </button>
              <button
                type="button"
                className="at-lb__tool"
                onClick={() => setLightbox(false)}
                aria-label="Close viewer"
              >
                ✕
              </button>
            </div>
          </div>
          {/* stage */}
          <div className="at-lb__stage" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false); }}>
            <button type="button" className="at-lb__nav" onClick={prev} aria-label="Previous image">
              ‹
            </button>
            <figure
              className="at-lb__frame"
              style={{ background: `linear-gradient(${current.angle}deg, color-mix(in oklab, ${current.c1} 82%, var(--at-ink)), color-mix(in oklab, ${current.c2} 66%, var(--at-ink)))` }}
            >
              <img className="at-lb__img" src={imgUrl(current)} alt={current.title} />
            </figure>
            <button type="button" className="at-lb__nav" onClick={next} aria-label="Next image">
              ›
            </button>
          </div>
          {/* filmstrip */}
          <div className="at-lb__strip">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                className={`at-lb__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${img.title}`}
                style={{ background: `linear-gradient(${img.angle}deg, color-mix(in oklab, ${img.c1} 80%, var(--at-ink)), color-mix(in oklab, ${img.c2} 64%, var(--at-ink)))` }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
