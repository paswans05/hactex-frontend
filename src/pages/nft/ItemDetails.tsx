/*
 * Hactex React — NFT item details.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The Overview/Activity/Files tab nav uses
 * useState; only Overview has content in the source.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const FIELDS_LEFT = [
  { label: 'Field One', value: 'Value Alpha' },
  { label: 'Field Two', value: '$2,480.00' },
  { label: 'Field Three', value: 'Nov 6, 2025' },
];

const FIELDS_RIGHT = [
  { label: 'Field Four', value: 'Category A' },
  { label: 'Field Five', value: 'High' },
  { label: 'Field Six', value: 'Yes' },
];

const TABS = ['Overview', 'Activity', 'Files'];

export default function ItemDetails(): React.JSX.Element {
  const [tab, setTab] = useState(0);

  return (
    <>
      <PageHead
        title="Item Details"
        subtitle="Details for this item details."
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
                <h2 className="at-chart__title">Item Details</h2>
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
              <button
                key={t}
                className={`at-tabs__tab${tab === i ? ' is-active' : ''}`}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="at-divider" />
          {tab === 0 && (
            <div className="at-row" style={{ marginBlockStart: 'var(--at-space-4)' }}>
              <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
                {FIELDS_LEFT.map((f) => (
                  <div key={f.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-muted">{f.label}</span>
                    <span className="at-text-strong">{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
                {FIELDS_RIGHT.map((f) => (
                  <div key={f.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-muted">{f.label}</span>
                    <span className="at-text-strong">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
