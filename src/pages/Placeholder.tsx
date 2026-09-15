/*
 * Hactex React — Placeholder page.
 *
 * Renders a clean, manifest-aware empty state for every route whose real
 * content isn't ported yet: breadcrumb + resolved title + subtitle + an empty
 * card. This keeps every one of the 113 routes navigable and on-brand while the
 * page bodies are filled in over later passes.
 */
import { useLocation } from 'react-router-dom';
import { PageHead } from '../components/shell/PageHead';
import { nodeForPath, resolve, trail } from '../lib/manifest';

export function Placeholder(): React.JSX.Element {
  const { pathname } = useLocation();
  const node = nodeForPath(pathname);
  const title = node?.title ?? 'Page';
  const section = node ? trail(resolve(node))[0]?.title : '';

  return (
    <>
      <PageHead
        title={title}
        subtitle={section ? `${section} module` : 'This page is part of the Hactex suite.'}
      />
      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-card" style={{ padding: 'var(--at-space-8)', textAlign: 'center' }}>
          <div className="at-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--at-space-3)' }}>
            <div
              className="at-sidebar__stamp"
              aria-hidden="true"
              style={{ width: 48, height: 48, opacity: 0.5 }}
            >
              <svg viewBox="0 0 32 32" fill="currentColor">
                <path d="M8 8h16v16H8z" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path d="M12 12h8v8H12z" />
              </svg>
            </div>
            <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>{title}</div>
            <p className="at-text-muted" style={{ maxWidth: 420, margin: '0 auto' }}>
              This route is wired into the shell, sidebar, command palette, and theming — the
              full page content ports in a follow-up pass.
            </p>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', justifyContent: 'center', marginBlockStart: 'var(--at-space-2)' }}>
              <code className="at-badge at-badge--neutral" style={{ fontFamily: 'var(--at-font-mono)' }}>
                {pathname}
              </code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
