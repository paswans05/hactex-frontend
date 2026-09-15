/*
 * Hactex React — Customizer / theme state provider.
 *
 * Single source of UI truth for the theme attribute contract. It mirrors the
 * current <html> data-at-* attributes into React state and exposes setters that
 * call the pure lib/theme mutators (which set the attribute + persist the at:
 * key + dispatch at:change). The anti-flash IIFE in index.html has already
 * painted the correct first frame; this provider just re-reads it on mount and
 * keeps the controls in sync.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as theme from '../lib/theme';
import type { Snapshot } from '../lib/theme';

export type State = Snapshot;

export interface CustomizerApi extends State {
  setMode: (m: string) => void;
  setDir: (d: string) => void;
  setLang: (l: string) => void;
  setPreset: (p: string) => void;
  setReg: (name: string, value: string) => void;
  toggleTheme: () => void;
  reset: () => void;
}

const Ctx = createContext<CustomizerApi | null>(null);

export function CustomizerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => theme.snapshot());
  const sync = useCallback(() => setState(theme.snapshot()), []);

  // Wire the live system-theme listener once; re-sync on any at:change.
  useEffect(() => {
    theme.listenSystem();
    const onChange = (): void => sync();
    window.addEventListener('at:change', onChange);
    return () => window.removeEventListener('at:change', onChange);
  }, [sync]);

  const api = useMemo<CustomizerApi>(
    () => ({
      ...state,
      setMode: (m) => {
        theme.setMode(m);
        sync();
      },
      setDir: (d) => {
        theme.setDir(d);
        sync();
      },
      setLang: (l) => {
        theme.setLang(l);
        sync();
      },
      setPreset: (p) => {
        theme.setPreset(p);
        sync();
      },
      setReg: (name, value) => {
        theme.setByName(name, value);
        sync();
      },
      toggleTheme: () => {
        theme.quickToggleTheme();
        sync();
      },
      reset: () => {
        theme.reset();
        sync();
      },
    }),
    [state, sync],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCustomizer(): CustomizerApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCustomizer must be used within CustomizerProvider');
  return ctx;
}
