/*
 * Hactex React — NFT Marketplace dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Volume', value: '1,284 ETH', delta: '▲ 14.0%', dir: 'up' },
  { label: 'Floor Price', value: '2.4 ETH', delta: '▲ 3.2%', dir: 'up' },
  { label: 'Items Sold (24h)', value: '318', delta: '▲ 6.1%', dir: 'up' },
  { label: 'Owners', value: '5,210', delta: '▲ 1.0%', dir: 'up' },
];

const TREND_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
const TREND_SERIES = [
  { name: 'Volume (ETH)', data: [88, 104, 92, 128, 142, 118, 164] },
  { name: 'Floor (ETH)', data: [2.1, 2.2, 2.1, 2.3, 2.4, 2.3, 2.4] },
];

const CATEGORY_SERIES = [42, 26, 20, 12];
const CATEGORY_LABELS = ['Art', 'Collectibles', 'Gaming', 'Music'];

const COLLECTIONS = [
  { letter: 'A', name: 'Aurora Blocks', bg: undefined, floor: '2.4 ETH', volume: '412', owners: '1,840' },
  { letter: 'P', name: 'Pixel Masons', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', floor: '1.8 ETH', volume: '318', owners: '2,120' },
  { letter: 'C', name: 'Cosmic Shards', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', floor: '0.9 ETH', volume: '284', owners: '980' },
  { letter: 'N', name: 'Nebula Visions', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', floor: '3.2 ETH', volume: '268', owners: '540' },
];

const CREATORS = [
  { name: '0xblueprint', vol: '412 ETH', kind: 'accent' },
  { name: 'mason.eth', vol: '318 ETH', kind: 'secondary' },
  { name: 'shardlab', vol: '284 ETH', kind: 'tertiary' },
  { name: 'nebula', vol: '268 ETH', kind: 'lime' },
];

const AUCTIONS = [
  { name: 'Aurora Blocks #402', note: '2m left', kind: 'danger' },
  { name: 'Cosmic Shards #88', note: '18m left', kind: 'warning' },
  { name: 'Nebula Visions #14', note: '1h left', kind: 'accent' },
  { name: 'Pixel Masons #211', note: '3h left', kind: 'secondary' },
];

const ACTIVITY = [
  { title: 'Aurora Blocks #402 sold for 3.1 ETH', meta: '2m ago' },
  { title: 'New listing — Cosmic Shards #88', meta: '14m ago' },
  { title: 'Floor moved up to 2.4 ETH', meta: '38m ago' },
  { title: 'Offer on Nebula Visions #14', meta: '1h ago' },
];

export const SLUG = 'dashboards/nft';

export default function Nft(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="NFT Marketplace"
        subtitle="Volume, floor & creators — last 24h."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">24h</button>
            <button className="at-btn at-btn--primary at-press">Mint</button>
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

        {/* Volume & floor trend + Sales by category */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Volume &amp; Floor Trend</div>
                <div className="at-eyebrow">Daily volume columns + floor price line</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={TREND_SERIES}
              categories={TREND_CATEGORIES}
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
              centerValue="4,820"
            />
          </div>
        </div>

        {/* Trending collections + Top creators */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Trending Collections</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">Explore →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th className="at-num">Floor</th>
                    <th className="at-num">Volume (7D)</th>
                    <th className="at-num">Owners</th>
                  </tr>
                </thead>
                <tbody>
                  {COLLECTIONS.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <div className="at-cluster">
                          <div className="at-avatar at-avatar--sm" style={c.bg ? { background: c.bg, color: c.color } : undefined}>{c.letter}</div>
                          <span className="at-text-strong">{c.name}</span>
                        </div>
                      </td>
                      <td className="at-num">{c.floor}</td>
                      <td className="at-num">{c.volume}</td>
                      <td className="at-num">{c.owners}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Creators</div>
            </div>
            <div className="at-list">
              {CREATORS.map((c) => (
                <div key={c.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{c.name}</span>
                    <span className={`at-badge at-badge--${c.kind}`}>{c.vol}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live auctions + Recent activity */}
        <div className="at-row">
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Live Auctions</div>
              <span className="at-badge at-badge--success"><span className="at-dot"></span> 12 live</span>
            </div>
            <div className="at-list">
              {AUCTIONS.map((a) => (
                <div key={a.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{a.name}</span>
                    <span className={`at-badge at-badge--${a.kind}`}>{a.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Recent Activity</div>
            </div>
            <div className="at-timeline">
              {ACTIVITY.map((a) => (
                <div key={a.title} className="at-timeline__item">
                  <span className="at-timeline__dot"></span>
                  <div className="at-text-strong">{a.title}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{a.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
