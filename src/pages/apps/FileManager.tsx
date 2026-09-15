/*
 * Hactex React — File Manager app (fullscreen, no sidebar).
 * Built with the shared component classes, inline
 * token styles, and demo data. Renders inside <AppShell> (appbar + main);
 * no <PageHead>. Browsing, selection and the detail rail are React hooks.
 *
 * Page-scoped <style> (the .at-fm-* rules from the reference) is rendered inline
 * so the [data-at-route='apps/file-manager'] selectors apply once mounted.
 */
import { useMemo, useState } from 'react';
import { Icon } from '../../components/ui/Icon';

// ── glyph → raw inner-SVG markup ──
const GLYPHS: Record<string, string> = {
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  trash:
    '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  palette:
    '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  movie:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
  archive:
    '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'chart-bar':
    '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  bolt: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
};

// glyphs that are literal text (★) render via the raw-string fallback path
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

type ViewMode = 'grid' | 'list';

interface QuickFilter {
  id: string;
  label: string;
  count: string;
  color: string;
  glyph: string;
}

interface TreeChild {
  id: string;
  name: string;
  count: number;
}

interface TreeNode {
  id: string;
  name: string;
  count: number;
  open: boolean;
  children?: TreeChild[];
}

interface FolderCard {
  id: string;
  name: string;
  items: number;
  size: string;
  color: string;
}

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  owner: string;
  color: string;
  glyph: string;
  starred: boolean;
}

const QUICK_FILTERS: QuickFilter[] = [
  { id: 'all', label: 'All files', count: '1,284', color: 'var(--at-accent)', glyph: 'file' },
  { id: 'recent', label: 'Recent', count: '24', color: 'var(--at-info)', glyph: 'clock' },
  { id: 'starred', label: 'Starred', count: '12', color: 'var(--at-warning)', glyph: '★' },
  { id: 'shared', label: 'Shared with me', count: '38', color: 'var(--at-tertiary)', glyph: 'users' },
  { id: 'trash', label: 'Trash', count: '7', color: 'var(--at-on-surface-muted)', glyph: 'trash' },
];

const INITIAL_TREE: TreeNode[] = [
  {
    id: 'workspace',
    name: 'Workspace',
    count: 1284,
    open: true,
    children: [
      { id: 'design', name: 'Design', count: 312 },
      { id: 'brand', name: 'Brand Assets', count: 48 },
      { id: 'eng', name: 'Engineering', count: 506 },
      { id: 'marketing', name: 'Marketing', count: 174 },
    ],
  },
  {
    id: 'shared-root',
    name: 'Shared drives',
    count: 380,
    open: false,
    children: [
      { id: 'finance', name: 'Finance', count: 91 },
      { id: 'legal', name: 'Legal', count: 64 },
    ],
  },
  { id: 'archive', name: 'Archive', count: 842, open: false },
];

const FOLDERS: FolderCard[] = [
  { id: 'logos', name: 'Logos', items: 18, size: '42 MB', color: 'var(--at-accent)' },
  { id: 'typefaces', name: 'Typefaces', items: 6, size: '88 MB', color: 'var(--at-tertiary)' },
  { id: 'photography', name: 'Photography', items: 124, size: '2.1 GB', color: 'var(--at-info)' },
  { id: 'guidelines', name: 'Guidelines', items: 9, size: '164 MB', color: 'var(--at-warning)' },
];

const FILES: FileItem[] = [
  { id: 1, name: 'brand-guidelines-2026.pdf', type: 'PDF document', size: '8.4 MB', date: 'Jun 24', owner: 'Lena Brandt', color: 'var(--at-danger)', glyph: 'book', starred: true },
  { id: 2, name: 'hero-banner-final.png', type: 'PNG image · 2400×1200', size: '4.1 MB', date: 'Jun 23', owner: 'You', color: 'var(--at-info)', glyph: 'image', starred: false },
  { id: 3, name: 'product-shot-03.jpg', type: 'JPEG image · 3000×2000', size: '6.7 MB', date: 'Jun 22', owner: 'Maya Okonkwo', color: 'var(--at-tertiary)', glyph: 'image', starred: true },
  { id: 4, name: 'aurora-ui-kit.fig', type: 'Figma file', size: '12.3 MB', date: 'Jun 21', owner: 'Tom Reyes', color: 'var(--at-accent)', glyph: 'palette', starred: false },
  { id: 5, name: 'launch-teaser.mp4', type: 'MP4 video · 0:48', size: '128 MB', date: 'Jun 20', owner: 'Priya Nair', color: 'var(--at-lime)', glyph: 'movie', starred: false },
  { id: 6, name: 'icon-set-export.zip', type: 'ZIP archive', size: '2.9 MB', date: 'Jun 19', owner: 'You', color: 'var(--at-warning)', glyph: 'archive', starred: false },
  { id: 7, name: 'q2-campaign-budget.xlsx', type: 'Spreadsheet', size: '612 KB', date: 'Jun 18', owner: 'Daniel Cho', color: 'var(--at-success)', glyph: 'chart-bar', starred: false },
  { id: 8, name: 'press-release-draft.docx', type: 'Word document', size: '248 KB', date: 'Jun 17', owner: 'Ava Sutton', color: 'var(--at-info)', glyph: 'book', starred: false },
  { id: 9, name: 'theme-tokens.css', type: 'Stylesheet', size: '34 KB', date: 'Jun 16', owner: 'Tom Reyes', color: 'var(--at-tertiary)', glyph: 'bolt', starred: false },
  { id: 10, name: 'social_cover-set.png', type: 'PNG image · 1600×900', size: '3.3 MB', date: 'Jun 15', owner: 'You', color: 'var(--at-warning)', glyph: 'image', starred: false },
];

export default function FileManager(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState('all');
  const [activeFolder, setActiveFolder] = useState('brand');
  const [selected, setSelected] = useState<number[]>([]);
  const [tree, setTree] = useState<TreeNode[]>(INITIAL_TREE);

  const visibleFiles = useMemo(() => {
    const t = q.trim().toLowerCase();
    return FILES.filter((f) => !t || f.name.toLowerCase().includes(t));
  }, [q]);

  const toggle = (id: number): void => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleNode = (nodeId: string): void => {
    setTree((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, open: !n.open } : n)),
    );
  };

  return (
    <>
      <style>{`
[data-at-route='apps/file-manager'] .at-segment__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--at-space-3);
  line-height: 0;
}
[data-at-route='apps/file-manager'] .at-fm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--at-space-3);
}
[data-at-route='apps/file-manager'] .at-fm-file {
  height: 150px;
}
[data-at-route='apps/file-manager'] .at-fm-rail {
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
[data-at-route='apps/file-manager'] .at-fm-rail:hover {
  background: var(--at-canvas);
}
[data-at-route='apps/file-manager'] .at-fm-rail.is-active {
  background: var(--at-accent-wash);
}
[data-at-route='apps/file-manager'] .at-fm-tree-row {
  display: flex;
  align-items: center;
  gap: var(--at-space-1);
  padding: 2px;
  border-radius: var(--at-radius-xs);
}
[data-at-route='apps/file-manager'] .at-fm-tree-row.is-active {
  background: var(--at-accent-wash);
}
[data-at-route='apps/file-manager'] .at-fm-tree-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--at-space-2);
  width: 100%;
  border: 0;
  background: transparent;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: var(--at-radius-xs);
}
[data-at-route='apps/file-manager'] .at-fm-folder {
  display: flex;
  align-items: center;
  gap: var(--at-space-3);
  padding: var(--at-space-3);
  background: var(--at-paper);
  border: 1px solid var(--at-ink);
  border-radius: var(--at-radius-sm);
  cursor: pointer;
  transition: box-shadow 0.12s ease;
}
[data-at-route='apps/file-manager'] .at-fm-folder:hover {
  box-shadow: 0 2px 8px color-mix(in oklab, var(--at-ink) 12%, transparent);
}
[data-at-route='apps/file-manager'] .at-fm-file {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--at-space-2);
  padding: var(--at-space-3);
  background: var(--at-paper);
  border: 1px solid var(--at-ink);
  border-radius: var(--at-radius-sm);
  cursor: pointer;
  text-align: start;
  transition: box-shadow 0.12s ease;
}
[data-at-route='apps/file-manager'] .at-fm-file:hover {
  box-shadow: 0 2px 8px color-mix(in oklab, var(--at-ink) 12%, transparent);
}
[data-at-route='apps/file-manager'] .at-fm-file.is-selected {
  border-color: var(--at-accent);
  box-shadow: 0 0 0 2px var(--at-accent);
}
[data-at-route='apps/file-manager'] .at-fm-file__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  border-radius: var(--at-radius-xs);
  font-size: 24px;
}
`}</style>

      {/* Upload files card */}
      <div
        className="at-card"
        style={{
          padding: 'var(--at-space-5)',
          marginBlockEnd: 'var(--at-space-4)',
          borderStyle: 'dashed',
          borderWidth: '2px',
        }}
      >
        <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-chart__title">Upload files</div>
          <span className="at-eyebrow">Drag &amp; drop or browse</span>
        </div>
        <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
          <button className="at-btn at-btn--primary at-btn--sm at-press">Browse files</button>
          <button className="at-btn at-btn--outline at-btn--sm at-press">Choose folder</button>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
            Up to 50{'\u00A0'}MB per file
          </span>
        </div>
      </div>

      <div
        className="at-row"
        style={{ gap: 'var(--at-space-4)', alignItems: 'stretch', flex: '1 1 auto', minHeight: 0 }}
      >
        {/* ───── LEFT RAIL ───── */}
        <div
          className="at-col-3 at-card"
          style={{
            padding: 'var(--at-space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--at-space-4)',
            minHeight: 0,
          }}
        >
          {/* quick filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`at-fm-rail${filter === f.id ? ' is-active' : ''}`}
                onClick={() => setFilter(f.id)}
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
                  <span style={{ color: `oklch(from ${f.color} var(--at-fg-l) c h)` }}>{renderGlyph(f.glyph, 18)}</span>
                  <span>{f.label}</span>
                </span>
                <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          <hr style={{ margin: 0, border: 0, borderBlockStart: '1px solid var(--at-ink)' }} />

          {/* folder tree */}
          <div style={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto' }}>
            <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Folders</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {tree.map((node) => (
                <li key={node.id}>
                  <div
                    className={`at-fm-tree-row${activeFolder === node.id ? ' is-active' : ''}`}
                  >
                    {node.children ? (
                      <button
                        type="button"
                        className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                        onClick={() => toggleNode(node.id)}
                        aria-label={`${node.open ? 'Collapse' : 'Expand'} ${node.name}`}
                        style={{ width: '22px', height: '22px', flex: '0 0 auto' }}
                      >
                        {node.open ? '▾' : '▸'}
                      </button>
                    ) : (
                      <span style={{ width: '22px', flex: '0 0 auto' }} aria-hidden="true" />
                    )}
                    <button
                      type="button"
                      className="at-fm-tree-name"
                      onClick={() => setActiveFolder(node.id)}
                    >
                      <span style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>
                        {node.name}
                      </span>
                      <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                        {node.count}
                      </span>
                    </button>
                  </div>
                  {node.open && node.children && (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {node.children.map((child) => (
                        <li key={child.id}>
                          <div
                            className={`at-fm-tree-row${activeFolder === child.id ? ' is-active' : ''}`}
                            style={{ paddingInlineStart: 'var(--at-space-5)' }}
                          >
                            <span style={{ width: '22px', flex: '0 0 auto' }} aria-hidden="true" />
                            <button
                              type="button"
                              className="at-fm-tree-name"
                              onClick={() => setActiveFolder(child.id)}
                            >
                              <span style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>
                                {child.name}
                              </span>
                              <span
                                style={{
                                  fontSize: 'var(--at-text-xs)',
                                  color: 'var(--at-on-surface-muted)',
                                }}
                              >
                                {child.count}
                              </span>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <hr style={{ margin: 0, border: 0, borderBlockStart: '1px solid var(--at-ink)' }} />

          {/* storage meter */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockEnd: 'var(--at-space-2)',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>
                Storage
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>73%</span>
            </div>
            <div
              style={{
                display: 'flex',
                height: '8px',
                borderRadius: '999px',
                overflow: 'hidden',
                background: 'var(--at-canvas)',
              }}
            >
              <span style={{ width: '25%', background: 'var(--at-accent)' }} />
              <span style={{ width: '20.3%', background: 'var(--at-info)' }} />
              <span style={{ width: '18.7%', background: 'var(--at-tertiary)' }} />
              <span style={{ width: '9.1%', background: 'var(--at-warning)' }} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockStart: 'var(--at-space-2)',
              }}
            >
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>187.4 GB</span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                of 256 GB
              </span>
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: 'var(--at-space-3) 0 0',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-text-strong)',
                }}
              >
                <i
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: 'var(--at-accent)',
                    display: 'inline-block',
                  }}
                />
                Documents <b style={{ marginInlineStart: 'auto' }}>64 GB</b>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-text-strong)',
                }}
              >
                <i
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: 'var(--at-info)',
                    display: 'inline-block',
                  }}
                />
                Images <b style={{ marginInlineStart: 'auto' }}>52 GB</b>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-text-strong)',
                }}
              >
                <i
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: 'var(--at-tertiary)',
                    display: 'inline-block',
                  }}
                />
                Video <b style={{ marginInlineStart: 'auto' }}>48 GB</b>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-text-strong)',
                }}
              >
                <i
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: 'var(--at-warning)',
                    display: 'inline-block',
                  }}
                />
                Other <b style={{ marginInlineStart: 'auto' }}>23.4 GB</b>
              </li>
            </ul>
            <button
              className="at-btn at-btn--outline at-btn--sm at-btn--block at-press"
              style={{ marginBlockStart: 'var(--at-space-3)' }}
            >
              Upgrade storage
            </button>
          </div>
        </div>

        {/* ───── MAIN: file browser ───── */}
        <div
          className="at-col-9 at-card"
          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}
        >
          {/* breadcrumb + toolbar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--at-space-3)',
              padding: 'var(--at-space-4) var(--at-space-5)',
              borderBlockEnd: '1px solid var(--at-ink)',
              alignItems: 'center',
            }}
          >
            <nav
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--at-space-2)',
                fontSize: 'var(--at-text-sm)',
              }}
              aria-label="Folder path"
            >
              <button
                type="button"
                className="at-btn at-btn--ghost at-btn--sm at-press"
                onClick={() => setActiveFolder('workspace')}
              >
                Workspace
              </button>
              <span style={{ color: 'var(--at-on-surface-muted)' }}>›</span>
              <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">Design</button>
              <span style={{ color: 'var(--at-on-surface-muted)' }}>›</span>
              <span aria-current="page" style={{ color: 'var(--at-text-strong)', fontWeight: 600 }}>
                Brand Assets
              </span>
            </nav>
            <div
              style={{
                display: 'flex',
                gap: 'var(--at-space-2)',
                alignItems: 'center',
                marginInlineStart: 'auto',
              }}
            >
              <input
                className="at-input"
                type="search"
                placeholder="Search this folder…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search this folder"
                style={{ minWidth: '200px' }}
              />
              <div className="at-segment">
                <button
                  className={`at-segment__btn${view === 'grid' ? ' is-active' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                  </svg>
                </button>
                <button
                  className={`at-segment__btn${view === 'list' ? ' is-active' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="List view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="4" width="18" height="3.5" rx="1.75" />
                    <rect x="3" y="10.25" width="18" height="3.5" rx="1.75" />
                    <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 auto', overflow: 'auto', padding: 'var(--at-space-5)' }}>
            {/* folders row */}
            <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>Folders</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 'var(--at-space-3)',
                marginBlockEnd: 'var(--at-space-5)',
              }}
            >
              {FOLDERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="at-fm-folder at-press"
                  onClick={() => setActiveFolder(f.id)}
                >
                  <span
                    className="at-avatar at-avatar--sm"
                    style={{
                      background: `color-mix(in oklab, ${f.color} 22%, transparent)`,
                      color: `oklch(from ${f.color} var(--at-fg-l) c h)`,
                    }}
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
                      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                    </svg>
                  </span>
                  <div style={{ minWidth: 0, textAlign: 'start' }}>
                    <div
                      style={{
                        fontWeight: 500,
                        color: 'var(--at-text-strong)',
                        fontSize: 'var(--at-text-sm)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f.name}
                    </div>
                    <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                      {f.items} items · {f.size}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* files */}
            <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>Files</div>
            {/* grid view */}
            {view === 'grid' && (
              <div className="at-fm-grid">
                {visibleFiles.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`at-fm-file at-press${selected.includes(f.id) ? ' is-selected' : ''}`}
                    onClick={() => toggle(f.id)}
                  >
                    <span
                      className="at-fm-file__thumb"
                      style={{
                        background: `color-mix(in oklab, ${f.color} 16%, transparent)`,
                        color: `oklch(from ${f.color} var(--at-fg-l) c h)`,
                      }}
                    >
                      {renderGlyph(f.glyph, 24)}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--at-text-sm)',
                        color: 'var(--at-text-strong)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f.name}
                    </span>
                    <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                      {f.size}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {/* list view */}
            {view === 'list' && (
              <div className="at-table-wrap" style={{ border: 'none' }}>
                <table className="at-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Owner</th>
                      <th>Modified</th>
                      <th className="at-num">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleFiles.map((f) => (
                      <tr
                        key={f.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggle(f.id)}
                        className={selected.includes(f.id) ? 'is-active' : undefined}
                      >
                        <td style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                          <span style={{ color: `oklch(from ${f.color} var(--at-fg-l) c h)` }}>{renderGlyph(f.glyph, 20)}</span>
                          <span>{f.name}</span>
                        </td>
                        <td>{f.owner}</td>
                        <td>{f.date}</td>
                        <td className="at-num">{f.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
