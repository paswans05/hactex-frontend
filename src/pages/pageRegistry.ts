/*
 * Hactex React — auto page registry.
 *
 * Globs every page module under ./ (each default-exports a component) and maps
 * its manifest slug → lazy component, so the router mounts any of the 113
 * routes without hand-written <Route> entries.
 *
 * File-name → slug convention (matches the manifest `slug` field):
 *   ./dashboards.tsx        → dashboards/sales
 *   ./auth/SignInBasic.tsx        → auth/sign-in-basic
 *   ./ecommerce/ProductDetails.tsx→ ecommerce/product-details
 *
 * When a file can't be named to kebab to its slug (TSX files can't start with a
 * digit, so error/404 → error/Error404.tsx → "error/error-404"), it exports
 * `SLUG` to override, and is also listed in SLUG_OVERRIDES below so the
 * manifest slug is known at registration time without loading the module.
 *
 * Pages not yet ported simply don't exist as files; the router falls back to
 * <Placeholder> for them. Excludes this registry file and Placeholder.tsx.
 */
import { lazy, type ComponentType } from 'react';

type ModuleLoader = () => Promise<{ default: ComponentType }>;

const modules = import.meta.glob<{ default: ComponentType }>('./**/*.tsx', {
  eager: false,
}) as Record<string, ModuleLoader>;

/**
 * Map of file path (relative to ./) → manifest slug, for files whose name
 * cannot kebab to their slug. TSX files cannot start with a digit, so the five
 * HTTP-error pages are named `Error<N>.tsx` and pinned here.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  'error/Error401.tsx': 'error/401',
  'error/Error403.tsx': 'error/403',
  'error/Error404.tsx': 'error/404',
  'error/Error500.tsx': 'error/500',
  'error/Error503.tsx': 'error/503',
  // Top-level pages live directly under src/pages/ (no group/slash in the path),
  // so slugFromPath would otherwise skip them — pin their manifest slugs here.
  'Docs.tsx': 'docs',
  'Widgets.tsx': 'widgets',
  'auth/SignInBasic.tsx': 'auth/login',
  'auth/SignUpBasic.tsx': 'auth/register',
  'company/CompanySetup.tsx': 'company/setup',
  'users/UsersList.tsx': 'users',
};

/** Derive a manifest slug from a page file path. */
function slugFromPath(path: string): string | null {
  // import.meta.glob yields './group/Name.tsx'; strip the './' BEFORE the
  // override lookup, since SLUG_OVERRIDES is keyed without it. Looking up the
  // raw './…' path never matched, so the five error pages fell through to
  // "error/error401" (no such slug) and Docs/Widgets were skipped outright —
  // all seven rendered <Placeholder> instead of their real page.
  const rel = path.replace(/^\.\//, '');
  if (SLUG_OVERRIDES[rel]) return SLUG_OVERRIDES[rel];
  const cleaned = rel.replace(/\.tsx$/, '');
  const slash = cleaned.lastIndexOf('/');
  if (slash < 0) return null; // top-level files (Placeholder, this registry) — skip
  const group = cleaned.slice(0, slash);
  const name = cleaned.slice(slash + 1);
  return `${group}/${kebab(name)}`;
}

function kebab(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** slug → lazy page component. Built once at module load. */
export const pageBySlug: Map<string, ComponentType> = new Map();

for (const [path, loader] of Object.entries(modules)) {
  // skip the registry itself and the placeholder fallback
  if (path.endsWith('pageRegistry.tsx') || path.endsWith('Placeholder.tsx')) continue;
  const slug = slugFromPath(path);
  if (!slug) continue;
  const comp = lazy(() => loader().then((m) => ({ default: m.default })));
  pageBySlug.set(slug, comp);

  // Keep backward-compatible aliases for legacy routes
  if (slug === 'auth/login') {
    pageBySlug.set('auth/sign-in-basic', comp);
  } else if (slug === 'auth/register') {
    pageBySlug.set('auth/sign-up-basic', comp);
  }
}

// Map root dashboard aliases to the main Sales dashboard
const salesComp = pageBySlug.get('dashboards/sales');
if (salesComp) {
  pageBySlug.set('dashboard', salesComp);
  pageBySlug.set('dashboards', salesComp);
}
