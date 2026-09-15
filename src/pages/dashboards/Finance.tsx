/*
 * Hactex React — Finance & Banking dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Balance', value: '$312,540', delta: '▲ 3.1%', dir: 'up' },
  { label: 'Monthly Income', value: '$48,200', delta: '▲ 4.0%', dir: 'up' },
  { label: 'Monthly Expenses', value: '$31,760', delta: '▲ 6.7% (unfavourable)', dir: 'down' },
  { label: 'Net Savings Rate', value: '34%', delta: '▲ 1.5%', dir: 'up' },
];

const CASH_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const CASH_SERIES = [
  { name: 'Income', data: [42, 44, 46, 45, 47, 48, 47, 49, 48, 47, 48, 48] },
  { name: 'Expenses', data: [29, 30, 31, 30, 32, 31, 33, 32, 32, 31, 32, 32] },
];

const SPEND_SERIES = [44, 18, 15, 13, 10];
const SPEND_LABELS = ['Payroll', 'Software', 'Marketing', 'Office', 'Other'];

const ACCOUNTS = [
  { name: 'Checking ·•••7045', value: '$48,210' },
  { name: 'Savings ·•••3318', value: '$214,330' },
  { name: 'Credit card ·•••1182', value: '−$12,480' },
  { name: 'Investments ·•••9001', value: '$62,480' },
];

const BUDGETS = [
  { label: 'Payroll', meta: '$14K / $16K', width: '87%', variant: '' },
  { label: 'Software', meta: '$5.7K / $7K', width: '81%', variant: 'at-progress--info' },
  { label: 'Marketing', meta: '$4.8K / $5K', width: '96%', variant: 'at-progress--warning' },
  { label: 'Office', meta: '$4.1K / $6K', width: '68%', variant: 'at-progress--success' },
];

const TXNS = [
  { merchant: 'Camila Rossi · Stripe', cat: 'Order payment', date: 'Jun 12', amount: '+$312.00' },
  { merchant: 'Linear', cat: 'Software', date: 'Jun 11', amount: '−$84.00' },
  { merchant: 'Henry Whitlock · Stripe', cat: 'Order payment', date: 'Jun 12', amount: '+$129.00' },
  { merchant: 'Payroll — June · Gusto', cat: 'Payroll', date: 'Jun 10', amount: '−$18,400.00' },
  { merchant: 'Pulse Ads · Google Ads', cat: 'Marketing', date: 'Jun 12', amount: '−$640.00' },
];

const BILLS = [
  { name: 'AWS', note: '$2,140 · 2d', kind: 'danger' },
  { name: 'Rent', note: '$8,500 · 4d', kind: 'warning' },
  { name: 'Slack', note: '$72 · 6d', kind: 'neutral' },
  { name: 'Notion', note: '$48 · 9d', kind: 'neutral' },
];

export const SLUG = 'dashboards/finance';

export default function Finance(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Finance & Banking"
        subtitle="Cashflow, budgets & account balances — this month."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This month</button>
            <button className="at-btn at-btn--primary at-press">+ Transaction</button>
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

        {/* Income vs Expenses + Spending by Category */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Income vs. Expenses</div>
                <div className="at-eyebrow">Monthly cashflow</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={CASH_SERIES}
              categories={CASH_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Spending by Category</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={SPEND_SERIES}
              labels={SPEND_LABELS}
              centerLabel="Spend"
              centerValue="$48.2K"
            />
          </div>
        </div>

        {/* Accounts + Budget utilization */}
        <div className="at-row">
          <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Accounts</div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-3)' }}>
              {ACCOUNTS.map((a) => (
                <div key={a.name} className="at-col-6">
                  <div className="at-card at-card--subtle" style={{ padding: 'var(--at-space-4)' }}>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{a.name}</div>
                    <div className="at-kpi__value" style={{ fontSize: 'var(--at-text-xl)', marginBlockStart: 'var(--at-space-2)' }}>{a.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Budget Utilization</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {BUDGETS.map((b) => (
                <div key={b.label}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{b.label}</span>
                    <span className="at-text-muted">{b.meta}</span>
                  </div>
                  <div className={`at-progress ${b.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: b.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent transactions table + Upcoming bills */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Transactions</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Merchant</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th className="at-num">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {TXNS.map((t) => (
                    <tr key={t.merchant}>
                      <td className="at-text-strong">{t.merchant}</td>
                      <td>{t.cat}</td>
                      <td>{t.date}</td>
                      <td className="at-num">{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Upcoming Bills</div>
            </div>
            <div className="at-list">
              {BILLS.map((b) => (
                <div key={b.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{b.name}</span>
                    <span className={`at-badge at-badge--${b.kind}`}>{b.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Balance card visual */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Total Balance</div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">USD</button>
                <button className="at-segment__btn">GBP</button>
                <button className="at-segment__btn">EUR</button>
              </div>
            </div>
            {/* Ink plate — see components.css §4b. Replaced a 135°
                accent→olive gradient: color in this language is flat,
                and the two tokens met in a muddy middle. */}
            <div className="at-balance">
              <div className="at-balance__top">
                <span className="at-balance__brand">Hactex · Operating</span>
                <svg
                  className="at-balance__mark"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 10h18" />
                  <path d="M7 15h.01" />
                  <path d="M11 15h2" />
                  <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2" />
                </svg>
              </div>
              <span className="at-balance__chip" aria-hidden="true"></span>
              <div className="at-balance__body">
                <div className="at-balance__label">Available balance</div>
                <div className="at-balance__value">$312,540.00</div>
                <div className="at-balance__number">
                  4921&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;7045
                </div>
              </div>
            </div>
            <div className="at-grid at-grid--2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--at-space-3)', marginTop: 'var(--at-space-4)' }}>
              <button className="at-btn at-btn--primary at-btn--block at-press">Transfer</button>
              <button className="at-btn at-btn--outline at-btn--block at-press">Deposit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
