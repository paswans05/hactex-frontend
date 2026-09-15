/*
 * Hactex React — Tabler icons gallery.
 * Built with the shared component classes, inline token
 * styles, and the 36 inline SVG glyphs on a 24×24 grid. Icons are extracted into
 * a const array; the search box filters by name (case-insensitive).
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

interface Icon {
  name: string;
  paths: string[];
}

const ICONS: Icon[] = [
  { name: 'home', paths: ['M5 12l-2 0l9 -9l9 9l-2 0', 'M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7', 'M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6'] },
  { name: 'settings', paths: ['M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065', 'M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'] },
  { name: 'bell', paths: ['M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6', 'M9 17v1a3 3 0 0 0 6 0v-1'] },
  { name: 'heart', paths: ['M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'] },
  { name: 'star', paths: ['M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245'] },
  { name: 'user', paths: ['M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0', 'M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'] },
  { name: 'search', paths: ['M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M21 21l-6 -6'] },
  { name: 'mail', paths: ['M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10', 'M3 7l9 6l9 -6'] },
  { name: 'calendar', paths: ['M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -4 -2v-12', 'M16 3v4', 'M8 3v4', 'M4 11h16'] },
  { name: 'camera', paths: ['M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2', 'M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'] },
  { name: 'download', paths: ['M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2', 'M7 11l5 5l5 -5', 'M12 4l0 12'] },
  { name: 'trash', paths: ['M4 7l16 0', 'M10 11l0 6', 'M14 11l0 6', 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12', 'M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3'] },
  { name: 'plus', paths: ['M12 5l0 14', 'M5 12l14 0'] },
  { name: 'check', paths: ['M5 12l5 5l10 -10'] },
  { name: 'x', paths: ['M18 6l-12 12', 'M6 6l12 12'] },
  { name: 'folder', paths: ['M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2'] },
  { name: 'file', paths: ['M14 3v4a1 1 0 0 0 1 1h4', 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2'] },
  { name: 'lock', paths: ['M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6', 'M8 11v-4a4 4 0 1 1 8 0v4'] },
  { name: 'eye', paths: ['M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0', 'M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6'] },
  { name: 'phone', paths: ['M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2'] },
  { name: 'map-pin', paths: ['M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0', 'M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0'] },
  { name: 'cart', paths: ['M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', 'M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', 'M17 17h-11v-14h-2', 'M6 5l14 1l-1 7h-13'] },
  { name: 'card', paths: ['M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8', 'M3 10l18 0'] },
  { name: 'chart-bar', paths: ['M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6', 'M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10', 'M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14'] },
  { name: 'briefcase', paths: ['M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9', 'M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2'] },
  { name: 'world', paths: ['M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', 'M3.6 9h16.8', 'M3.6 15h16.8', 'M11.5 3a17 17 0 0 0 0 18', 'M12.5 3a17 17 0 0 1 0 18'] },
  { name: 'gift', paths: ['M3 9a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -2', 'M12 8l0 13', 'M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7'] },
  { name: 'moon', paths: ['M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008'] },
  { name: 'sun', paths: ['M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', 'M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7'] },
  { name: 'bolt', paths: ['M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11'] },
  { name: 'link', paths: ['M9 15l6 -6', 'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464', 'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463'] },
  { name: 'mic', paths: ['M9 5a3 3 0 0 1 3 -3a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3l0 -5', 'M5 10a7 7 0 0 0 14 0', 'M8 21l8 0', 'M12 17l0 4'] },
  { name: 'photo', paths: ['M15 8h.01', 'M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12', 'M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5'] },
  { name: 'rocket', paths: ['M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3', 'M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3'] },
  { name: 'flame', paths: ['M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.294 -2.333 5.588c0 3.704 3.134 6.706 7 6.706c3.866 0 7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235'] },
];

const ICON_STYLE = {
  width: '28px',
  height: '28px',
  display: 'block',
  margin: '0 auto var(--at-space-2)',
} as const;

const CARD_STYLE = {
  padding: 'var(--at-space-4)',
  textAlign: 'center',
  border: '1px solid var(--at-ink)',
} as const;

export default function Tabler(): React.JSX.Element {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ICONS.filter((i) => i.name.includes(q)) : ICONS;
  }, [query]);

  return (
    <>
      <PageHead
        title="Tabler Icons"
        subtitle="Inline SVG glyphs on a 24×24 grid — recolor with currentColor, retheme for free."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Docs</button>
            <button className="at-btn at-btn--primary at-press">Get the set</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div
            className="at-chart__head"
            style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)', flexWrap: 'wrap' }}
          >
            <div>
              <div className="at-chart__title">Browse the set</div>
              <div className="at-eyebrow">
                System set · {filtered.length} shown
              </div>
            </div>
            <div className="at-search" style={{ minWidth: '220px', boxShadow: 'none' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '14px', height: '14px' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="at-input"
                type="search"
                placeholder="Search icons…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ border: 'none', boxShadow: 'none', padding: 0 }}
                aria-label="Search icons"
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 'var(--at-space-3)',
            }}
          >
            {filtered.map((icon) => (
              <button key={icon.name} className="at-card at-press" style={CARD_STYLE} type="button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={ICON_STYLE}
                >
                  {icon.paths.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </svg>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                  {icon.name}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div
                className="at-text-muted"
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--at-space-5)' }}
              >
                No icons match &quot;{query}&quot;.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
