/*
 * Hactex React — Tables (basic) UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup, no component state.
 */
import { PageHead } from '../../components/shell/PageHead';

const CARDS = [
  { label: 'Card One', value: '$48.2k', desc: 'A sample card showing the Bold Press treatment — ink border, hard shadow, press interaction.' },
  { label: 'Card Two', value: '1,847', desc: 'Every clickable surface depresses on press.' },
  { label: 'Card Three', value: '3.8%', desc: 'Sharp geometry, mono numerics.' },
];

export default function Tables(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Tables (basic)"
        subtitle="The Tables (basic) surface."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {CARDS.map((c) => (
            <div key={c.label} className="at-col-4 at-card at-press" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-kpi__label">{c.label}</div>
              <div className="at-kpi__value">{c.value}</div>
              <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-2)' }}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <h3 className="at-chart__title" style={{ marginBlockEnd: 'var(--at-space-3)' }}>Tables (basic)</h3>
          <p className="at-text-muted">This page showcases the Tables (basic) surface. The Bold Press design language — thick ink borders, hard offset shadows, raw color blocks, and a mechanical press interaction — is applied consistently across every component.</p>
          <div className="at-divider" />
          <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
            <button className="at-btn at-btn--primary at-press">Primary</button>
            <button className="at-btn at-btn--secondary at-press">Secondary</button>
            <button className="at-btn at-btn--dark at-press">Dark</button>
            <button className="at-btn at-btn--outline at-press">Outline</button>
            <button className="at-btn at-btn--ghost">Ghost</button>
          </div>
          <div className="at-divider" />
          <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
            <span className="at-badge at-badge--accent">Accent</span>
            <span className="at-badge at-badge--secondary">Secondary</span>
            <span className="at-badge at-badge--tertiary">Tertiary</span>
            <span className="at-badge at-badge--lime">Lime</span>
            <span className="at-badge at-badge--success">Success</span>
            <span className="at-badge at-badge--warning">Warning</span>
            <span className="at-badge at-badge--danger">Danger</span>
            <span className="at-badge at-badge--info">Info</span>
          </div>
        </div>
      </div>
    </>
  );
}
