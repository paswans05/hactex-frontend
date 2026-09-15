/*
 * Hactex React — breadcrumb derived from the manifest trail of the current
 * route. Fills the same slot the HTML reference's nav.js fills at runtime.
 */
import { useLocation } from 'react-router-dom';
import { nodeForPath, resolve, trail } from '../../lib/manifest';

export function Breadcrumb(): React.JSX.Element | null {
  const { pathname } = useLocation();
  const node = nodeForPath(pathname);
  if (!node) return null;
  const chain = trail(resolve(node));
  if (chain.length === 0) return null;

  return (
    <nav className="at-breadcrumb" aria-label="Breadcrumb">
      {chain.map((n, i) => {
        const last = i === chain.length - 1;
        return (
          <span key={n.id}>
            <span className="at-breadcrumb__item">{n.title}</span>
            {!last && <span className="at-breadcrumb__sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
