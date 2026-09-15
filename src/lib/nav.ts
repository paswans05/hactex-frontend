/*
 * Hactex React — nav tree structure (group ids → icon + display label).
 *
 * The manifest carries only slugs + `parent` (group id); it does NOT carry the
 * group's icon SVG or its display label (those live in the HTML sidebar
 * partial). This module restores that mapping so the React sidebar can render
 * groups from the manifest while keeping the reference's hand-drawn icons.
 *
 * Group order is by manifest `roots` order (already sorted); sections are
 * the manifest's `meta.sections`.
 */
import { getIndex, type ManifestNode } from './manifest';

export interface GroupMeta {
  id: string;
  label: string;
  /** Inner SVG markup for the group icon . */
  icon: string;
}

/** Section display label override (manifest uses uppercase codes). */
const SECTION_LABEL: Record<string, string> = {
  MAIN: 'Main',
  APPLICATIONS: 'Applications',
  MODULES: 'Modules',
  PAGES: 'Pages',
  'UI & FORMS': 'UI & Forms',
};

export function sectionLabel(code: string): string {
  return SECTION_LABEL[code] ?? code
    .split(' ')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

/** The caret chevron used by every group head. */
export const CARET_SVG =
  '<polyline points="9 18 15 12 9 6" />';

/** Group icon + label, keyed by group id. Mirrors sidebar.html verbatim. */
export const GROUP_META: Record<string, GroupMeta> = {
  'grp.dashboards': {
    id: 'grp.dashboards',
    label: 'Dashboards',
    icon: '<rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />',
  },
  'grp.apps': {
    id: 'grp.apps',
    label: 'Web Apps',
    icon: '<path d="M4 4h16v16H4z" /><path d="M4 12h16M12 4v16" />',
  },
  'grp.crm': {
    id: 'grp.crm',
    label: 'CRM',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />',
  },
  'grp.projects': {
    id: 'grp.projects',
    label: 'Projects',
    icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />',
  },
  'grp.ecommerce': {
    id: 'grp.ecommerce',
    label: 'eCommerce',
    icon: '<circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />',
  },
  'grp.crypto': {
    id: 'grp.crypto',
    label: 'Crypto',
    icon: '<circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />',
  },
  'grp.nft': {
    id: 'grp.nft',
    label: 'NFT',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />',
  },
  'grp.jobs': {
    id: 'grp.jobs',
    label: 'Jobs',
    icon: '<rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />',
  },
  'grp.blog': {
    id: 'grp.blog',
    label: 'Blog',
    icon: '<path d="M4 4h16v16H4z" /><path d="M4 9h16M9 4v16" />',
  },
  'grp.auth': {
    id: 'grp.auth',
    label: 'Authentication',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
  },
  'grp.utility': {
    id: 'grp.utility',
    label: 'Utility',
    icon: '<circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />',
  },
  'grp.ui': {
    id: 'grp.ui',
    label: 'UI Components',
    icon: '<circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="13" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="10" cy="20" r="2.5" /><path d="M12 2a10 10 0 1 0 0 20" />',
  },
  'grp.forms': {
    id: 'grp.forms',
    label: 'Forms',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h3" />',
  },
  'grp.charts': {
    id: 'grp.charts',
    label: 'Charts & Data',
    icon: '<path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" />',
  },
};

export interface NavSection {
  code: string;
  label: string;
  groups: { meta: GroupMeta; children: ManifestNode[] }[];
}

/*
 * Authoritative sidebar structure — section → group order, hand-mirrored from
 * the sidebar. Hactex's manifest is flat by design: it
 * carries the leaves only (each leaf knows its `parent` group id + `section`),
 * and the group nodes themselves live in the hand-authored HTML. We reproduce
 * that same hand-authored ordering here so the React sidebar matches the
 * reference exactly, then fill the leaves from the manifest.
 */
const SECTION_TREE: { code: string; label: string; groups: string[] }[] = [
  { code: 'MAIN', label: 'Main', groups: ['grp.dashboards'] },
  { code: 'APPLICATIONS', label: 'Applications', groups: ['grp.apps'] },
  {
    code: 'MODULES',
    label: 'Modules',
    groups: ['grp.crm', 'grp.projects', 'grp.ecommerce', 'grp.crypto', 'grp.nft', 'grp.jobs', 'grp.blog'],
  },
  { code: 'PAGES', label: 'Pages', groups: ['grp.auth', 'grp.utility'] },
  { code: 'UI & FORMS', label: 'UI & Forms', groups: ['grp.ui', 'grp.forms', 'grp.charts'] },
];

/** Build the full section → group → leaf tree for the sidebar. */
export function buildNav(): NavSection[] {
  const idx = getIndex();
  return SECTION_TREE.map((sec) => ({
    code: sec.code,
    label: sec.label,
    groups: sec.groups
      .map((gid) => {
        const meta = GROUP_META[gid];
        if (!meta) return null;
        const children = (idx.children[gid] || []).slice().sort((a, b) => a.order - b.order);
        return { meta, children };
      })
      .filter((g): g is { meta: GroupMeta; children: ManifestNode[] } => g !== null),
  }));
}
