/*
 * Hactex React — sidebar nav.
 *
 * Renders the section → group → leaf tree from lib/nav (manifest-driven),
 * preserving the reference's class names + ARIA. Group expand state is local
 * React state, seeded open along the active route's trail (mirrors nav.js).
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buildNav, CARET_SVG } from '../../lib/nav';
import { getUser, clearAuth } from '../../lib/auth';
import {
  childrenOf,
  hrefForSlug,
  nodeForPath,
  resolve,
  trail,
  type ManifestNode,
} from '../../lib/manifest';
import { Icon } from '../ui/Icon';
import { NavFlyout } from './NavFlyout';
import { isMobile } from '../../lib/sidebar';

/** Which group's flyout is open, and the head it hangs off. */
interface FlyoutState {
  id: string;
  anchor: HTMLElement;
}

export function Sidebar(): React.JSX.Element {
  const { pathname } = useLocation();
  const nav = useMemo(() => buildNav(), []);
  const activeSlug = nodeForPath(pathname)?.slug ?? '';
  const [currentUser, setCurrentUser] = useState(getUser());

  useEffect(() => {
    const onAuth = (): void => setCurrentUser(getUser());
    window.addEventListener('at:auth-change', onAuth);
    return () => window.removeEventListener('at:auth-change', onAuth);
  }, []);

  /* The groups on the active route's trail. This is ROUTE state, kept separate
     from the expand state below on purpose: the rail paints the group icon for
     the trail (.is-trail in nav.css), and expand state flips on every header
     click — key the accent off that and every icon the user clicked in the rail
     stays highlighted and the "selection" accumulates. Mirrors step 5 of
     core/nav.js. */
  const trailIds = useMemo<Set<string>>(() => {
    const node = nodeForPath(pathname);
    const chain = trail(resolve(node));
    const ids = new Set<string>();
    chain.forEach((n) => n.parent && ids.add(n.parent));
    return ids;
  }, [pathname]);

  // Seed open groups from the active trail so the current page is visible. The
  // fallback is expand state only — a group with no route under it is not on
  // the trail and must not be accented as if it were.
  const initialOpen = useMemo<Set<string>>(
    () => (trailIds.size ? new Set(trailIds) : new Set(['grp.dashboards'])),
    [trailIds],
  );

  const [open, setOpen] = useState<Set<string>>(initialOpen);
  // Re-seed when the route changes (deep compare by slug set).
  const key = Array.from(initialOpen).sort().join('|');
  const [lastKey, setLastKey] = useState(key);
  if (key !== lastKey) {
    setLastKey(key);
    setOpen(initialOpen);
  }

  /* ── Collapsed-rail flyout ──
     The rail hides every .at-nav__group-body outright (display:none !important
     in nav.css §compact), so hovering the group icon is the only way to reach
     its children — this popover is that way in.

     Whether the rail is active is read off the DOM at event time instead of
     being tracked here: collapse lives on <html data-at-collapsed> (lib/sidebar)
     and the sidebar-style variant on <html data-at-sidebar-style>, both written
     outside React. Mirroring either into component state would only add a second
     source of truth that the anti-flash IIFE would beat on first paint. */
  const [flyout, setFlyout] = useState<FlyoutState | null>(null);
  const timer = useRef<number | null>(null);

  const cancel = (): void => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };
  // Clear a pending open/close if the sidebar unmounts mid-delay.
  useEffect(() => cancel, []);

  /* True while the sidebar is icon-only — the user-collapsed rail or the
     compact sidebar style. Both hide .at-nav__group-body outright. Mobile is
     excluded: below 993px the sidebar is a drawer and the flyout is display:none
     (nav.css), so the inline accordion has to keep working there even though
     data-at-collapsed is still set from the desktop session. */
  const isRail = (): boolean => {
    if (isMobile()) return false;
    const D = document.documentElement;
    return (
      D.getAttribute('data-at-collapsed') === 'true' ||
      D.getAttribute('data-at-sidebar-style') === 'compact'
    );
  };

  /* In the rail there is no group body to expand, so toggling would silently
     mutate state the user cannot see — and then surface it as a pile of
     expanded groups the moment the sidebar is widened again. Clicking an icon
     there shows its flyout instead, which is also what touch users need since
     they never fire the hover that normally opens it. */
  const toggle = (id: string, anchor: HTMLElement): void => {
    if (isRail()) {
      cancel();
      setFlyout((f) => (f && f.id === id ? null : { id, anchor }));
      return;
    }
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* Both edges are delayed on purpose: opening late stops the panel flickering
     as the pointer crosses adjacent icons, and closing late leaves time to
     cross the 8px gap into the panel, where holdFlyout cancels the close. */
  const hoverGroup = (id: string, anchor: HTMLElement): void => {
    // Expanded sidebar shows the group body inline, so a popover would be noise.
    if (!isRail()) return;
    cancel();
    timer.current = window.setTimeout(() => setFlyout({ id, anchor }), 120);
  };
  const leaveGroup = (): void => {
    cancel();
    timer.current = window.setTimeout(() => setFlyout(null), 140);
  };
  const holdFlyout = (): void => cancel();
  const closeFlyout = (): void => {
    cancel();
    setFlyout(null);
  };

  // Flat group lookup so the open flyout can find its label + leaves.
  const groups = useMemo(() => nav.flatMap((s) => s.groups), [nav]);
  /* The flyout layer stays mounted for the whole session (see NavFlyout), so
     the closing group's contents have to outlive `flyout` going null — the
     140ms exit transition plays against them. Keep the last one rendered. */
  const lastFlyout = useRef<FlyoutState | null>(null);
  if (flyout) lastFlyout.current = flyout;
  const shownFlyout = flyout ?? lastFlyout.current;
  const flyoutGroup = shownFlyout ? groups.find((g) => g.meta.id === shownFlyout.id) : undefined;

  /* One definition of a nav leaf, rendered both inline in the tree and inside
     the flyout. The reference clones the rail's DOM nodes into the popover;
     rendering from the same data instead keeps the links as real <Link>s, so a
     flyout click routes client-side rather than triggering a full page load. */
  const renderLeaf = (leaf: ManifestNode, onClick?: () => void): React.JSX.Element => {
    const active = leaf.slug === activeSlug;
    const badgeKind = leaf.badge && /^\d+$/.test(leaf.badge) ? 'neutral' : 'accent';
    return (
      <Link
        key={leaf.id}
        to={hrefForSlug(leaf.slug)}
        className={`at-nav__item${active ? ' is-active' : ''}`}
        data-at-route={leaf.slug}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
      >
        <span className="at-nav__label">{leaf.title}</span>
        {leaf.badge && (
          <span className="at-nav__badge">
            <span className={`at-badge at-badge--${badgeKind}`}>{leaf.badge}</span>
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="at-sidebar" id="at-sidebar">
      {/* Brand — links to the app root, the convention every other "home"
          target in the template already follows (the error pages' back-to-home
          button, the auth lockups, the app bar). One link around the whole
          lockup rather than one on each half: two adjacent links to the same
          destination are two stops for a keyboard or screen-reader user, and
          the stamp's aria-hidden left the first of them unnamed. */}
      <Link to="/" className="at-sidebar__brand" aria-label="Hactex home">
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
        <span className="at-sidebar__wordmark">Hactex</span>
      </Link>

      {/* Nav */}
      <nav className="at-sidebar__nav" aria-label="Primary">
        {nav.map((section) => (
          <div key={section.code}>
            <div className="at-sidebar__section">{section.label}</div>
            {section.groups.map(({ meta, children }) => {
              const leaves = children.length ? children : childrenOf(meta.id);
              const isOpen = open.has(meta.id);
              const variant =
                meta.id === 'grp.dashboards'
                  ? ' at-nav__group--dashboards'
                  : meta.id === 'grp.apps'
                    ? ' at-nav__group--apps'
                    : '';
              return (
                <div
                  key={meta.id}
                  // .is-trail is route state, .is-open is expand state — see the
                  // trailIds note above for why the rail accent keys off the
                  // former. Both mirror what core/nav.js writes.
                  className={`at-nav__group${variant}${trailIds.has(meta.id) ? ' is-trail' : ''}${isOpen ? ' is-open' : ''}`}
                  data-at-group={meta.id}
                  data-at-collapse
                >
                  <button
                    className="at-nav__group-head"
                    onClick={(e) => toggle(meta.id, e.currentTarget)}
                    aria-expanded={isOpen}
                    onMouseEnter={(e) => hoverGroup(meta.id, e.currentTarget)}
                    onMouseLeave={leaveGroup}
                  >
                    <Icon className="at-nav__icon" path={meta.icon} size={20} />
                    <span>{meta.label}</span>
                    <Icon className="at-nav__caret" path={CARET_SVG} size={16} stroke={2.5} />
                  </button>
                  {isOpen && (
                    <div className="at-nav__group-body">
                      {leaves.map((leaf) => renderLeaf(leaf))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* CTA */}
      <div className="at-sidebar__cta">
        <h5>Go Pro</h5>
        <p>Unlock advanced analytics &amp; real-time exports.</p>
        <button className="at-btn at-btn--dark at-btn--sm at-btn--block at-press">Upgrade</button>
      </div>

      {/* User */}
      <div className="at-sidebar__user">
        <div className="at-avatar at-avatar--sm">
          {(currentUser?.name || 'A')[0].toUpperCase()}
        </div>
        <div className="at-sidebar__user-info">
          <div className="at-sidebar__user-name">{currentUser?.name || 'Administrator'}</div>
          <div className="at-sidebar__user-email">
            {currentUser?.email || (currentUser?.username ? `${currentUser.username}@hactex.ai` : 'admin@hactex.ai')}
          </div>
        </div>
        <Link to="/auth/login" onClick={() => clearAuth()} className="at-icon-btn" aria-label="Sign out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </Link>
      </div>

      {/* Portaled to <body> — see NavFlyout for why it cannot live in the tree,
          and why it is mounted for the session rather than per-open. */}
      <NavFlyout
        open={flyout !== null}
        anchor={shownFlyout?.anchor ?? null}
        title={flyoutGroup?.meta.label ?? ''}
        onMouseEnter={holdFlyout}
        onMouseLeave={leaveGroup}
      >
        {flyoutGroup
          ? (flyoutGroup.children.length
            ? flyoutGroup.children
            : childrenOf(flyoutGroup.meta.id)
          ).map((leaf) => renderLeaf(leaf, closeFlyout))
          : null}
      </NavFlyout>
    </aside>
  );
}
