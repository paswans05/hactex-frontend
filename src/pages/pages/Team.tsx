/*
 * Hactex React — Team page.
 * Built with the shared component classes, inline token
 * styles, and demo content (8 members). Member cards extracted into a const
 * array; the search input is useState-driven.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type Member = {
  initials: string;
  avatarBg: string;
  roleBadge: 'accent' | 'neutral';
  roleBadgeText: string;
  name: string;
  roleLine: string;
  statusColor: string;
  statusLabel: string;
  email: string;
};

const MEMBERS: Member[] = [
  { initials: 'MA', avatarBg: 'var(--at-accent)', roleBadge: 'accent', roleBadgeText: 'Owner', name: 'Maya Albright', roleLine: 'Owner · Design', statusColor: 'var(--at-success)', statusLabel: 'Online', email: 'maya@northwind.io' },
  { initials: 'DK', avatarBg: 'var(--at-chart-1)', roleBadge: 'neutral', roleBadgeText: 'Admin', name: 'Devon Okafor', roleLine: 'Admin · Engineering', statusColor: 'var(--at-success)', statusLabel: 'Online', email: 'devon@northwind.io' },
  { initials: 'LB', avatarBg: 'var(--at-chart-2)', roleBadge: 'neutral', roleBadgeText: 'Editor', name: 'Lena Brandt', roleLine: 'Editor · Design', statusColor: 'var(--at-warning)', statusLabel: 'Away', email: 'lena@northwind.io' },
  { initials: 'TH', avatarBg: 'var(--at-chart-4)', roleBadge: 'neutral', roleBadgeText: 'Admin', name: 'Tomás Herrera', roleLine: 'Admin · Product', statusColor: 'var(--at-success)', statusLabel: 'Online', email: 'tomas@northwind.io' },
  { initials: 'PN', avatarBg: 'var(--at-success)', roleBadge: 'neutral', roleBadgeText: 'Editor', name: 'Priya Nair', roleLine: 'Editor · Analytics', statusColor: 'var(--at-danger)', statusLabel: 'Busy', email: 'priya@northwind.io' },
  { initials: 'AS', avatarBg: 'var(--at-chart-5)', roleBadge: 'neutral', roleBadgeText: 'Viewer', name: 'Ava Sutton', roleLine: 'Viewer · Product', statusColor: 'var(--at-text-muted)', statusLabel: 'Offline', email: 'ava@northwind.io' },
  { initials: 'HW', avatarBg: 'var(--at-chart-1)', roleBadge: 'neutral', roleBadgeText: 'Editor', name: 'Henry Whitlock', roleLine: 'Editor · Engineering', statusColor: 'var(--at-success)', statusLabel: 'Online', email: 'henry@northwind.io' },
  { initials: 'CR', avatarBg: 'var(--at-chart-2)', roleBadge: 'neutral', roleBadgeText: 'Viewer', name: 'Camila Rossi', roleLine: 'Viewer · Analytics', statusColor: 'var(--at-warning)', statusLabel: 'Away', email: 'camila@northwind.io' },
];

function MemberCard({ m }: { m: Member }): React.JSX.Element {
  return (
    <article
      className="at-card at-press"
      style={{
        padding: 'var(--at-space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--at-space-3)',
      }}
    >
      <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          className="at-avatar at-avatar--lg"
          style={{
            background: `color-mix(in oklab, ${m.avatarBg} 16%, transparent)`,
            color: `oklch(from ${m.avatarBg} var(--at-fg-l) c h)`,
          }}
        >
          {m.initials}
        </span>
        <span className={`at-badge at-badge--${m.roleBadge}`}>{m.roleBadgeText}</span>
      </div>
      <div>
        <div className="at-text-strong">{m.name}</div>
        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{m.roleLine}</div>
        <div
          className="at-cluster"
          style={{ gap: '6px', marginBlockStart: '6px', fontSize: 'var(--at-text-xs)', color: 'var(--at-text-muted)' }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: m.statusColor }} />
          <span>{m.statusLabel}</span>
        </div>
      </div>
      <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-1)' }}>
        <button className="at-btn at-btn--outline at-btn--sm at-btn--block at-press">Message</button>
        <a
          className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
          href={`mailto:${m.email}`}
          aria-label={`Email ${m.name}`}
        >
          ✉
        </a>
      </div>
    </article>
  );
}

export default function Team(): React.JSX.Element {
  const [q, setQ] = useState('');

  return (
    <>
      <PageHead
        title="Team"
        subtitle="8 members across 4 departments."
        actions={<button className="at-btn at-btn--primary at-press">Invite member</button>}
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Toolbar (untitled card) */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap', flex: '1 1 auto' }}>
              <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px', maxWidth: '320px' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    width: '16px',
                    height: '16px',
                    position: 'absolute',
                    insetInlineStart: 'var(--at-space-3)',
                    insetBlockStart: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--at-text-muted)',
                    pointerEvents: 'none',
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="at-input"
                  type="search"
                  placeholder="Search members…"
                  aria-label="Search members"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{ paddingInlineStart: 'var(--at-space-8)' }}
                />
              </div>
              <select className="at-select" aria-label="Filter by department" style={{ maxWidth: '180px' }}>
                <option value="all">All departments</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <span className="at-text-muted at-num" style={{ fontSize: 'var(--at-text-xs)', fontFamily: 'var(--at-font-mono)' }}>
                8 shown
              </span>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Grid</button>
                <button className="at-segment__btn">List</button>
              </div>
            </div>
          </div>
        </div>

        {/* Invite a team member */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div className="at-chart__title">Invite a team member</div>
          </div>
          <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap' }}>
            <input className="at-input" type="email" placeholder="colleague@company.com" style={{ flex: '1 1 280px' }} />
            <select className="at-select" style={{ flex: '0 0 auto' }}>
              <option>Member</option>
              <option>Admin</option>
              <option>Owner</option>
            </select>
            <button className="at-btn at-btn--primary at-press">Send invite</button>
          </div>
          <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-2)' }}>
            Invitees receive an email link valid for 7 days.
          </p>
        </div>

        {/* Member grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--at-space-5)',
          }}
        >
          {MEMBERS.map((m) => (
            <MemberCard key={m.email} m={m} />
          ))}
        </div>
      </div>
    </>
  );
}
