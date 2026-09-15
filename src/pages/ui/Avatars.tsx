/*
 * Hactex React — Avatars UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup, no component state.
 */
import { PageHead } from '../../components/shell/PageHead';

const TEAM = [
  { initial: 'A', name: 'Ava Mitchell', role: 'Product Designer', bg: 'var(--at-accent)', color: 'var(--at-on-accent)', status: 'Online', kind: 'success' },
  { initial: 'L', name: 'Liam Reyes', role: 'Engineering Lead', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', status: 'Away', kind: 'warning' },
  { initial: 'N', name: 'Noor Khan', role: 'Account Manager', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', status: 'Offline', kind: 'neutral' },
];

export default function Avatars(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Avatars"
        subtitle="Identity, presence and grouping for people and entities."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Invite</button>
            <button className="at-btn at-btn--primary at-press">New team</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Sizes */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Sizes</div>
                <div className="at-eyebrow">xs through xl</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-3)' }}>
              <div className="at-avatar at-avatar--xs" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}>XS</div>
              <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>SM</div>
              <div className="at-avatar" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' }}>MD</div>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-lime)', color: 'var(--at-on-lime)' }}>LG</div>
              <div className="at-avatar at-avatar--xl" style={{ background: 'var(--at-ink-strong)', color: 'var(--at-paper)' }}>XL</div>
            </div>
          </div>

          {/* 2. Shapes & rings */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Shapes &amp; rings</div>
                <div className="at-eyebrow">Round, square, with ring</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-4)' }}>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}>R</div>
              <div className="at-avatar at-avatar--lg at-avatar--square" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>S</div>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', boxShadow: '0 0 0 3px var(--at-paper), 0 0 0 5px var(--at-ink)' }}>R</div>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-success)', color: 'var(--at-on-success)', boxShadow: '0 0 0 3px var(--at-paper), 0 0 0 5px var(--at-success)' }}>O</div>
            </div>
          </div>

          {/* 3. Fallback chain */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Fallback chain</div>
                <div className="at-eyebrow">Image → initials → glyph</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-4)' }}>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)', overflow: 'hidden' }}>
                <img src="https://i.pravatar.cc/80?img=12" alt="Jane Doe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>J</div>
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-ink-strong)', color: 'var(--at-paper)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '60%', height: '60%' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Status dots */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Status dots</div>
                <div className="at-eyebrow">Online, away, busy, offline</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-4)' }}>
              <div style={{ position: 'relative' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}>O</div>
                <span style={{ position: 'absolute', insetBlockEnd: 0, insetInlineEnd: 0, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--at-success)', border: '2px solid var(--at-paper)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>A</div>
                <span style={{ position: 'absolute', insetBlockEnd: 0, insetInlineEnd: 0, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--at-warning)', border: '2px solid var(--at-paper)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' }}>B</div>
                <span style={{ position: 'absolute', insetBlockEnd: 0, insetInlineEnd: 0, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--at-danger)', border: '2px solid var(--at-paper)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-lime)', color: 'var(--at-on-lime)' }}>O</div>
                <span style={{ position: 'absolute', insetBlockEnd: 0, insetInlineEnd: 0, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--at-muted, var(--at-surface))', border: '2px solid var(--at-ink)' }} />
              </div>
            </div>
          </div>

          {/* 5. Stacks & overflow */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Stacks &amp; overflow</div>
                <div className="at-eyebrow">Avatar groups</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-cluster" style={{ gap: '-10px' }}>
                <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)', border: '2px solid var(--at-paper)', marginInlineEnd: '-8px', zIndex: 4 }}>A</div>
                <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)', border: '2px solid var(--at-paper)', marginInlineEnd: '-8px', zIndex: 3 }}>C</div>
                <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', border: '2px solid var(--at-paper)', marginInlineEnd: '-8px', zIndex: 2 }}>E</div>
                <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-ink-strong)', color: 'var(--at-paper)', border: '2px solid var(--at-paper)', zIndex: 1 }}>+5</div>
              </div>
              <div className="at-cluster" style={{ gap: '-12px' }}>
                <div className="at-avatar" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)', border: '2px solid var(--at-paper)', marginInlineEnd: '-10px', zIndex: 5 }}>A</div>
                <div className="at-avatar" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)', border: '2px solid var(--at-paper)', marginInlineEnd: '-10px', zIndex: 4 }}>C</div>
                <div className="at-avatar" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', border: '2px solid var(--at-paper)', marginInlineEnd: '-10px', zIndex: 3 }}>E</div>
                <div className="at-avatar" style={{ background: 'var(--at-lime)', color: 'var(--at-on-lime)', border: '2px solid var(--at-paper)', marginInlineEnd: '-10px', zIndex: 2 }}>G</div>
                <div className="at-avatar" style={{ background: 'var(--at-ink-strong)', color: 'var(--at-paper)', border: '2px solid var(--at-paper)', zIndex: 1 }}>+12</div>
              </div>
            </div>
          </div>

          {/* 6. With name & role */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">With name &amp; role</div>
                <div className="at-eyebrow">Identity in context</div>
              </div>
            </div>
            <div className="at-list">
              {TEAM.map((m) => (
                <div key={m.name} className="at-list__item">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'space-between' }}>
                    <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                      <div className="at-avatar" style={{ background: m.bg, color: 'var(--at-on-accent)' }}>{m.initial}</div>
                      <div>
                        <div className="at-text-strong">{m.name}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{m.role}</div>
                      </div>
                    </div>
                    <span className={`at-badge at-badge--${m.kind}`}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
