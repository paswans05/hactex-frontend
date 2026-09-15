/*
 * Hactex React — POS & Retail dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: "Today's Sales", value: '$9,840', delta: '▲ 7.2%', dir: 'up' },
  { label: 'Transactions', value: '412', delta: '▲ 4.0%', dir: 'up' },
  { label: 'Avg. Basket', value: '$23.88', delta: '▲ 1.1%', dir: 'up' },
  { label: 'Items Sold', value: '1,206', delta: '▲ 5.5%', dir: 'up' },
];

const HOURLY_CATEGORIES = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
const HOURLY_SERIES = [{ name: 'Sales', data: [420, 680, 1120, 1480, 1620, 1340, 980, 720, 480, 400, 560, 820] }];

const CATEGORY_SERIES = [38, 26, 18, 12, 6];
const CATEGORY_LABELS = ['Beverages', 'Bakery', 'Snacks', 'Produce', 'Household'];

const KEYPAD = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', 'C', '+'];

const PAYMENTS = [
  { method: 'Card', meta: '$5,820 · 59%', width: '59%', variant: '' },
  { method: 'Cash', meta: '$2,180 · 22%', width: '22%', variant: 'at-progress--success' },
  { method: 'Mobile', meta: '$1,240 · 13%', width: '13%', variant: 'at-progress--info' },
  { method: 'Voucher', meta: '$600 · 6%', width: '6%', variant: 'at-progress--warning' },
];

const SALES = [
  { receipt: '#R-10428', items: '3', payment: 'Card', total: '$42.80' },
  { receipt: '#R-10427', items: '1', payment: 'Mobile', total: '$8.40' },
  { receipt: '#R-10426', items: '5', payment: 'Cash', total: '$24.20' },
  { receipt: '#R-10425', items: '2', payment: 'Card', total: '$18.60' },
  { receipt: '#R-10424', items: '4', payment: 'Voucher', total: '$32.00' },
];

const STOCK = [
  { name: 'Oat Milk', note: '3 left', kind: 'danger' },
  { name: 'Bagels', note: '8 left', kind: 'warning' },
  { name: 'Espresso beans', note: '6 left', kind: 'warning' },
  { name: 'Cups (12oz)', note: '1 box', kind: 'danger' },
];

const LANES = [
  { num: '1', operator: 'Maya O.', meta: 'Lane 1 · 138 sales', revenue: '$3,210', pct: '37%', width: '100%', variant: '', status: 'Open', kind: 'success', chartVar: '--at-success', avatarBg: 'color-mix(in oklab, var(--at-success) 18%, transparent)', avatarColor: 'var(--at-success-text)', revenueMuted: false, footer: null },
  { num: '2', operator: 'Diego R.', meta: 'Lane 2 · 121 sales', revenue: '$2,890', pct: '34%', width: '90%', variant: 'at-progress--info', status: 'Open', kind: 'success', chartVar: '--at-chart-2', avatarBg: 'color-mix(in oklab, var(--at-chart-2) 18%, transparent)', avatarColor: 'var(--at-chart-2-text)', revenueMuted: false, footer: null },
  { num: '3', operator: 'Self-checkout', meta: 'Lane 3 · 116 sales', revenue: '$2,470', pct: '29%', width: '77%', variant: 'at-progress--warning', status: 'Cash due', kind: 'warning', chartVar: '--at-warning', avatarBg: 'color-mix(in oklab, var(--at-warning) 18%, transparent)', avatarColor: 'var(--at-warning-text)', revenueMuted: false, footer: null },
  { num: '4', operator: 'Unstaffed', meta: 'Lane 4 · offline', revenue: '—', pct: '0%', width: '', variant: '', status: 'Closed', kind: 'neutral', chartVar: '', avatarBg: 'var(--at-surface-subtle)', avatarColor: 'var(--at-text-muted)', revenueMuted: true, footer: 'Closed since 14:00' },
];

export const SLUG = 'dashboards/pos';

export default function Pos(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="POS & Retail"
        subtitle="Register, sales & stock — today."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Today</button>
            <button className="at-btn at-btn--primary at-press">New sale</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* KPI row */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <div className={`at-kpi__delta at-kpi__delta--${k.dir}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Hourly sales + Sales by category */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Hourly Sales</div>
                <div className="at-eyebrow">Revenue by hour · today</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              color="--at-accent"
              series={HOURLY_SERIES}
              categories={HOURLY_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Sales by Category</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={CATEGORY_SERIES}
              labels={CATEGORY_LABELS}
              centerLabel="Sales"
              centerValue="2,840"
            />
          </div>
        </div>

        {/* Quick sale + Payment methods */}
        <div className="at-row">
          <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Quick Sale</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="at-eyebrow">Amount</span>
                <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-2xl)' }}>$0.00</span>
              </div>
              <div className="at-row" style={{ gap: 'var(--at-space-2)' }}>
                {KEYPAD.map((k) => {
                  const isOp = k === '÷' || k === '×' || k === '−' || k === '+';
                  return (
                    <div key={k} className="at-col-3">
                      <button className={`at-btn at-press at-btn--block ${isOp ? 'at-btn--dark' : 'at-btn--outline'}`}>{k}</button>
                    </div>
                  );
                })}
              </div>
              <button className="at-btn at-btn--primary at-press at-btn--block">Charge</button>
            </div>
          </div>
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Payment Methods</div>
              <div className="at-eyebrow">Today</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {PAYMENTS.map((p) => (
                <div key={p.method}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{p.method}</span>
                    <span className="at-text-muted">{p.meta}</span>
                  </div>
                  <div className={`at-progress ${p.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: p.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', borderBlockStart: '2px solid var(--at-ink)', paddingBlockStart: 'var(--at-space-3)', marginBlockStart: 'var(--at-space-4)' }}>
              <span className="at-text-strong">Register status</span>
              <span className="at-badge at-badge--success"><span className="at-dot"></span> Open</span>
            </div>
          </div>
        </div>

        {/* Recent sales + Stock alerts */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Sales</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Receipt</th>
                    <th>Items</th>
                    <th>Payment</th>
                    <th className="at-num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {SALES.map((s) => (
                    <tr key={s.receipt}>
                      <td className="at-text-strong">{s.receipt}</td>
                      <td>{s.items}</td>
                      <td>{s.payment}</td>
                      <td className="at-num">{s.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Stock Alerts</div>
            </div>
            <div className="at-list">
              {STOCK.map((s) => (
                <div key={s.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{s.name}</span>
                    <span className={`at-badge at-badge--${s.kind}`}>{s.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Register Status */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Register Status</div>
                <div className="at-eyebrow">4 lanes · 3 open · 1 cash due</div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-5)' }}>
                <div>
                  <div className="at-eyebrow">Active revenue</div>
                  <div className="at-mono at-text-strong" style={{ fontSize: 'var(--at-text-xl)' }}>$8,570</div>
                </div>
                <div>
                  <div className="at-eyebrow">Sales</div>
                  <div className="at-mono at-text-strong" style={{ fontSize: 'var(--at-text-xl)' }}>375</div>
                </div>
              </div>
            </div>
            <div className="at-row">
              {LANES.map((l) => (
                <div key={l.num} className="at-col-3">
                  <div className="at-card at-card--flat" style={{ padding: 'var(--at-space-4)' }}>
                    <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                      <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                        <div className="at-avatar at-avatar--sm" style={{ background: l.avatarBg, color: l.avatarColor, fontWeight: 700 }}>{l.num}</div>
                        <span className={`at-badge at-badge--${l.kind}`}><span className="at-dot"></span> {l.status}</span>
                      </div>
                      <div>
                        <div className="at-text-strong">{l.operator}</div>
                        <div className="at-eyebrow">{l.meta}</div>
                      </div>
                      <div>
                        <div className="at-cluster" style={{ alignItems: 'baseline', justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}>
                          <span className={`at-mono ${l.revenueMuted ? 'at-text-muted' : 'at-text-strong'}`} style={{ fontSize: 'var(--at-text-xl)' }}>{l.revenue}</span>
                          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{l.pct}</span>
                        </div>
                        {l.footer ? (
                          <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{l.footer}</div>
                        ) : (
                          <div className={`at-progress ${l.variant}`}>
                            <div className="at-progress__bar" style={{ width: l.width }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
