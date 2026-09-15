/*
 * Hactex React — Media Player app (fullscreen, no sidebar).
 * Built with the shared component classes, inline
 * token styles, and demo data. Renders inside <AppShell> (appbar + main);
 * no <PageHead>. The queue, transport and scrub bar are React hooks.
 *
 * No real audio — UI demo only (transport state is local).
 *
 * Page-scoped <style> (the .at-mp-* rules from the reference) is rendered
 * inline so the [data-at-route='apps/media-player'] selectors apply once
 * mounted.
 */
import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';

// palette shorthands used by the seed tracks/playlists
const C = {
  accent: 'var(--at-accent)',
  cyan: 'var(--at-info)',
  violet: 'var(--at-tertiary)',
  pink: 'var(--at-lime)',
  amber: 'var(--at-warning)',
  emerald: 'var(--at-success)',
};

// glyph → raw inner-SVG markup. The views
// list uses these via $icon(v.glyph); unknown glyphs (e.g. '♥') fall back to
// the literal text.
const GLYPHS: Record<string, string> = {
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  'repeat-one': '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/>',
};

function renderGlyph(glyph: string, size: number): React.JSX.Element {
  const path = GLYPHS[glyph];
  if (path === undefined) {
    return (
      <span style={{ display: 'inline-block', lineHeight: 1 }} aria-hidden="true">
        {glyph}
      </span>
    );
  }
  return <Icon path={path} size={size} />;
}

type Repeat = 'off' | 'all' | 'one';

interface SmartView {
  id: string;
  label: string;
  glyph: string;
  count: number;
}

interface Playlist {
  id: string;
  label: string;
  color: string;
  count: number;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  dur: number;
  angle: number;
  c1: string;
  c2: string;
  fav: boolean;
}

const VIEWS: SmartView[] = [
  { id: 'library', label: 'Library', glyph: 'music', count: 248 },
  { id: 'recent', label: 'Recently played', glyph: 'clock', count: 32 },
  { id: 'favorites', label: 'Favorites', glyph: '♥', count: 54 },
  { id: 'radio', label: 'Stations', glyph: 'radio', count: 12 },
];

const PLAYLISTS: Playlist[] = [
  { id: 'pl1', label: 'Focus Flow', color: C.accent, count: 18 },
  { id: 'pl2', label: 'Deep House Late', color: C.cyan, count: 42 },
  { id: 'pl3', label: 'Morning Acoustic', color: C.amber, count: 24 },
  { id: 'pl4', label: 'Synthwave Drive', color: C.violet, count: 31 },
  { id: 'pl5', label: 'Lo-Fi Study', color: C.pink, count: 60 },
  { id: 'pl6', label: 'Jazz & Rain', color: C.emerald, count: 19 },
  { id: 'pl7', label: 'Workout 140 BPM', color: C.cyan, count: 28 },
];

const SEED_TRACKS: Track[] = [
  { id: 1, title: 'Amber Skyline', artist: 'Aurora Lights', album: 'Glass Atlas', dur: 271, angle: 135, c1: C.accent, c2: C.cyan, fav: true },
  { id: 2, title: 'Slow Tide', artist: 'Mara Vey', album: 'Northern Quiet', dur: 224, angle: 160, c1: C.violet, c2: C.pink, fav: false },
  { id: 3, title: 'Paper Planes', artist: 'The Hollowells', album: 'Field Notes', dur: 198, angle: 120, c1: C.amber, c2: C.accent, fav: false },
  { id: 4, title: 'Midnight Drive', artist: 'Neon Foxes', album: 'Synthwave Drive', dur: 312, angle: 200, c1: C.cyan, c2: C.violet, fav: true },
  { id: 5, title: 'Warm Static', artist: 'Bloom Theory', album: 'Lo-Fi Study Vol. 3', dur: 176, angle: 145, c1: C.pink, c2: C.amber, fav: false },
  { id: 6, title: 'Coastline at Dawn', artist: 'Saoirse Quinn', album: 'Morning Acoustic', dur: 243, angle: 110, c1: C.emerald, c2: C.cyan, fav: false },
  { id: 7, title: 'Brass & Rain', artist: 'Otis Lane Trio', album: 'Jazz & Rain', dur: 289, angle: 170, c1: C.amber, c2: C.pink, fav: true },
  { id: 8, title: 'Pulse Width', artist: 'Kade Moreno', album: 'Workout 140', dur: 205, angle: 185, c1: C.cyan, c2: C.emerald, fav: false },
  { id: 9, title: 'Glasshouse', artist: 'Aurora Lights', album: 'Glass Atlas', dur: 258, angle: 130, c1: C.accent, c2: C.violet, fav: false },
  { id: 10, title: 'Slow Thaw', artist: 'Lena Brandt', album: 'Northern Quiet', dur: 231, angle: 150, c1: C.violet, c2: C.cyan, fav: false },
  { id: 11, title: 'Late Reply', artist: 'The Hollowells', album: 'Field Notes', dur: 189, angle: 140, c1: C.pink, c2: C.accent, fav: false },
  { id: 12, title: 'Long Way Home', artist: 'Saoirse Quinn', album: 'Morning Acoustic', dur: 266, angle: 165, c1: C.amber, c2: C.emerald, fav: true },
];

function fmt(s: number): string {
  const v = Math.max(0, Math.round(s || 0));
  const m = Math.floor(v / 60);
  const r = v % 60;
  return m + ':' + String(r).padStart(2, '0');
}

export default function MediaPlayer(): React.JSX.Element {
  const [q] = useState('');
  const [view, setView] = useState('library');
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(74);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<Repeat>('off');
  const [tracks, setTracks] = useState<Track[]>(SEED_TRACKS);

  const queue = tracks;
  const current = tracks[index];
  const pct = current.dur ? Math.min(100, (position / current.dur) * 100) : 0;

  const toggle = (): void => setPlaying((p) => !p);

  const play = (i: number): void => {
    setIndex(i);
    setPosition(0);
    setPlaying(true);
  };

  const next = (): void => {
    setIndex((i) => (i + 1) % tracks.length);
    setPosition(0);
    setPlaying(true);
  };

  const prev = (): void => {
    if (position > 4) {
      setPosition(0);
      return;
    }
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setPosition(0);
  };

  const cycleRepeat = (): void => {
    setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'));
  };

  // click-to-seek on the scrub bar.
  const scrub = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setPosition(Math.round(ratio * (current.dur || 0)));
  };

  const toggleCurrentFav = (): void => {
    setTracks((prev) => prev.map((t) => (t.id === current.id ? { ...t, fav: !t.fav } : t)));
  };

  // q is demo-only (no filtering wired in the reference either); keep the
  // binding stable without an unused-var lint.
  void q;

  const repeatGlyph = repeat === 'one' ? 'repeat-one' : 'repeat';

  return (
    <>
      <style>{`
@keyframes at-mp-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
[data-at-route='apps/media-player'] .at-mp-rail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--at-space-2);
  padding: var(--at-space-2) var(--at-space-3);
  border: 0;
  border-radius: var(--at-radius-sm);
  cursor: pointer;
  background: transparent;
  transition: background 0.12s ease;
}
[data-at-route='apps/media-player'] .at-mp-rail:hover {
  background: var(--at-canvas);
}
[data-at-route='apps/media-player'] .at-mp-rail.is-active {
  background: var(--at-accent-wash);
}
[data-at-route='apps/media-player'] .at-mp-cover {
  width: 180px;
  height: 180px;
  border-radius: var(--at-radius-md);
  display: flex;
  align-items: flex-end;
  padding: var(--at-space-3);
}
[data-at-route='apps/media-player'] .at-mp-track {
  display: flex;
  align-items: center;
  gap: var(--at-space-3);
  padding: var(--at-space-3) var(--at-space-5);
  border: 0;
  border-block-end: 1px solid var(--at-ink);
  cursor: pointer;
  background: transparent;
  transition: background 0.12s ease;
}
[data-at-route='apps/media-player'] .at-mp-track:hover {
  background: var(--at-canvas);
}
[data-at-route='apps/media-player'] .at-mp-track.is-active {
  background: var(--at-accent-wash);
}
[data-at-route='apps/media-player'] .at-mp-track__cover {
  width: 40px;
  height: 40px;
  border-radius: var(--at-radius-xs);
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-at-route='apps/media-player'] .at-btn--lg {
  width: 44px;
  height: 44px;
}
`}</style>

      <div className="at-row" style={{ gap: 'var(--at-space-4)', alignItems: 'stretch' }}>
        {/* ───── LIBRARY RAIL ───── */}
        <div
          className="at-col-3 at-card"
          style={{
            padding: 'var(--at-space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--at-space-4)',
          }}
        >
          {/* search + add */}
          <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
            <input
              className="at-input"
              type="search"
              placeholder="Search library"
              aria-label="Search library"
              value={q}
              readOnly
            />
            <button className="at-btn at-btn--primary at-btn--block at-press">Add media</button>
          </div>
          {/* smart views */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`at-mp-rail${view === v.id ? ' is-active' : ''}`}
                onClick={() => setView(v.id)}
                style={{ width: '100%', textAlign: 'start' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--at-space-2)',
                    fontSize: 'var(--at-text-sm)',
                  }}
                >
                  {renderGlyph(v.glyph, 18)}
                  <span>{v.label}</span>
                </span>
                <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  {v.count}
                </span>
              </button>
            ))}
          </div>

          <hr style={{ margin: 0, border: 0, borderBlockStart: '1px solid var(--at-ink)' }} />

          {/* playlists */}
          <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlockEnd: 'var(--at-space-2)',
              }}
            >
              <span className="at-eyebrow">Playlists</span>
              <button
                type="button"
                className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                aria-label="New playlist"
              >
                +
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                overflow: 'auto',
                flex: '1 1 auto',
                minHeight: 0,
              }}
            >
              {PLAYLISTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`at-mp-rail${view === p.id ? ' is-active' : ''}`}
                  onClick={() => setView(p.id)}
                  style={{ width: '100%', textAlign: 'start' }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--at-space-2)',
                      fontSize: 'var(--at-text-sm)',
                      minWidth: 0,
                    }}
                  >
                    <i
                      style={{ width: '9px', height: '9px', borderRadius: '3px', background: p.color, display: 'inline-block', flex: '0 0 auto' }}
                    />
                    <span
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {p.label}
                    </span>
                  </span>
                  <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                    {p.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <hr style={{ margin: 0, border: 0, borderBlockStart: '1px solid var(--at-ink)' }} />

          {/* device */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--at-space-3)',
              padding: 'var(--at-space-2)',
            }}
          >
            <span
              className="at-avatar at-avatar--sm"
              style={{ background: 'var(--at-accent-wash)', color: 'var(--at-accent-text)' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '16px', height: '16px' }}
              >
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
              </svg>
            </span>
            <div style={{ minWidth: 0, flex: '1 1 auto' }}>
              <div style={{ fontSize: 'var(--at-text-sm)', fontWeight: 500, color: 'var(--at-text-strong)' }}>
                Studio iMac
              </div>
              <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                Playing on this device
              </div>
            </div>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--at-success)',
                animation: 'at-mp-pulse 1.4s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* ───── STAGE ───── */}
        <div className="at-col-9" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-4)' }}>
          {/* now playing */}
          <div
            className="at-card"
            style={{
              padding: 'var(--at-space-5)',
              display: 'flex',
              gap: 'var(--at-space-5)',
              flexWrap: 'wrap',
            }}
          >
            {/* cover art */}
            <div
              className="at-mp-cover"
              style={{ background: `linear-gradient(${current.angle}deg, ${current.c1}, ${current.c2})`, flex: '0 0 auto' }}
              aria-hidden="true"
            >
              <span
                style={{
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-on-accent)',
                  background: 'color-mix(in oklab, var(--at-ink) 30%, transparent)',
                  padding: '3px 8px',
                  borderRadius: '999px',
                }}
              >
                FLAC · 24-bit
              </span>
            </div>

            {/* track meta + transport */}
            <div
              style={{
                flex: '1 1 280px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--at-space-4)',
                minWidth: 0,
              }}
            >
              <div>
                <div className="at-eyebrow">{current.album}</div>
                <h2
                  style={{
                    margin: 0,
                    color: 'var(--at-text-strong)',
                    fontSize: 'var(--at-text-lg)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {current.title}
                </h2>
                <p style={{ margin: 'var(--at-space-1) 0 0', color: 'var(--at-on-surface-muted)', fontSize: 'var(--at-text-sm)' }}>
                  {current.artist}
                </p>
              </div>

              {/* scrubber */}
              <div>
                <div style={{ display: 'flex', gap: 'var(--at-space-2)', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 'var(--at-text-xs)',
                      color: 'var(--at-on-surface-muted)',
                      flex: '0 0 auto',
                    }}
                  >
                    {fmt(position)}
                  </span>
                  <button
                    type="button"
                    onClick={scrub}
                    aria-label={`Seek. Elapsed ${fmt(position)} of ${fmt(current.dur)}`}
                    style={{
                      flex: '1 1 auto',
                      height: '6px',
                      borderRadius: '999px',
                      background: 'var(--at-canvas)',
                      border: 0,
                      padding: 0,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        insetBlock: 0,
                        insetInlineStart: 0,
                        width: `${pct}%`,
                        background: 'var(--at-accent)',
                        borderRadius: '999px',
                      }}
                    />
                  </button>
                  <span
                    style={{
                      fontSize: 'var(--at-text-xs)',
                      color: 'var(--at-on-surface-muted)',
                      flex: '0 0 auto',
                    }}
                  >
                    {fmt(current.dur)}
                  </span>
                </div>
              </div>

              {/* transport */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-3)' }}>
                <button
                  type="button"
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  style={shuffle ? { color: 'var(--at-accent-text)' } : undefined}
                  onClick={() => setShuffle((s) => !s)}
                  aria-pressed={shuffle}
                  aria-label="Shuffle"
                >
                  ⇄
                </button>
                <button
                  type="button"
                  className="at-btn at-btn--ghost at-btn--icon at-btn--lg at-press"
                  onClick={prev}
                  aria-label="Previous"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  className="at-btn at-btn--primary at-btn--icon at-btn--lg at-press"
                  onClick={toggle}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? '⏸' : '▶'}
                </button>
                <button
                  type="button"
                  className="at-btn at-btn--ghost at-btn--icon at-btn--lg at-press"
                  onClick={next}
                  aria-label="Next"
                >
                  ⏭
                </button>
                <button
                  type="button"
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  style={repeat !== 'off' ? { color: 'var(--at-accent-text)' } : undefined}
                  onClick={cycleRepeat}
                  aria-pressed={repeat !== 'off'}
                  aria-label="Repeat"
                >
                  {renderGlyph(repeatGlyph, 20)}
                </button>
                <span style={{ flex: '1 1 auto' }} />
                <button
                  type="button"
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  style={current.fav ? { color: 'var(--at-warning-text)' } : undefined}
                  onClick={toggleCurrentFav}
                  aria-pressed={current.fav}
                  aria-label="Favorite"
                >
                  ★
                </button>
              </div>
            </div>
          </div>

          {/* queue */}
          <div
            className="at-card"
            style={{ overflow: 'hidden', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
          >
            {/* queue header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--at-space-4) var(--at-space-5)',
                borderBlockEnd: '1px solid var(--at-ink)',
              }}
            >
              <div>
                <h2
                  className="at-chart__title"
                  style={{ margin: 0, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-lg)' }}
                >
                  Focus Flow
                </h2>
                <p style={{ margin: 'var(--at-space-1) 0 0', fontSize: 'var(--at-text-sm)', color: 'var(--at-on-surface-muted)' }}>
                  <span>{queue.length}</span> tracks
                </p>
              </div>
            </div>
            {/* queue list */}
            <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {queue.map((t, i) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      className={`at-mp-track${i === index ? ' is-active' : ''}`}
                      onClick={() => play(i)}
                      style={{ width: '100%', textAlign: 'start' }}
                    >
                      <span
                        className="at-mp-track__cover"
                        style={{ background: `linear-gradient(${t.angle}deg, ${t.c1}, ${t.c2})` }}
                      >
                        {i === index && playing && (
                          <span style={{ color: 'var(--at-on-accent)', fontSize: '12px' }}>♪</span>
                        )}
                      </span>
                      <span style={{ minWidth: 0, flex: '1 1 auto' }}>
                        <span
                          style={{
                            display: 'block',
                            color: 'var(--at-text-strong)',
                            fontWeight: 500,
                            fontSize: 'var(--at-text-sm)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t.title}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 'var(--at-text-xs)',
                            color: 'var(--at-on-surface-muted)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t.artist}
                        </span>
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                          flex: '0 0 auto',
                        }}
                      >
                        {fmt(t.dur)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
