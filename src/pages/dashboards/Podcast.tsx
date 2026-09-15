/*
 * Hactex React — Podcast & Media dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Plays', value: '1.82M', delta: '▲ 9.5%', dir: 'up' },
  { label: 'Subscribers', value: '64,200', delta: '▲ 4.2%', dir: 'up' },
  { label: 'Avg. Listen-Through', value: '71%', delta: '▲ 1.8%', dir: 'up' },
  { label: 'Revenue (30D)', value: '$12,400', delta: '▲ 7.0%', dir: 'up' },
];

const PLAYS_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
const PLAYS_SERIES = [
  { name: 'Plays', data: [142, 168, 154, 182, 196, 212, 228] },
  { name: 'New subs', data: [820, 940, 1180, 1240, 1320, 1480, 1620] },
];

const PLATFORM_SERIES = [42, 28, 18, 12];
const PLATFORM_LABELS = ['Spotify', 'Apple Podcasts', 'YouTube', 'Web'];

const RETENTION_CATEGORIES = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45'];
const RETENTION_SERIES = [{ name: 'Retention', data: [100, 96, 92, 88, 84, 80, 76, 72, 69, 66] }];

const TOP_EPISODES = [
  { episode: '42 — Designing for Trust', plays: '182,400', completion: '74%', rating: '4.9', ratingKind: 'success' },
  { episode: '41 — The Bold Press Story', plays: '168,200', completion: '71%', rating: '4.8', ratingKind: 'success' },
  { episode: '40 — Shipping Fast, Shipping Right', plays: '154,800', completion: '69%', rating: '4.6', ratingKind: 'secondary' },
  { episode: '39 — From Brief to Brand', plays: '142,100', completion: '66%', rating: '4.5', ratingKind: 'secondary' },
];

const REVIEWS = [
  { text: '★ 5.0 — Inspiring', author: 'Elena M.' },
  { text: '★ 4.5 — Great insights', author: 'Marcus R.' },
  { text: '★ 5.0 — Best design pod', author: 'Chiara F.' },
  { text: '★ 4.0 — Solid episode', author: 'Amara O.' },
];

const UPCOMING = [
  { date: 'Jun 30', accent: true, title: 'EP 149 — Hiring Slow', meta: 'Editing · with R. Okafor' },
  { date: 'Jul 7', accent: false, title: <>EP 150 — Milestone Q&amp;A</>, meta: 'Recording · live audience' },
  { date: 'Jul 14', accent: false, title: 'EP 151 — AI in Creative Work', meta: 'Drafting · guest TBD' },
  { date: 'Jul 21', accent: false, title: 'EP 152 — Bootstrapped Stories', meta: 'Scheduled · with M. Aoki' },
];

export default function Podcast(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Podcast &amp; Media"
        subtitle={<>Plays, subscribers &amp; revenue — last 30 days.</>}
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">30 days</button>
            <button className="at-btn at-btn--primary at-press">+ Episode</button>
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

        {/* Plays & subscribers (mixed) + By platform donut */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Plays &amp; Subscribers</div>
                <div className="at-eyebrow">Weekly plays area + new subscriber columns</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={PLAYS_SERIES}
              categories={PLAYS_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">By Platform</div></div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={PLATFORM_SERIES}
              labels={PLATFORM_LABELS}
              centerLabel="Plays"
              centerValue="4,820"
            />
          </div>
        </div>

        {/* Now playing + Listener retention */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Now Playing</div>
              <span className="at-badge at-badge--success"><span className="at-dot" /> Live</span>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-avatar at-avatar--xl">E</div>
              <div>
                <div className="at-text-strong" style={{ fontSize: 'var(--at-text-md)' }}>Episode 42 — Designing for Trust</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>The Hactex Show · 48 min</div>
              </div>
            </div>
            <div className="at-progress" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
              <div className="at-progress__bar" style={{ width: '42%' }} />
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>20:10</span>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>27:50 left</span>
            </div>
            <div className="at-cluster" style={{ justifyContent: 'center', gap: 'var(--at-space-3)', marginBlockStart: 'var(--at-space-4)' }}>
              <button className="at-icon-btn">⏮</button>
              <button className="at-icon-btn" style={{ width: 44, height: 44 }}>⏯</button>
              <button className="at-icon-btn">⏭</button>
            </div>
          </div>
          <div className="at-col-7 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Listener Retention</div>
                <div className="at-eyebrow">% still listening at each minute</div>
              </div>
            </div>
            <ApexChart
              type="area"
              height={260}
              color="--at-tertiary"
              series={RETENTION_SERIES}
              categories={RETENTION_CATEGORIES}
            />
          </div>
        </div>

        {/* Top episodes table + Recent reviews */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Top Episodes</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Episode</th>
                    <th className="at-num">Plays</th>
                    <th className="at-num">Completion</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_EPISODES.map((e) => (
                    <tr key={e.episode}>
                      <td className="at-text-strong">{e.episode}</td>
                      <td className="at-num">{e.plays}</td>
                      <td className="at-num">{e.completion}</td>
                      <td><span className={`at-badge at-badge--${e.ratingKind}`}>{e.rating}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Recent Reviews</div>
            </div>
            <div className="at-list">
              {REVIEWS.map((r) => (
                <div key={r.author} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{r.text}</span>
                    <span className="at-text-muted">{r.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Releases (schedule) */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Upcoming Releases</div>
                <div className="at-eyebrow">Production schedule</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Calendar</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {UPCOMING.map((u, i) => (
                <div key={i} className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-sm)', color: u.accent ? 'var(--at-accent-text)' : 'var(--at-text-muted)', minWidth: 54, fontWeight: 600 }}>{u.date}</span>
                  <div style={{ flex: '1 1 auto', minWidth: 0, borderLeft: '2px solid var(--at-border)', paddingLeft: 'var(--at-space-3)' }}>
                    <div className="at-text-strong">{u.title}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{u.meta}</div>
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
