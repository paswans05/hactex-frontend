/*
 * Hactex React — Pagination UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup. The four repeating chevron icons
 * are extracted as small module-level const components.
 */
import { PageHead } from '../../components/shell/PageHead';

const prevIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const nextIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const firstIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
    <polyline points="11 19 6 12 11 5" />
    <polyline points="18 19 13 12 18 5" />
  </svg>
);

const lastIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
    <polyline points="13 19 18 12 13 5" />
    <polyline points="6 19 11 12 6 5" />
  </svg>
);

export default function Pagination(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Pagination"
        subtitle="Navigate long lists and result sets across pages."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Refresh</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Default */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Default</div>
                <div className="at-eyebrow">Numbered with active state</div>
              </div>
            </div>
            <div className="at-pagination">
              <button className="at-pagination__btn" aria-label="Previous">{prevIcon}</button>
              <button className="at-pagination__btn is-active">1</button>
              <button className="at-pagination__btn">2</button>
              <button className="at-pagination__btn">3</button>
              <button className="at-pagination__btn">4</button>
              <button className="at-pagination__btn">5</button>
              <button className="at-pagination__btn" aria-label="Next">{nextIcon}</button>
            </div>
          </div>

          {/* 2. Ellipsis & jumps */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Ellipsis &amp; jumps</div>
                <div className="at-eyebrow">Collapse middle range, jump to ends</div>
              </div>
            </div>
            <div className="at-pagination">
              <button className="at-pagination__btn" aria-label="First">{firstIcon}</button>
              <button className="at-pagination__btn" aria-label="Previous">{prevIcon}</button>
              <button className="at-pagination__btn">1</button>
              <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
              <button className="at-pagination__btn">6</button>
              <button className="at-pagination__btn is-active">7</button>
              <button className="at-pagination__btn">8</button>
              <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
              <button className="at-pagination__btn">24</button>
              <button className="at-pagination__btn" aria-label="Next">{nextIcon}</button>
              <button className="at-pagination__btn" aria-label="Last">{lastIcon}</button>
            </div>
          </div>

          {/* 3. With summary */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">With summary</div>
                <div className="at-eyebrow">Result range alongside controls</div>
              </div>
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--at-space-3)' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Showing 11–20 of 1,847 records</span>
              <div className="at-pagination">
                <button className="at-pagination__btn" aria-label="Previous">{prevIcon}</button>
                <button className="at-pagination__btn">1</button>
                <button className="at-pagination__btn is-active">2</button>
                <button className="at-pagination__btn">3</button>
                <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
                <button className="at-pagination__btn">185</button>
                <button className="at-pagination__btn" aria-label="Next">{nextIcon}</button>
              </div>
            </div>
          </div>

          {/* 4. Rounded pills */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Rounded pills</div>
                <div className="at-eyebrow">Soft geometry variant</div>
              </div>
            </div>
            <div className="at-pagination" style={{ gap: 'var(--at-space-2)' }}>
              <button className="at-pagination__btn" aria-label="Previous" style={{ borderRadius: '999px' }}>{prevIcon}</button>
              <button className="at-pagination__btn" style={{ borderRadius: '999px' }}>1</button>
              <button className="at-pagination__btn is-active" style={{ borderRadius: '999px' }}>2</button>
              <button className="at-pagination__btn" style={{ borderRadius: '999px' }}>3</button>
              <button className="at-pagination__btn" style={{ borderRadius: '999px' }}>4</button>
              <button className="at-pagination__btn" aria-label="Next" style={{ borderRadius: '999px' }}>{nextIcon}</button>
            </div>
          </div>

          {/* 5. Prev / next only */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Prev / next only</div>
                <div className="at-eyebrow">Minimal step navigation</div>
              </div>
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--outline at-press">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Previous
              </button>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Page 3 of 12</span>
              <button className="at-btn at-btn--outline at-press">
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* 6. Page size */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Page size</div>
                <div className="at-eyebrow">Density control with selector</div>
              </div>
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--at-space-3)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Rows</span>
                <button className="at-btn at-btn--outline at-press" style={{ paddingInline: 'var(--at-space-3)' }}>
                  25
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
              <div className="at-pagination">
                <button className="at-pagination__btn" aria-label="Previous">{prevIcon}</button>
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
                <button className="at-pagination__btn">3</button>
                <button className="at-pagination__btn" aria-label="Next">{nextIcon}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width table footer example */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">In a table footer</div>
              <div className="at-eyebrow">Realistic placement with aligned summary</div>
            </div>
          </div>
          <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--at-space-3)' }}>
            <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Showing 1–10 of 482 items</span>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Page</span>
              <div className="at-pagination">
                <button className="at-pagination__btn" aria-label="Previous">{prevIcon}</button>
                <button className="at-pagination__btn">1</button>
                <button className="at-pagination__btn is-active">2</button>
                <button className="at-pagination__btn">3</button>
                <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
                <button className="at-pagination__btn">49</button>
                <button className="at-pagination__btn" aria-label="Next">{nextIcon}</button>
              </div>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>of 49</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
