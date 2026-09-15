/*
 * Hactex React — nav-manifest index + slug/path helpers.
 * Single source for sidebar, breadcrumb,
 * command palette, and active-trail resolution. The JSON is bundled
 * (resolveJsonModule), not fetched.
 */
import raw from '../data/nav-manifest.json';

export interface ManifestNode {
  id: string;
  title: string;
  slug: string;
  icon: string;
  parent: string | null;
  section: string;
  order: number;
  badge: string | null;
  keywords: string[];
  inMenu: boolean;
  alias: string | null;
  external: boolean;
}
export interface ManifestData {
  $schema: string;
  meta: {
    spec: string;
    registryRoutes: number;
    deliverableHtmlFiles: number;
    sections: string[];
  };
  nodes: ManifestNode[];
}

const data = raw as unknown as ManifestData;
export const SECTIONS = data.meta.sections;
export const DEFAULT_SLUG = 'dashboards/sales';

export interface ManifestIndex {
  byId: Record<string, ManifestNode>;
  bySlug: Record<string, ManifestNode>;
  children: Record<string, ManifestNode[]>;
  roots: ManifestNode[];
}

const index: ManifestIndex = {
  byId: {},
  bySlug: {},
  children: {},
  roots: [],
};

data.nodes.forEach((n) => {
  index.byId[n.id] = n;
  if (n.slug) index.bySlug[n.slug] = n;
});
data.nodes.forEach((n) => {
  const p = n.parent || '__root__';
  (index.children[p] = index.children[p] || []).push(n);
  if (!n.parent) index.roots.push(n);
});
// sort children by order for deterministic rendering
Object.keys(index.children).forEach((k) =>
  index.children[k].sort((a, b) => a.order - b.order),
);

export function getIndex(): ManifestIndex {
  return index;
}
export function getManifest(): ManifestData {
  return data;
}

/** Resolve alias chains to the canonical node. */
export function resolve(node: ManifestNode | null | undefined): ManifestNode | null | undefined {
  if (!node) return node;
  return (node.alias && index.byId[node.alias]) || node;
}

/** Trail: root → … → node. */
export function trail(node: ManifestNode | null | undefined): ManifestNode[] {
  const chain: ManifestNode[] = [];
  let cur = node;
  let guard = 0;
  while (cur && guard++ < 10) {
    chain.unshift(cur);
    cur = cur.parent ? index.byId[cur.parent] : null;
  }
  return chain;
}

/** Top-level groups in a section, in manifest order. */
export function groupsInSection(section: string): ManifestNode[] {
  return index.roots.filter((n) => n.section === section);
}

/** Children of a group, sorted. */
export function childrenOf(parentId: string): ManifestNode[] {
  return index.children[parentId] || [];
}

export function slugFromPath(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  if (!slug || slug === 'index') return DEFAULT_SLUG;
  return slug;
}

export function hrefForSlug(slug: string): string {
  if (slug === DEFAULT_SLUG) return '/';
  return '/' + slug;
}

export function nodeForPath(pathname: string): ManifestNode | undefined {
  return index.bySlug[slugFromPath(pathname)];
}
