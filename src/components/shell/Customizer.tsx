/*
 * Hactex React — theme customizer offcanvas. Port of
 * Every control is live-apply + persisted
 * via the CustomizerContext setters (which delegate to lib/theme).
 */
import { useEffect, useRef } from 'react';
import { useCustomizer } from '../../context/CustomizerContext';
import { PRESETS, TYPESETS } from '../../lib/theme';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface CustomizerProps {
  open: boolean;
  onClose: () => void;
}

function Segmented<T extends string>(props: {
  value: T;
  options: { value: T; label: string }[];
  onSelect: (v: T) => void;
}): React.JSX.Element {
  return (
    <div className="at-segment" style={{ width: '100%' }}>
      {props.options.map((o) => (
        <button
          key={o.value}
          className={`at-segment__btn${props.value === o.value ? ' is-active' : ''}`}
          style={{ flex: 1 }}
          onClick={() => props.onSelect(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Customizer({ open, onClose }: CustomizerProps): React.JSX.Element {
  const c = useCustomizer();
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open);

  /* Scrim. Reuses the drawer's shared #at-backdrop rather than shipping a
     second overlay — base.css §12 raises that element under
     body.at-customizer-open, so all this has to do is carry the flag and CSS
     owns the fade. Layout mounts the scrim and wires its click-to-close. */
  useEffect(() => {
    document.body.classList.toggle('at-customizer-open', open);
    return () => document.body.classList.remove('at-customizer-open');
  }, [open]);

  /* Always mounted, dismissed by .is-open (shell.css). Unmounting while closed
     is what stopped the panel from ever sliding: the element went from absent to
     present in the same commit as the transform change, so there was no
     before-change style to interpolate from, and on close it left the DOM before
     the slide-out got a frame. visibility:hidden covers what unmounting was
     actually needed for — off-canvas alone would leave these controls in the tab
     order, reachable by keyboard while invisible — and unlike display it is
     transitionable, so the panel stays painted for the whole exit. */
  return (
    <div
      ref={ref}
      className={`at-customizer${open ? ' is-open' : ''}`}
      id="at-customizer"
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div className="at-customizer__head">
        <span className="at-customizer__title">Customize</span>
        <button className="at-icon-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="at-customizer__body">
        {/* Colour scheme — the 12 palettes. COLOUR ONLY: these tiles used to
            swap the fonts too, which is why the Typography section below now
            exists as a separate axis (styles/tokens/_typography.css). */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Color Scheme</span>
          <div className="at-preset-grid">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                className={`at-preset${c.preset === p.value ? ' is-active' : ''}`}
                style={{ background: p.bg }}
                onClick={() => c.setPreset(p.value)}
              >
                <span className="at-preset__canvas">
                  <span className="at-preset__bar" style={{ background: p.bars[0] }} />
                  <span className="at-preset__bar" style={{ background: p.bars[1], width: '60%' }} />
                  <span className="at-preset__bar" style={{ background: p.bars[2], width: '40%' }} />
                </span>
                <span className="at-preset__name" style={{ color: p.ink }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Typography — the 12 display/body pairs, independent of the colour
            scheme above. Driven through the generic registry setter (setReg)
            rather than a bespoke one; see the REGISTRY note in lib/theme.
            Each row is a real specimen: the Ag sample and BOTH family names
            render in the faces that row applies, so the pick is made by eye. */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Typography</span>
          <div className="at-type-list">
            {TYPESETS.map((t) => (
              <button
                key={t.value}
                className={`at-type${c.typeset === t.value ? ' is-active' : ''}`}
                onClick={() => c.setReg('typeset', t.value)}
                aria-label={t.aria}
              >
                <span className="at-type__sample" style={{ fontFamily: t.display }}>Ag</span>
                <span className="at-type__meta">
                  <span className="at-type__set">{t.label}</span>
                  <span className="at-type__pair">
                    <span style={{ fontFamily: t.display }}>{t.displayName}</span>
                    <span className="at-type__sep">·</span>
                    <span style={{ fontFamily: t.body }}>{t.bodyName}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Mode</span>
          <Segmented
            value={c.mode as 'light' | 'dark' | 'system'}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
            onSelect={c.setMode}
          />
        </div>

        {/* Direction */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Direction</span>
          <Segmented
            value={c.dir as 'ltr' | 'rtl'}
            options={[
              { value: 'ltr', label: 'LTR' },
              { value: 'rtl', label: 'RTL' },
            ]}
            onSelect={c.setDir}
          />
        </div>

        {/* Sidebar style */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Sidebar Style</span>
          <Segmented
            value={c.sidebarStyle as 'default' | 'compact' | 'expand'}
            options={[
              { value: 'default', label: 'Default' },
              { value: 'compact', label: 'Compact' },
              { value: 'expand', label: 'Expand' },
            ]}
            onSelect={(v) => c.setReg('sidebarStyle', v)}
          />
        </div>

        {/* Width */}
        <div className="at-customizer__section">
          <span className="at-customizer__label">Width</span>
          <Segmented
            value={c.width as 'fluid' | 'boxed'}
            options={[
              { value: 'fluid', label: 'Fluid' },
              { value: 'boxed', label: 'Boxed' },
            ]}
            onSelect={(v) => c.setReg('width', v)}
          />
        </div>

        {/* Reset */}
        <div className="at-customizer__section">
          <button className="at-btn at-btn--outline at-btn--block at-press" onClick={c.reset}>
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}
