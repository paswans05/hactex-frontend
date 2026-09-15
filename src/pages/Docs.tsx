/*
 * Hactex React — Documentation surface.
 * Built with the shared component classes, inline token styles.
 * This is a top-level page (slug "docs"), so shell imports resolve one level up.
 */
import { PageHead } from '../components/shell/PageHead';

const CARDS = [
  { label: 'Card One', value: '$48.2k', desc: 'A sample card showing the Bold Press treatment — ink border, hard shadow, press interaction.' },
  { label: 'Card Two', value: '1,847', desc: 'Every clickable surface depresses on press.' },
  { label: 'Card Three', value: '3.8%', desc: 'Sharp geometry, mono numerics.' },
];

const BADGES = [
  'accent',
  'secondary',
  'tertiary',
  'lime',
  'success',
  'warning',
  'danger',
  'info',
] as const;

export default function Docs(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Documentation"
        subtitle="The Documentation surface."
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
              <div
                className="at-text-muted"
                style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-2)' }}
              >
                {c.desc}
              </div>
            </div>
          ))}
        </div>
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <h3 className="at-chart__title" style={{ marginBlockEnd: 'var(--at-space-3)' }}>
            Documentation
          </h3>
          <p className="at-text-muted">
            This page showcases the Documentation surface. The Bold Press design language — thick ink
            borders, hard offset shadows, raw color blocks, and a mechanical press interaction — is
            applied consistently across every component.
          </p>
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
            {BADGES.map((b) => (
              <span key={b} className={`at-badge at-badge--${b}`}>
                {b[0].toUpperCase() + b.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
