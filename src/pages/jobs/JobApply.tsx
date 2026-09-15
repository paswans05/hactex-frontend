/*
 * Hactex React — Job Apply (jobs/job-apply).
 * A 2-column form + summary layout.
 */
import { PageHead } from '../../components/shell/PageHead';

export default function JobApply(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Job Apply"
        subtitle="Fill in the form below."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />
      <div className="at-row">
        <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <h3 className="at-chart__title" style={{ marginBlockEnd: 'var(--at-space-4)' }}>Details</h3>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div><label className="at-form-label">Name</label><input className="at-input" type="text" placeholder="Enter name…" /></div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6"><label className="at-form-label">Category</label><select className="at-select"><option>Option A</option><option>Option B</option></select></div>
                <div className="at-col-6"><label className="at-form-label">Status</label><select className="at-select"><option>Active</option><option>Draft</option></select></div>
              </div>
              <div><label className="at-form-label">Description</label><textarea className="at-textarea" placeholder="Describe…"></textarea></div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6"><label className="at-form-label">Amount</label><input className="at-input at-mono" type="number" placeholder="0.00" /></div>
                <div className="at-col-6"><label className="at-form-label">Quantity</label><input className="at-input at-mono" type="number" placeholder="0" /></div>
              </div>
              <div className="at-cluster"><label className="at-check"><input type="checkbox" defaultChecked /> Enabled</label><label className="at-check"><input type="checkbox" /> Featured</label></div>
            </div>
          </div>
        </div>
        <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <h3 className="at-chart__title" style={{ marginBlockEnd: 'var(--at-space-4)' }}>Summary</h3>
            <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}><span className="at-text-muted">Status</span><span className="at-badge at-badge--success">Active</span></div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}><span className="at-text-muted">Created</span><span>Just now</span></div>
            </div>
            <button className="at-btn at-btn--primary at-btn--block at-press" style={{ marginBlockStart: 'var(--at-space-4)' }}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
