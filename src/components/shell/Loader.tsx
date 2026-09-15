/*
 * Hactex React — full-screen loader overlay. Removed ~800ms after mount.
 */
import { useEffect, useState } from 'react';

export function Loader(): React.JSX.Element {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const off = document.documentElement.getAttribute('data-at-loader');
    if (off === 'off') {
      setHidden(true);
      return;
    }
    const t = window.setTimeout(() => setHidden(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  if (hidden) return <></>;
  return (
    <div className="at-loader" id="at-loader" aria-hidden="true">
      <div className="at-loader__stamp" />
    </div>
  );
}
