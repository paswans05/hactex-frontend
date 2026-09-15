/*
 * Hactex React — Landing page standalone shell.
 * Renders the landing page without the admin sidebar or top header bar.
 * Provides a subtle floating control for theme toggling and navigating to the dashboard.
 */
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Loader } from './Loader';
import { Footer } from './Footer';
import { slugFromPath } from '../../lib/manifest';
import * as theme from '../../lib/theme';

export function LandingShell(): React.JSX.Element {
  const location = useLocation();
  const [resolved, setResolved] = useState(theme.resolvedMode());

  useEffect(() => {
    document.documentElement.setAttribute('data-at-route', slugFromPath(location.pathname));
    document.title = 'Hactex — Operating Platform for Hatcheries and Poultry Farms';
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
          to="/dashboards/sales"
          className="at-btn at-btn--sm at-btn--primary at-press"
          style={{ textDecoration: 'none', padding: '4px 12px', fontSize: 'var(--at-text-xs)' }}
        >
          Dashboard →
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
        <Footer />
      </div>
    </>
  );
}
