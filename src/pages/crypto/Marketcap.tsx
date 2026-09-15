/*
 * Hactex React — Crypto marketcap.
 * Built with the shared component classes, inline
 * token styles, demo figures, and inline SVG sparklines (preserved verbatim —
 * the source uses raw <svg> sparklines, not data-at-chart).
 */
import { useState, useMemo } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'Total Market Cap', value: '$2.41T', delta: '▲ 1.9%', dir: 'up' },
  { label: '24h Volume', value: '$94.6B', delta: '▼ 2.4%', dir: 'down' },
  { label: 'BTC Dominance', value: '52.4%', delta: '▲ 0.3%', dir: 'up' },
];

// sparkline path variants used across the table
const SPARK = {
  up: 'M2 30 16 26 30 28 44 20 58 22 72 14 86 12 108 4',
  flat: 'M2 18 16 12 30 22 44 14 58 24 72 16 86 20 108 12',
  down: 'M2 6 16 9 30 8 44 14 58 12 72 19 86 22 108 30',
};

type Trend = 'up' | 'flat' | 'down';

function Sparkline({ trend, color }: { trend: Trend; color: string }): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 110 34"
      width={110}
      height={34}
      fill="none"
      preserveAspectRatio="none"
      style={{ color }}
    >
      <path
        d={SPARK[trend]}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COINS = [
  { rank: '1', glyph: '₿', chartVar: '--at-chart-1', name: 'Bitcoin', sym: 'BTC', price: '$67,840.20', h1: '+0.4%', h1c: 'var(--at-success-text)', h24: '+2.1%', h24c: 'var(--at-success-text)', d7: '+6.8%', d7c: 'var(--at-success-text)', cap: '$1.34T', vol: '$28.4B', trend: 'up' as Trend, sc: 'var(--at-success-text)' },
  { rank: '2', glyph: 'Ξ', chartVar: '--at-chart-2', name: 'Ethereum', sym: 'ETH', price: '$3,512.00', h1: '+0.2%', h1c: 'var(--at-success-text)', h24: '+3.7%', h24c: 'var(--at-success-text)', d7: '+9.2%', d7c: 'var(--at-success-text)', cap: '$422.1B', vol: '$14.8B', trend: 'up' as Trend, sc: 'var(--at-success-text)' },
  { rank: '3', glyph: '$', chartVar: '--at-chart-4', name: 'Tether', sym: 'USDT', price: '$1.0001', h1: '0.0%', h1c: 'var(--at-text-muted)', h24: '0.0%', h24c: 'var(--at-text-muted)', d7: '+0.1%', d7c: 'var(--at-success-text)', cap: '$112.4B', vol: '$41.2B', trend: 'flat' as Trend, sc: 'var(--at-text-muted)' },
  { rank: '4', glyph: '◎', chartVar: '--at-chart-3', name: 'Solana', sym: 'SOL', price: '$184.20', h1: '+1.1%', h1c: 'var(--at-success-text)', h24: '+18.2%', h24c: 'var(--at-success-text)', d7: '+24.6%', d7c: 'var(--at-success-text)', cap: '$84.9B', vol: '$6.2B', trend: 'up' as Trend, sc: 'var(--at-success-text)' },
  { rank: '5', glyph: 'B', chartVar: '--at-chart-1', name: 'BNB', sym: 'BNB', price: '$592.40', h1: '−0.3%', h1c: 'var(--at-danger-text)', h24: '+1.4%', h24c: 'var(--at-success-text)', d7: '+3.1%', d7c: 'var(--at-success-text)', cap: '$87.6B', vol: '$1.9B', trend: 'flat' as Trend, sc: 'var(--at-text-muted)' },
  { rank: '6', glyph: 'X', chartVar: '--at-chart-4', name: 'XRP', sym: 'XRP', price: '$0.5240', h1: '+0.6%', h1c: 'var(--at-success-text)', h24: '−1.8%', h24c: 'var(--at-danger-text)', d7: '−4.2%', d7c: 'var(--at-danger-text)', cap: '$29.1B', vol: '$1.1B', trend: 'down' as Trend, sc: 'var(--at-danger-text)' },
  { rank: '7', glyph: 'A', chartVar: '--at-chart-4', name: 'Cardano', sym: 'ADA', price: '$0.4520', h1: '+0.3%', h1c: 'var(--at-success-text)', h24: '+1.3%', h24c: 'var(--at-success-text)', d7: '+5.7%', d7c: 'var(--at-success-text)', cap: '$16.0B', vol: '$0.42B', trend: 'up' as Trend, sc: 'var(--at-success-text)' },
  { rank: '8', glyph: '▲', chartVar: '--at-chart-5', name: 'Avalanche', sym: 'AVAX', price: '$38.10', h1: '−0.8%', h1c: 'var(--at-danger-text)', h24: '−2.4%', h24c: 'var(--at-danger-text)', d7: '−6.1%', d7c: 'var(--at-danger-text)', cap: '$15.2B', vol: '$0.58B', trend: 'down' as Trend, sc: 'var(--at-danger-text)' },
  { rank: '9', glyph: 'Ð', chartVar: '--at-chart-1', name: 'Dogecoin', sym: 'DOGE', price: '$0.1620', h1: '+0.9%', h1c: 'var(--at-success-text)', h24: '+4.6%', h24c: 'var(--at-success-text)', d7: '+11.3%', d7c: 'var(--at-success-text)', cap: '$23.4B', vol: '$1.4B', trend: 'up' as Trend, sc: 'var(--at-success-text)' },
  { rank: '10', glyph: '●', chartVar: '--at-danger', name: 'Polkadot', sym: 'DOT', price: '$6.940', h1: '−0.2%', h1c: 'var(--at-danger-text)', h24: '−0.8%', h24c: 'var(--at-danger-text)', d7: '+2.4%', d7c: 'var(--at-success-text)', cap: '$9.8B', vol: '$0.31B', trend: 'flat' as Trend, sc: 'var(--at-text-muted)' },
];

const TABS = ['All', 'Gainers', 'Watchlist'];

export default function Marketcap(): React.JSX.Element {
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COINS;
    return COINS.filter((c) => c.name.toLowerCase().includes(needle) || c.sym.toLowerCase().includes(needle));
  }, [q]);

  return (
    <>
      <PageHead
        title="Marketcap"
        subtitle="Live prices across 10,482 coins — total cap $2.41T."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
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
          <div className="at-col-3 at-card at-kpi">
            <div className="at-kpi__label">Fear &amp; Greed</div>
            <div className="at-kpi__value">
              68 <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Greed</span>
            </div>
            <div className="at-kpi__delta at-kpi__delta--up">▲ 7 pts</div>
          </div>
        </div>

        {/* Cryptocurrency Prices table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div
            className="at-chart__head"
            style={{
              padding: 'var(--at-space-5)',
              paddingBlockEnd: 'var(--at-space-3)',
              flexWrap: 'wrap',
              gap: 'var(--at-space-3)',
            }}
          >
            <div>
              <div className="at-chart__title">Cryptocurrency Prices</div>
              <div className="at-eyebrow at-num">14 of 10,482 coins</div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
              <div className="at-search" style={{ boxShadow: 'none' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 14, height: 14 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search coin…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', minWidth: 120 }}
                />
              </div>
              <div className="at-segment">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    className={`at-segment__btn${tab === i ? ' is-active' : ''}`}
                    onClick={() => setTab(i)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th className="at-num">#</th>
                  <th>Name</th>
                  <th className="at-num">Price</th>
                  <th className="at-num">1h</th>
                  <th className="at-num">24h</th>
                  <th className="at-num">7d</th>
                  <th className="at-num">Market Cap</th>
                  <th className="at-num">Volume (24h)</th>
                  <th>Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.rank}>
                    <td className="at-num at-text-muted">{c.rank}</td>
                    <td>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--sm"
                          style={{
                            background: `color-mix(in oklab, var(${c.chartVar}) 18%, transparent)`,
                            color: `var(${c.chartVar}-text)`,
                          }}
                        >
                          {c.glyph}
                        </div>
                        <span className="at-text-strong">
                          {c.name} <span className="at-text-muted" style={{ fontWeight: 400 }}>{c.sym}</span>
                        </span>
                      </div>
                    </td>
                    <td className="at-num">{c.price}</td>
                    <td className="at-num" style={{ color: c.h1c }}>{c.h1}</td>
                    <td className="at-num" style={{ color: c.h24c }}>{c.h24}</td>
                    <td className="at-num" style={{ color: c.d7c }}>{c.d7}</td>
                    <td className="at-num">{c.cap}</td>
                    <td className="at-num at-text-muted">{c.vol}</td>
                    <td>
                      <Sparkline trend={c.trend} color={c.sc} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="at-cluster"
            style={{
              justifyContent: 'space-between',
              padding: 'var(--at-space-4) var(--at-space-5)',
              flexWrap: 'wrap',
              gap: 'var(--at-space-3)',
            }}
          >
            <span className="at-text-muted at-num" style={{ fontSize: 'var(--at-text-xs)' }}>
              Showing 10 of 10,482 coins
            </span>
            <div className="at-pagination">
              <button className="at-pagination__btn is-active">1</button>
              <button className="at-pagination__btn">2</button>
              <button className="at-pagination__btn">3</button>
              <button className="at-pagination__btn">87</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
