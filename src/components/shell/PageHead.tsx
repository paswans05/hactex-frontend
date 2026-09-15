/*
 * Hactex React — page head (breadcrumb + title + subtitle + actions).
 * Used at the top of every in-shell page. Port of the .at-page-head block.
 */
import { type ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';

export interface PageHeadProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function PageHead({ title, subtitle, actions }: PageHeadProps): React.JSX.Element {
  return (
    <div className="at-page-head">
      <div className="at-page-head__row">
        <div>
          <Breadcrumb />
          <h1 className="at-page-head__title">{title}</h1>
          {subtitle && <p className="at-page-head__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="at-page-head__actions">{actions}</div>}
      </div>
    </div>
  );
}
