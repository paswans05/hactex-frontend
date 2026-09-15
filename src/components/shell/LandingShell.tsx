/*
 * Hactex React — Landing page standalone shell.
 * Renders the landing page without the admin sidebar or top header bar.
 * Includes subtle floating controls and the Hactex.ai footer.
 */
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Loader } from './Loader';
import { slugFromPath } from '../../lib/manifest';
import * as theme from '../../lib/theme';

export function LandingShell(): React.JSX.Element {
  const location = useLocation();
  const [resolved, setResolved] = useState(theme.resolvedMode());

  useEffect(() => {
    document.documentElement.setAttribute('data-at-route', slugFromPath(location.pathname));
    document.title = 'Hactex.ai — The Digital Operating Platform for Hatcheries & Poultry Farms';
  }, [location.pathname]);

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
      {/* Subtle floating controls: Dashboard link + Theme toggle */}
      <div
        className="at-cluster"
        style={{
          position: 'fixed',
          insetBlockStart: 'var(--at-space-4)',
          insetInlineEnd: 'var(--at-space-4)',
          zIndex: 50,
          gap: 'var(--at-space-2)',
          background: 'color-mix(in oklab, var(--at-surface) 88%, transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: 'var(--at-radius-full)',
          border: 'var(--at-border-w-sm) solid var(--at-border)',
          boxShadow: 'var(--at-shadow-sm)',
        }}
      >
        <Link
          to="/auth/login"
          className="at-btn at-btn--sm at-btn--primary at-press"
          style={{ textDecoration: 'none', padding: '4px 12px', fontSize: 'var(--at-text-xs)' }}
        >
          Login →
        </Link>
        <button
          className="at-icon-btn"
          onClick={toggle}
          aria-label="Toggle theme"
          style={{ width: '30px', height: '30px' }}
        >
          {resolved !== 'dark' ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 16, height: 16 }}
            >
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 16, height: 16 }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {/* Main content container: full width, no sidebar margin, no header margin */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--at-canvas)',
          color: 'var(--at-text)',
        }}
      >
        <main
          id="at-main"
          style={{
            flex: '1 1 auto',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'var(--at-space-6) var(--at-space-6) var(--at-space-10)',
          }}
        >
          <Outlet />
        </main>

        {/* Hactex.ai Footer */}
        <footer
          style={{
            borderTop: 'var(--at-border-w-sm) solid var(--at-border)',
            background: 'var(--at-surface)',
            padding: 'var(--at-space-8) var(--at-space-6)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--at-space-4)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                <span className="at-sidebar__stamp" aria-hidden="true" style={{ width: '22px', height: '22px' }}>

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
                <span
                  style={{
                    fontFamily: 'var(--at-font-display)',
                    fontSize: 'var(--at-text-lg)',
                    fontWeight: 'var(--at-weight-bold)',
                    color: 'var(--at-text-strong)',
                  }}
                >
                  HACTEX.ai
                </span>
              </div>
              <p
                className="at-text-muted"
                style={{
                  margin: 'var(--at-space-1) 0 0',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                The Digital Operating Platform for Poultry.
              </p>
            </div>

            <nav
              className="at-cluster"
              style={{
                gap: 'var(--at-space-3) var(--at-space-5)',
                flexWrap: 'wrap',
                fontSize: 'var(--at-text-sm)',
              }}
            >

              <Link to="/pages/starter" className="at-text-muted" style={{ textDecoration: 'none' }}>
                About
              </Link>
              <Link to="/pages/starter" className="at-text-muted" style={{ textDecoration: 'none' }}>
                Contact
              </Link>
              <Link to="/pages/terms" className="at-text-muted" style={{ textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <Link to="/pages/terms" className="at-text-muted" style={{ textDecoration: 'none' }}>
                Terms
              </Link>
            </nav>
          </div>
          <div
            style={{
              maxWidth: '1200px',
              margin: 'var(--at-space-4) auto 0',
              paddingTop: 'var(--at-space-3)',
              borderTop: 'var(--at-border-w-sm) solid color-mix(in oklab, var(--at-border) 60%, transparent)',
              fontSize: 'var(--at-text-xs)',
              color: 'var(--at-text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--at-space-2)',
            }}
          >
            <span>© {new Date().getFullYear()} HACTEX. All rights reserved.</span>
            {/* <span>Operating Platform for Hatcheries & Poultry Farms</span> */}
          </div>
        </footer>
      </div>
    </>
  );
}
