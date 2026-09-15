/*
 * Hactex React — Contacts app (fullscreen, no sidebar).
 * A 3-pane master-detail workspace.
 * Renders inside <AppShell> (appbar + .at-app-fullscreen); no <PageHead>.
 */
import { useState } from 'react';

const FOLDERS = [
  { label: 'Inbox', count: 24 },
  { label: 'Starred' },
  { label: 'Sent' },
  { label: 'Drafts' },
  { label: 'Archive' },
];

const ITEMS = [
  { id: 1, title: 'Item One', preview: 'Preview of the first contacts item…' },
  { id: 2, title: 'Item Two', preview: 'Preview of the second item…' },
  { id: 3, title: 'Item Three', preview: 'Preview of the third item…' },
];

export default function Contacts(): React.JSX.Element {
  const [folder, setFolder] = useState('Inbox');
  const [selected, setSelected] = useState(1);
  const active = ITEMS.find((i) => i.id === selected);

  return (
    <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
      {/* Folders */}
      <div
        className="at-col-3 at-card"
        style={{ padding: 'var(--at-space-3)', height: 'calc(100vh - var(--at-header-h) - var(--at-space-8) - 60px)', overflow: 'auto' }}
      >
        <div className="at-eyebrow" style={{ padding: 'var(--at-space-2)' }}>Folders</div>
        {FOLDERS.map((f) => (
          <div
            key={f.label}
            className={`at-list__item${f.label === folder ? ' is-active' : ''}`}
            style={{ borderRadius: 'var(--at-radius-xs)', cursor: 'pointer' }}
            onClick={() => setFolder(f.label)}
          >
            {f.label}
            {f.count && (
              <span className="at-badge at-badge--accent" style={{ float: 'inline-end' }}>{f.count}</span>
            )}
          </div>
        ))}
      </div>

      {/* List */}
      <div className="at-col-5 at-card" style={{ overflow: 'hidden' }}>
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className={`at-list__item${item.id === selected ? ' is-active' : ''}`}
            style={{ padding: 'var(--at-space-4)', cursor: 'pointer' }}
            onClick={() => setSelected(item.id)}
          >
            <div className="at-text-strong">{item.title}</div>
            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{item.preview}</div>
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
        <h3 className="at-chart__title">{active?.title ?? 'Detail Pane'}</h3>
        <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-2)' }}>
          {active?.preview ?? 'Select an item to view its details here. The Contacts workspace uses a multi-pane layout.'}
        </p>
      </div>
    </div>
  );
}
