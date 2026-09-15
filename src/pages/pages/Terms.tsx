/*
 * Hactex React — Terms & Conditions page.
 * Built with the shared component classes, inline token
 * styles, and legal copy. The page is fully static (no component state); the
 * sticky table-of-contents links are extracted into a const.
 */
import { PageHead } from '../../components/shell/PageHead';

const TOC = [
  { href: '#acceptance', label: '1. Acceptance of Terms' },
  { href: '#accounts', label: '2. Your Account' },
  { href: '#license', label: '3. License & Use' },
  { href: '#payments', label: '4. Payments & Billing' },
  { href: '#ip', label: '5. Intellectual Property' },
  { href: '#liability', label: '6. Disclaimers & Liability' },
  { href: '#termination', label: '7. Termination' },
  { href: '#changes', label: '8. Changes to These Terms' },
] as const;

const headingStyle: React.CSSProperties = { marginBlockEnd: 'var(--at-space-2)' };

export default function Terms(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Terms & Conditions"
        subtitle="Last updated: July 2026 · Please read carefully."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Print</button>
            <button className="at-btn at-btn--primary at-press">Download PDF</button>
          </>
        }
      />

      <div className="at-row">
        {/* Table of contents */}
        <aside className="at-col-3">
          <div
            className="at-card"
            style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-5)' }}
          >
            <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>
              On this page
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-2)' }}>
              {TOC.map((item) => (
                <a key={item.href} href={item.href} className="at-text-muted">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Long-form body */}
        <div className="at-col-9">
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <section>
                <h3 className="at-text-strong" id="acceptance" style={headingStyle}>
                  1. Acceptance of Terms
                </h3>
                <p className="at-text-muted">
                  By accessing or using Hactex (&ldquo;the Service&rdquo;), you agree to be bound by
                  these Terms &amp; Conditions and our Privacy Policy. If you do not agree, you may
                  not access or use the Service. Your continued use after any posted changes
                  constitutes acceptance of the revised terms.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="accounts" style={headingStyle}>
                  2. Your Account
                </h3>
                <p className="at-text-muted">
                  You are responsible for maintaining the confidentiality of your account credentials
                  and for all activity that occurs under your account. You agree to notify us
                  immediately of any unauthorized use. You must be at least 18 years old, or the age
                  of majority in your jurisdiction, to use the Service.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="license" style={headingStyle}>
                  3. License &amp; Use
                </h3>
                <p className="at-text-muted">
                  We grant you a limited, non-exclusive, non-transferable license to access the
                  Service for your internal business purposes. You may not reverse engineer, resell,
                  or build a competing product using the Service, except as expressly permitted by
                  your plan.
                </p>
                <div
                  className="at-cluster"
                  style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)' }}
                >
                  <span className="at-badge at-badge--accent">Permitted</span>
                  <span className="at-badge at-badge--neutral">Internal use</span>
                  <span className="at-badge at-badge--danger">No resale</span>
                </div>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="payments" style={headingStyle}>
                  4. Payments &amp; Billing
                </h3>
                <p className="at-text-muted">
                  Paid plans are billed in advance on a recurring basis. Fees are non-refundable
                  except where required by law. We may change pricing with at least 30 days&rsquo;
                  notice; changes take effect at your next renewal.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="ip" style={headingStyle}>
                  5. Intellectual Property
                </h3>
                <p className="at-text-muted">
                  The Service, including its design, source code, and &ldquo;Bold Press&rdquo; design
                  system, is owned by Hactex and protected by intellectual property laws. Content
                  you upload remains yours; you grant us a license to host and process it solely to
                  operate the Service.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="liability" style={headingStyle}>
                  6. Disclaimers &amp; Liability
                </h3>
                <p className="at-text-muted">
                  The Service is provided &ldquo;as is&rdquo; without warranties of any kind. To the
                  maximum extent permitted by law, Hactex shall not be liable for indirect,
                  incidental, or consequential damages arising from your use of the Service.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="termination" style={headingStyle}>
                  7. Termination
                </h3>
                <p className="at-text-muted">
                  You may cancel at any time. We may suspend or terminate your access if you breach
                  these Terms. Upon termination, your right to use the Service ceases immediately.
                </p>
              </section>
              <div className="at-divider"></div>

              <section>
                <h3 className="at-text-strong" id="changes" style={headingStyle}>
                  8. Changes to These Terms
                </h3>
                <p className="at-text-muted">
                  We may update these Terms from time to time. We will post the new terms here and
                  update the &ldquo;Last updated&rdquo; date. Material changes will be communicated
                  through the Service or by email.
                </p>
              </section>

              <div className="at-divider"></div>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Questions about these Terms? Contact <a href="#">legal@atelier.co</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
