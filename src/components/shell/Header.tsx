/*
 * Hactex React — app header.
 * 11 controls: menu toggle, ⌘K search, language, fullscreen, theme toggle,
 * apps, cart, notifications, profile, customizer. Dropdowns use <Dropdown>.
 */
import { Dropdown } from '../ui/Dropdown';
import { useCustomizer } from '../../context/CustomizerContext';
import { hrefForSlug } from '../../lib/manifest';
import { toggleSidebar } from '../../lib/sidebar';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  onCommand: () => void;
  onCustomizer: () => void;
}

export function Header({ onCommand, onCustomizer }: HeaderProps): React.JSX.Element {
  const c = useCustomizer();

  const toggleFullscreen = (): void => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  };

  return (
    <header className="at-header">
      {/* 1. Sidebar toggle — drawer on mobile, icon rail on desktop. Called
          directly rather than lifted into Layout state: the toggle's only
          output is a body class + an <html> attribute (see lib/sidebar.ts). */}
      <button className="at-menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* 2. ⌘K search */}
      <div className="at-search" role="button" tabIndex={0} onClick={onCommand}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="at-search__placeholder">Search anything…</span>
        <span className="at-search__kbd">⌘K</span>
      </div>

      <div className="at-header__right">
        {/* 4. Language */}
        <Dropdown
          className="at-icon-btn"
          headerSlot="language"
          ariaLabel="Language"
          placement="bottom"
          trigger={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
        >
          {(close) => (
            <>
              <button className="at-dropdown__item" onClick={() => { c.setLang('en'); close(); }}>English</button>
              <button className="at-dropdown__item" onClick={() => { c.setLang('ar'); close(); }}>العربية (RTL)</button>
              <button className="at-dropdown__item" onClick={() => { c.setLang('es'); close(); }}>Español</button>
            </>
          )}
        </Dropdown>

        {/* 5. Fullscreen */}
        <button
          className="at-icon-btn"
          data-at-header-slot="fullscreen"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>

        {/* 6. Theme toggle */}
        <button className="at-icon-btn" onClick={c.toggleTheme} aria-label="Toggle theme">
          {c.resolved !== 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* 7. Apps */}
        <Dropdown
          className="at-icon-btn"
          headerSlot="apps"
          ariaLabel="Apps"
          placement="bottom"
          trigger={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          )}
        >
          {() => (
            <>
              <div className="at-apps-grid__title">Quick Apps</div>
              <div className="at-apps-grid">
                <Link className="at-apps-grid__item" to={hrefForSlug('dashboards/ecommerce')}><span>eCommerce</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/chat')}><span>Chat</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/email')}><span>Email</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/calendar')}><span>Calendar</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/kanban')}><span>Kanban</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/contacts')}><span>Contacts</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/todo')}><span>Todo</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/notes')}><span>Notes</span></Link>
                <Link className="at-apps-grid__item" to={hrefForSlug('apps/file-manager')}><span>Files</span></Link>
              </div>
            </>
          )}
        </Dropdown>

        {/* 8. Cart */}
        <Dropdown
          className="at-icon-btn"
          headerSlot="cart"
          ariaLabel="Cart"
          placement="bottom"
          role="button"
          trigger={() => (
            <>
              <span className="at-cart__badge">3</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </>
          )}
        >
          {() => (
            <div className="at-cart">
              <div className="at-cart__head">
                <span className="at-cart__title">Your Cart</span>
                <span className="at-cart__count">3 items</span>
              </div>
              <div className="at-cart__list">
                <Link className="at-cart__item" to={hrefForSlug('ecommerce/product-details')}>
                  <span className="at-cart__body">
                    <span className="at-cart__name">Wireless Headphones</span>
                    <span className="at-cart__meta">1 × $129.00</span>
                  </span>
                  <span className="at-cart__price">$129.00</span>
                </Link>
                <Link className="at-cart__item" to={hrefForSlug('ecommerce/product-details')}>
                  <span className="at-cart__body">
                    <span className="at-cart__name">Smartphone Case Pro</span>
                    <span className="at-cart__meta">2 × $19.50</span>
                  </span>
                  <span className="at-cart__price">$39.00</span>
                </Link>
                <Link className="at-cart__item" to={hrefForSlug('ecommerce/product-details')}>
                  <span className="at-cart__body">
                    <span className="at-cart__name">Design Template Pack</span>
                    <span className="at-cart__meta">1 × $49.00</span>
                  </span>
                  <span className="at-cart__price">$49.00</span>
                </Link>
              </div>
              <div className="at-cart__foot">
                <div className="at-cart__subtotal">
                  <span className="at-cart__subtotal-label">Subtotal</span>
                  <span className="at-cart__subtotal-value">$217.00</span>
                </div>
                <div className="at-cart__actions">
                  <Link className="at-btn at-btn--outline at-btn--sm" to={hrefForSlug('ecommerce/cart')}>View Cart</Link>
                  <Link className="at-btn at-btn--primary at-btn--sm" to={hrefForSlug('ecommerce/checkout')}>Checkout</Link>
                </div>
              </div>
            </div>
          )}
        </Dropdown>

        {/* 9. Notifications */}
        <Dropdown
          className="at-icon-btn"
          ariaLabel="Notifications"
          placement="bottom"
          trigger={() => (
            <>
              <span className="at-dot" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </>
          )}
        >
          {() => (
            <div className="at-notif">
              <div className="at-notif__head">
                <span className="at-notif__title">Notifications</span>
              </div>
              <div className="at-notif__list">
                <Link className="at-notif__item" to={hrefForSlug('apps/email')}>
                  <span className="at-notif__body">
                    <span className="at-notif__text"><strong>New message</strong> from Sarah Lee about the Q3 report.</span>
                    <span className="at-notif__time">2 min ago</span>
                  </span>
                </Link>
                <Link className="at-notif__item" to={hrefForSlug('ecommerce/orders')}>
                  <span className="at-notif__body">
                    <span className="at-notif__text">Order <strong>#10293</strong> was placed by a new customer.</span>
                    <span className="at-notif__time">18 min ago</span>
                  </span>
                </Link>
                <Link className="at-notif__item" to={hrefForSlug('crm/leads')}>
                  <span className="at-notif__body">
                    <span className="at-notif__text"><strong>3 new leads</strong> assigned to you from the website form.</span>
                    <span className="at-notif__time">1 hour ago</span>
                  </span>
                </Link>
              </div>
              <Link className="at-notif__footer" to={hrefForSlug('apps/email')}>View all notifications</Link>
            </div>
          )}
        </Dropdown>

        <span className="at-header__divider" />

        {/* 10. Profile */}
        <Dropdown
          className="at-header__user"
          placement="bottom"
          trigger={() => (
            <>
              <div className="at-avatar at-avatar--sm">A</div>
              <span className="at-header__user-name">Alex Morgan</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </>
          )}
        >
          {() => (
            <div style={{ minWidth: 220 }}>
              <div style={{ padding: 'var(--at-space-3)', borderBlockEnd: '1px solid var(--at-border)' }}>
                <div style={{ fontWeight: 700, color: 'var(--at-text-strong)' }}>Alex Morgan</div>
                <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-muted)' }}>alex@atelier.co</div>
              </div>
              <Link className="at-dropdown__item" to={hrefForSlug('pages/profile')}>Profile</Link>
              <Link className="at-dropdown__item" to={hrefForSlug('pages/settings')}>Settings</Link>
              <Link className="at-dropdown__item" to={hrefForSlug('auth/login')}>Sign out</Link>
            </div>
          )}
        </Dropdown>

        {/* 11. Customizer */}
        <button className="at-icon-btn" onClick={onCustomizer} aria-label="Customizer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
