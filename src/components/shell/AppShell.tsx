/*
 * Hactex React — fullscreen "appbar" shell for the apps/* routes.
 *
 * Mirrors the reference's `.at-app-fullscreen` body variant (used by the 10
 * apps/* pages: email, chat, calendar, kanban, todo, file-manager, gallery,
 * contacts, notes, media-player). No sidebar — just a compact appbar with the
 * brand + theme toggle, then the full-height app surface in <main>.
 *
 * The appbar chrome is identical across all 10 apps ,
 * so it lives here once; each app renders its own body as children.
 */
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Loader } from './Loader';
import { slugFromPath } from '../../lib/manifest';
import * as theme from '../../lib/theme';

export function AppShell(): React.JSX.Element {
  const location = useLocation();
  const [resolved, setResolved] = useState(theme.resolvedMode());

  // keep <html data-at-route> in sync (active-trail + breadcrumb)
  useEffect(() => {
    document.documentElement.setAttribute('data-at-route', slugFromPath(location.pathname));
  }, [location.pathname]);

  // mark the body so .at-app-fullscreen layout CSS applies
  useEffect(() => {
    document.body.classList.add('at-app-fullscreen');
    return () => document.body.classList.remove('at-app-fullscreen');
  }, []);

  // live theme resolve (re-read on at:change)
  useEffect(() => {
    const onTheme = (): void => setResolved(theme.resolvedMode());
    window.addEventListener('at:change', onTheme);
    return () => window.removeEventListener('at:change', onTheme);
  }, []);

  const toggle = (): void => {
    theme.quickToggleTheme();
    setResolved(theme.resolvedMode());
  };

  return (
    <>
      <Loader />
      <header className="at-appbar">
        <Link to="/" className="at-appbar__brand" aria-label="Hactex home">
          <span className="at-sidebar__stamp" aria-hidden="true">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Egg */}
              <path
                d="M16 3.5
         C10.2 3.5 6 9.6 6 16.8
         C6 23.5 10.2 28.5 16 28.5
         C21.8 28.5 26 23.5 26 16.8
         C26 9.6 21.8 3.5 16 3.5Z"
                fill="currentColor"
              />

              {/* Egg hatch / technology cut */}
              <path
                d="M7.2 18.2
         C10.5 15.2 14.2 14.4 18 13
         C21 11.9 23.2 10.5 24.8 9"
                stroke="var(--egg-cut, #2b2119)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>Hactex</span>
        </Link>
        <button className="at-icon-btn" onClick={toggle} aria-label="Toggle theme">
          {resolved !== 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>
      <main className="at-app-main" id="at-main">
        <Outlet />
      </main>
    </>
  );
}
