/*
 * Hactex React — Social Media dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Followers', value: '482K', delta: '▲ 3.8%', dir: 'up' },
  { label: 'Engagement Rate', value: '4.6%', delta: '▲ 0.5%', dir: 'up' },
  { label: 'Impressions (30D)', value: '2.4M', delta: '▲ 12.0%', dir: 'up' },
  { label: 'New Followers (30D)', value: '18.2K', delta: '▲ 6.0%', dir: 'up' },
];

const GROWTH_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
const GROWTH_SERIES = [{ name: 'Followers', data: [412, 424, 438, 441, 452, 461, 468, 472, 474, 478, 481, 482] }];

const ENGAGEMENT_SERIES = [48, 22, 18, 12];
const ENGAGEMENT_LABELS = ['Likes', 'Comments', 'Shares', 'Saves'];

const SENTIMENT_SERIES = [72, 28];
const SENTIMENT_LABELS = ['Positive', 'Other'];

const PLATFORMS = [
  { label: 'Instagram', value: '214K', delta: '▲ 4.2%', tone: 'success' },
  { label: 'TikTok', value: '128K', delta: '▲ 8.1%', tone: 'success' },
  { label: 'YouTube', value: '96K', delta: '▲ 2.4%', tone: 'success' },
  { label: 'X', value: '44K', delta: '▼ 1.0%', tone: 'danger' },
];

const TOP_POSTS = [
  { caption: 'Summer launch teaser', platform: 'Instagram', reach: '412K', engagement: '8.4%' },
  { caption: 'Behind the scenes reel', platform: 'TikTok', reach: '628K', engagement: '11.2%' },
  { caption: 'Customer story — Ava', platform: 'YouTube', reach: '184K', engagement: '5.1%' },
  { caption: 'Feature drop thread', platform: 'X', reach: '96K', engagement: '3.8%' },
];

const SCHEDULED = [
  { title: 'Launch reveal', date: 'Aug 2', kind: 'accent' },
  { title: 'Team spotlight', date: 'Aug 5', kind: 'secondary' },
  { title: 'Tutorial reel', date: 'Aug 8', kind: 'tertiary' },
  { title: 'AMA thread', date: 'Aug 12', kind: 'neutral' },
];

const MENTIONS = [
  { handle: '@maria.codes', text: '"Obsessed with the new packaging 😍"', meta: '6m ago · Instagram' },
  { handle: '@devon_b', text: 'asked about restock dates', meta: '22m ago · X' },
  { handle: '@lena.design', text: 'shared your launch post', meta: '1h ago · LinkedIn' },
  { handle: '@tom.hr', text: 'tagged you in a hiring thread', meta: '3h ago · X' },
];

export default function Social(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Social Media"
        subtitle={<>Audience, engagement &amp; content — last 30 days.</>}
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">30 days</button>
            <button className="at-btn at-btn--primary at-press">+ Post</button>
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

        {/* Audience growth (area) + Engagement types donut */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Audience Growth</div>
                <div className="at-eyebrow">Followers · 12 weeks</div>
              </div>
            </div>
            <ApexChart
              type="area"
              height={300}
              color="--at-accent"
              series={GROWTH_SERIES}
              categories={GROWTH_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Engagement Types</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={ENGAGEMENT_SERIES}
              labels={ENGAGEMENT_LABELS}
              centerLabel="Actions"
              centerValue="4,820"
            />
          </div>
        </div>

        {/* By platform + Sentiment */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">By Platform</div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-3)' }}>
              {PLATFORMS.map((p) => (
                <div key={p.label} className="at-col-3">
                  <div className="at-card at-card--subtle" style={{ padding: 'var(--at-space-4)' }}>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{p.label}</div>
                    <div className="at-kpi__value" style={{ fontSize: 'var(--at-text-xl)', marginBlockStart: 'var(--at-space-2)' }}>{p.value}</div>
                    <div className={`at-text-${p.tone}`} style={{ fontSize: 'var(--at-text-xs)' }}>{p.delta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Audience Sentiment</div>
            </div>
            <ApexChart
              type="donut"
              height={200}
              series={SENTIMENT_SERIES}
              labels={SENTIMENT_LABELS}
              centerLabel="Positive"
              centerValue="72%"
            />
            <div className="at-cluster" style={{ justifyContent: 'center', paddingBlockEnd: 'var(--at-space-4)' }}>
              <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-xl)' }}>72%</span>
              <span className="at-badge at-badge--success">Positive</span>
            </div>
          </div>
        </div>

        {/* Top posts table + Scheduled posts */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Top Posts</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Caption</th>
                    <th>Platform</th>
                    <th className="at-num">Reach</th>
                    <th className="at-num">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_POSTS.map((p) => (
                    <tr key={p.caption}>
                      <td className="at-text-strong">{p.caption}</td>
                      <td>{p.platform}</td>
                      <td className="at-num">{p.reach}</td>
                      <td className="at-num">{p.engagement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Scheduled Posts</div>
            </div>
            <div className="at-list">
              {SCHEDULED.map((s) => (
                <div key={s.title} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{s.title}</span>
                    <span className={`at-badge at-badge--${s.kind}`}>{s.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Mentions (timeline) */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Recent Mentions</div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Inbox</button>
            </div>
            <div className="at-timeline">
              {MENTIONS.map((m) => (
                <div key={m.handle} className="at-timeline__item">
                  <span className="at-timeline__dot" />
                  <div>
                    <div className="at-text-strong"><b>{m.handle}</b> {m.text}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{m.meta}</div>
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
