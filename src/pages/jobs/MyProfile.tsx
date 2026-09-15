/*
 * Hactex React — My Profile (jobs/my-profile).
 * Header card + tabbed detail.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const TABS = ['Overview', 'Activity', 'Files'] as const;
const FIELDS_A = [
  ['Field One', 'Value Alpha'],
  ['Field Two', '$2,480.00'],
  ['Field Three', 'Nov 6, 2025'],
];
const FIELDS_B = [
  ['Field Four', 'Category A'],
  ['Field Five', 'High'],
  ['Field Six', 'Yes'],
];

export default function MyProfile(): React.JSX.Element {
  const [tab, setTab] = useState(0);
  return (
    <>
      <PageHead
        title="My Profile"
        subtitle="Details for this my profile."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />
      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
            <div className="at-cluster">
              <div className="at-avatar at-avatar--xl">A</div>
              <div>
                <h2 className="at-chart__title">My Profile</h2>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                  ID #AT-0001 · Created Nov 6, 2025
                </p>
              </div>
            </div>
            <div className="at-cluster">
              <span className="at-badge at-badge--success">Active</span>
              <button className="at-btn at-btn--outline at-press">Edit</button>
            </div>
          </div>
        </div>
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-tabs__nav">
            {TABS.map((t, i) => (
              <button key={t} className={`at-tabs__tab${tab === i ? ' is-active' : ''}`} onClick={() => setTab(i)}>{t}</button>
            ))}
          </div>
          <div className="at-divider"></div>
          <div className="at-row" style={{ marginBlockStart: 'var(--at-space-4)' }}>
            <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
              {FIELDS_A.map(([k, v]) => (
                <div key={k} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">{k}</span>
                  <span className="at-text-strong">{v}</span>
                </div>
              ))}
            </div>
            <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
              {FIELDS_B.map(([k, v]) => (
                <div key={k} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">{k}</span>
                  <span className="at-text-strong">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
