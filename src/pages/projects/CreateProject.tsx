/*
 * Hactex React — Create project (multi-step form).
 * Built with the shared component classes,
 * inline token styles. Form fields are controlled via useState; the colour
 * picker and team checkboxes keep their demo state.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const COLORS = [
  { bg: 'var(--at-accent)', color: 'var(--at-on-accent)' },
  { bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
  { bg: 'var(--at-success)', color: 'var(--at-on-success)' },
  { bg: 'var(--at-info)', color: 'var(--at-on-info)' },
];

const TEAM_OPTIONS = [
  { name: 'Lena Brandt', role: 'Principal Designer', checked: true },
  { name: 'Devon Okafor', role: 'Staff Engineer', checked: true },
  { name: 'Priya Nair', role: 'Accessibility', checked: false },
  { name: 'Ava Sutton', role: 'Product Designer', checked: false },
  { name: 'Tomás Herrera', role: 'Frontend Engineer', checked: false },
  { name: 'Marcus Reid', role: 'Growth Lead', checked: false },
];

export default function CreateProject(): React.JSX.Element {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(0);
  const [team, setTeam] = useState(TEAM_OPTIONS.map((t) => t.checked));
  const [visibility, setVisibility] = useState('team');

  const selectedCount = team.filter(Boolean).length;

  return (
    <>
      <PageHead
        title="New Project"
        subtitle="Set the scope, assign a team, plan the budget & milestones, then kick off."
        actions={
          <button className="at-btn at-btn--outline at-press">Back to projects</button>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div>
                  <div className="at-eyebrow">Step 1</div>
                  <div className="at-chart__title">Project details</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                    The essentials your team sees first.
                  </div>
                </div>
              </div>
              <div>
                <label className="at-form-label">
                  Project name <span style={{ color: 'var(--at-danger-text)' }}>*</span>
                </label>
                <input
                  className="at-input"
                  type="text"
                  placeholder="e.g. Aurora Redesign"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="at-form-label">Description</label>
                <textarea
                  className="at-textarea"
                  placeholder="What's the goal, the scope and the definition of done?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="at-row">
                <div className="at-col-6">
                  <label className="at-form-label">Department</label>
                  <select className="at-select">
                    <option>Design</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Marketing</option>
                    <option>Platform</option>
                    <option>Analytics</option>
                  </select>
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">Priority</label>
                  <select className="at-select">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="at-form-label">Project color</div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  {COLORS.map((c, i) => (
                    <div
                      key={c.bg}
                      className="at-avatar at-avatar--sm"
                      style={{ background: c.bg, color: c.color }}
                      onClick={() => setColor(i)}
                    >
                      {color === i ? '✓' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div>
                  <div className="at-eyebrow">Step 2</div>
                  <div className="at-chart__title">Timeline</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                    When does work start and when is it due?
                  </div>
                </div>
              </div>
              <div className="at-row">
                <div className="at-col-6">
                  <label className="at-form-label">
                    Start date <span style={{ color: 'var(--at-danger-text)' }}>*</span>
                  </label>
                  <input className="at-input" type="date" />
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">
                    Due date <span style={{ color: 'var(--at-danger-text)' }}>*</span>
                  </label>
                  <input className="at-input" type="date" />
                </div>
              </div>
            </div>

            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div>
                  <div className="at-eyebrow">Step 3</div>
                  <div className="at-chart__title">Milestones</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                    Break the project into checkpoints.
                  </div>
                </div>
                <button className="at-btn at-btn--ghost at-btn--sm">Add milestone</button>
              </div>
              <div className="at-cluster">
                <div className="at-avatar at-avatar--sm">1</div>
                <input className="at-input" type="text" placeholder="Kickoff &amp; scoping" style={{ flex: '1 1 auto' }} />
                <input className="at-input" type="date" style={{ flex: '0 0 160px' }} />
              </div>
              <div className="at-cluster">
                <div className="at-avatar at-avatar--sm">2</div>
                <input className="at-input" type="text" placeholder="Design freeze" style={{ flex: '1 1 auto' }} />
                <input className="at-input" type="date" style={{ flex: '0 0 160px' }} />
              </div>
            </div>
          </div>

          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Team</div>
                <span className="at-badge at-badge--neutral">{selectedCount} selected</span>
              </div>
              <div>
                <label className="at-form-label">
                  Project lead <span style={{ color: 'var(--at-danger-text)' }}>*</span>
                </label>
                <select className="at-select">
                  <option>Lena Brandt</option>
                  <option>Devon Okafor</option>
                  <option>Priya Nair</option>
                  <option>Ava Sutton</option>
                  <option>Tomás Herrera</option>
                  <option>Marcus Reid</option>
                </select>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {TEAM_OPTIONS.map((t, i) => (
                  <label className="at-check" key={t.name}>
                    <input
                      type="checkbox"
                      checked={team[i]}
                      onChange={(e) => setTeam((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))}
                    />{' '}
                    {t.name} · {t.role}
                  </label>
                ))}
              </div>
            </div>

            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Budget</div>
              </div>
              <div>
                <label className="at-form-label">Total budget</label>
                <div className="at-cluster">
                  <span
                    className="at-input"
                    style={{
                      padding: '0 var(--at-space-3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'var(--at-text-muted)',
                    }}
                  >
                    $
                  </span>
                  <input className="at-input" type="text" placeholder="0" style={{ flex: '1 1 auto' }} />
                </div>
              </div>
              <div>
                <label className="at-form-label">Currency</label>
                <select className="at-select">
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                </select>
              </div>
              <label className="at-check">
                <input type="checkbox" /> Billable project — track time against client invoices
              </label>
            </div>

            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-3)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Visibility</div>
              </div>
              <label className="at-check">
                <input
                  type="radio"
                  name="vis"
                  checked={visibility === 'team'}
                  onChange={() => setVisibility('team')}
                />
                <span>Team only — visible to members you add</span>
              </label>
              <label className="at-check">
                <input
                  type="radio"
                  name="vis"
                  checked={visibility === 'org'}
                  onChange={() => setVisibility('org')}
                />
                <span>Whole organization — anyone can view</span>
              </label>
            </div>
          </div>
        </div>

        <div
          className="at-card at-cluster"
          style={{ justifyContent: 'space-between', padding: 'var(--at-space-4) var(--at-space-5)' }}
        >
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            {selectedCount} members · 2 milestones
          </span>
          <div className="at-cluster">
            <button className="at-btn at-btn--outline at-press">Cancel</button>
            <button className="at-btn at-btn--outline at-press">Save draft</button>
            <button className="at-btn at-btn--primary at-press">Create project</button>
          </div>
        </div>
      </div>
    </>
  );
}
