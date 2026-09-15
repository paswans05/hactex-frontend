/*
 * Hactex React — router + route registry.
 *
 * Manifest-driven: every page file under src/pages/ is auto-registered (see
 * pageRegistry.ts), so all 113 routes mount without hand-written <Route>
 * entries. Shell selection is by slug group:
 *   - auth/*, error/*  → <BareShell>   (standalone, no sidebar)
 *   - apps/*           → <AppShell>    (fullscreen appbar)
 *   - everything else  → <Layout>      (sidebar + header + footer)
 * Unported slugs fall back to <Placeholder>.
 *
 * Each shell renders the current page via <Outlet/>. data-at-route on <html>
 * is kept in sync by each shell so the sidebar active-trail + anti-flash stay
 * correct on SPA navigation.
 */
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CustomizerProvider } from './context/CustomizerContext';
import { Layout } from './components/shell/Layout';
import { AppShell } from './components/shell/AppShell';
import { BareShell } from './components/shell/BareShell';
import { LandingShell } from './components/shell/LandingShell';
import { pageBySlug } from './pages/pageRegistry';
import { DEFAULT_SLUG } from './lib/manifest';

const Placeholder = lazy(() =>
  import('./pages/Placeholder').then((m) => ({ default: m.Placeholder })),
);

const fallback = <></>; // loader + shell cover the fetch

/** Renders the page component for the current slug (lazy + Suspense). */
function Page(): React.JSX.Element {
  const { pathname } = useLocation();
  const slug = pathnameToSlug(pathname);
  const PageComponent = pageBySlug.get(slug);
  const Comp = PageComponent ?? Placeholder;
  return (
    <Suspense fallback={fallback}>
      <Comp />
    </Suspense>
  );
}

/** Shell chooser: returns the layout-route element for the current slug group. */
function Shell(): React.JSX.Element {
  const { pathname } = useLocation();
  const slug = pathnameToSlug(pathname);
  if (slug === 'pages/landing') return <LandingShell />;
  if (slug.startsWith('apps/')) return <AppShell />;
  if (slug.startsWith('auth/') || slug.startsWith('error/')) return <BareShell />;
  return <Layout />;
}

export function App(): React.JSX.Element {
  return (
    <CustomizerProvider>
      {/* basename comes from Vite's `base`, so a build made with
          `vite build --base=/admin/` routes correctly under that prefix with no
          other change. At the default base it is '/', which is a no-op. */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Page />} />
            <Route path="*" element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomizerProvider>
  );
}

/** Normalize a pathname to a manifest slug. */
function pathnameToSlug(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  if (!slug || slug === 'index' || slug === 'landing') return DEFAULT_SLUG;
  return slug;
}
