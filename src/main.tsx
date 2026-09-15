/*
 * Hactex React — boot entry. Imports app.css once (the shared --at-* token
 * core, compiled by Vite + @tailwindcss/vite), wires the live system-theme
 * listener, and mounts <App/>.
 *
 * StrictMode is intentionally omitted so effect-guarded ApexCharts instances
 * mount once without double-render churn.
 */
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import { App } from './App';
import { bootTheme, listenSystem } from './lib/theme';

bootTheme();
listenSystem();
createRoot(document.getElementById('root')!).render(<App />);
