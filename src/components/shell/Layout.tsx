/*
 * Hactex React — the app shell wrapper. Composes loader + sidebar + header +
 * main + footer + customizer + command palette. Owns the global ⌘K listener
 * and keeps <html data-at-route> in sync with the current path (so the
 * anti-flash + active-trail stay correct on SPA navigation).
 *
 * Rendered as a layout route: children render inside <main>.
 */
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { Customizer } from './Customizer';
import { CommandPalette } from './CommandPalette';
import { slugFromPath } from '../../lib/manifest';
import { closeDrawer } from '../../lib/sidebar';
import { isAuthenticated, clearAuth } from '../../lib/auth';

export function Layout(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [commandOpen, setCommandOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Authentication guard: redirect to /auth/login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/auth/login', { replace: true, state: { from: location.pathname } });
    }
  }, [location.pathname, navigate]);

  // Listen for unauthorized events
  useEffect(() => {
    const handleUnauthorized = (): void => {
      clearAuth();
      navigate('/auth/login', { replace: true });
    };
    window.addEventListener('at:auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('at:auth-unauthorized', handleUnauthorized);
  }, [navigate]);

  // keep <html data-at-route> in sync, and dismiss the mobile drawer — tapping a
  // nav item is a client-side navigation, so nothing would otherwise close it.
  useEffect(() => {
    document.documentElement.setAttribute('data-at-route', slugFromPath(location.pathname));
    document.title = 'Hactex';
    closeDrawer();
  }, [location.pathname]);

  // global ⌘K / Ctrl+K, plus Escape to dismiss the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      } else if (e.key === 'Escape') {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Loader />
      <div className="at-layout">
        <Sidebar />
        <div className="at-shell">
          <Header
            onCommand={() => setCommandOpen(true)}
            onCustomizer={() => setCustomizerOpen(true)}
          />
          <main className="at-main" id="at-main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      {/* One scrim, two owners. Always mounted — base.css §12 parks it at
          opacity 0 / pointer-events none and §13 (drawer) and
          body.at-customizer-open raise it, so there is no state to mirror here.
          Nothing may set `display` on it: the pair already leaves it invisible
          and inert, and unlike display it is something the browser can fade.
          Clicking it dismisses whichever layer put it up. */}
      <div
        className="at-backdrop"
        onClick={() => {
          closeDrawer();
          setCustomizerOpen(false);
        }}
        aria-hidden="true"
      />
      <Customizer open={customizerOpen} onClose={() => setCustomizerOpen(false)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
