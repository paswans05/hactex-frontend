/*
 * Hactex React — ApexCharts declarative wrapper.
 * Lazily imports apexcharts, reads --at-chart-*
 * tokens, builds Hactex-flavored options, and re-themes live on at:change.
 *
 * Every knob is a typed prop — horizontal, values, track and unit among them —
 * so one component covers the whole chart catalog with the token palette, axis
 * formatting and donut center-label behavior shared across all of it. Effect-
 * guarded so ApexCharts mounts once per page; StrictMode is omitted in main.tsx
 * to avoid double-mount churn.
 *
 * No react-router imports, so it drops into any tree unchanged.
 */
import { useEffect, useRef } from 'react';
import type { ApexOptions } from 'apexcharts';

export interface ApexChartProps {
  type: 'area' | 'line' | 'bar' | 'donut' | 'pie' | 'radialBar' | 'polarArea';
  series: ApexOptions['series'];
  height?: number;
  sparkline?: boolean;
  legend?: boolean;
  stacked?: boolean;
  tooltip?: boolean;
  categories?: string[];
  labels?: string[];
  /** Single forced color (token name like "--at-accent" or a hex). */
  color?: string;
  centerLabel?: string;
  centerValue?: string;
  /** Bar only — lay the bars along the x axis (categories down the side). */
  horizontal?: boolean;
  /** Print each mark's own value beside it. */
  values?: boolean;
  /** Paint the unfilled remainder of each bar in --at-chart-track. */
  track?: boolean;
  /** Suffix glued onto every formatted number ("%", "h", "k" is automatic). */
  unit?: string;
  className?: string;
}

type ApexCtor = new (el: HTMLElement, opts: ApexOptions) => {
  render: () => Promise<void>;
  destroy: () => void;
};

let ApexP: Promise<ApexCtor> | null = null;
function loadApex(): Promise<ApexCtor> {
  if (!ApexP) ApexP = import('apexcharts').then((m) => (m.default as ApexCtor) ?? m);
  return ApexP;
}

function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Apex wants font sizes as CSS strings, so every size in this file used to be
// a literal — '11px', '12px', and a '26px' donut centre that was not a step on
// the type scale at all. That put the chart layer outside the scale: retuning
// tokens/_primitives.css moved every heading in the template and left the
// charts where they were. These read the tokens instead, with the old literal
// as the fallback for the one case token() can return '' — a chart built
// before the stylesheet has applied.
const fontSize = (name: string, fallback: string): string => token(name) || fallback;
function tokenColor(name: string): string {
  const v = token(name);
  return v.startsWith('--') ? token(v) : v;
}
function palette(): string[] {
  return [
    tokenColor('--at-chart-1') || token('--at-accent'),
    tokenColor('--at-chart-2'),
    tokenColor('--at-chart-3'),
    tokenColor('--at-chart-4'),
    tokenColor('--at-chart-5'),
    tokenColor('--at-chart-6'),
  ].filter(Boolean);
}
function resolvedMode(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-at-theme') === 'dark'
    ? 'dark'
    : 'light';
}

// ── axis number formatting ────────────────────────────────────────────────
// Raw counts on an axis ("74210", "20000") cost the reader a beat to parse and
// push the y-axis gutter wide. Compact them, and keep one decimal only where it
// carries information (1.2k, but 12k not 12.0k).
function compact(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '';
  const a = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  const cut = (v: number, suffix: string): string => {
    const r = v >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
    return sign + r + suffix;
  };
  if (a >= 1e9) return cut(a / 1e9, 'B');
  if (a >= 1e6) return cut(a / 1e6, 'M');
  if (a >= 1e3) return cut(a / 1e3, 'k');
  if (a >= 1) return sign + (Math.round(a * 10) / 10).toString();
  return sign + (Math.round(a * 100) / 100).toString();
}

// Gridlines a chart of a given height can carry: [drawn under this height, use
// this many ticks], first match wins, and anything taller than the last row
// gets 6. A widget-sized chart cannot hold five without the axis reading as
// denser than the data it labels; the rows above 420 are the other end of the
// same rule, since a card-filling chart holding only four strands one gridline
// every ~200px and the axis stops describing the plot. Every height declared in
// the template is under 420, so those rows only ever apply to a chart that has
// grown to fill its card.
const AXIS_TICKS: Array<[number, number]> = [
  [200, 2],
  [260, 3],
  [420, 4],
  [620, 5],
];

// A "nice" axis ceiling just above the data. Apex's own nice-scale rounds hard
// (a 15.6k peak becomes a 20k axis), which strands a quarter of the plot empty
// and shrinks every bar. Solve for the TICK instead of the ceiling: find the
// smallest round tick that covers the data in `ticks` steps, then the ceiling
// falls out of it — so the axis both hugs the data and lands on readable
// numbers (0 · 4k · 8k · 12k · 16k, never 0 · 4.25k · 8.5k).
const TICK_STEPS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 8, 10];
function niceMax(peak: number, ticks = 4): number | undefined {
  if (!(peak > 0)) return undefined;
  // The rounding up to a whole tick supplies the headroom; 1.02 only stops a
  // peak that lands exactly on a tick from touching the top of the frame.
  const target = (peak * 1.02) / ticks;
  const mag = 10 ** Math.floor(Math.log10(target));
  for (const step of TICK_STEPS) {
    if (step * mag >= target) return step * mag * ticks;
  }
  return 10 * mag * ticks;
}

// Peak of the plotted values — the per-category stack total when stacked.
// `series` arrives typed but structurally open (ApexAxisChartSeries has half a
// dozen point shapes), so the unpacking stays defensive exactly like the
// reference: an array row, a { data } row, and {x,y} points all reduce to numbers.
function seriesPeak(series: ApexChartProps['series'], stacked: boolean): number {
  const input: unknown[] = Array.isArray(series) ? series : [];
  const rows = input
    .map((s) => {
      if (Array.isArray(s)) return s as unknown[];
      const d = (s as { data?: unknown } | null)?.data;
      return Array.isArray(d) ? (d as unknown[]) : [];
    })
    .map((d) => d.map((v) => (v && typeof v === 'object' ? (v as { y?: unknown }).y : v)))
    .filter((d) => d.length);
  if (!rows.length) return 0;
  const nums = rows
    .flat()
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  if (!nums.length || Math.min(...nums) < 0) return 0; // negatives: leave the scale to apex
  if (!stacked) return Math.max(...nums);
  const len = Math.max(...rows.map((r) => r.length));
  let peak = 0;
  for (let i = 0; i < len; i++) {
    const sum = rows.reduce((t, r) => t + (typeof r[i] === 'number' ? (r[i] as number) : 0), 0);
    if (sum > peak) peak = sum;
  }
  return peak;
}

// A chart body that is a card's own child is stretched by the card (see
// components.css §28) and draws to fill it; everything else keeps the exact
// pixel height it declared. That excludes the KPI and watchlist sparklines,
// which pass their own className and are sized by the height prop alone, and
// the one donut on Lms that shares a nested row with a stats column and is
// deliberately centered at 180px. This test is the TS half of the stylesheet's
// `.at-card > .at-chart__body`.
function fillsCard(el: HTMLElement | null): boolean {
  return (
    !!el &&
    el.classList.contains('at-chart__body') &&
    !!el.parentElement &&
    el.parentElement.classList.contains('at-card')
  );
}

// The height a filling chart will actually be drawn at. Only the gridline count
// reads this — the height handed to ApexCharts is '100%' — but it has to be a
// real number, so measure the box the same way the browser will.
function chartHeight(el: HTMLElement, declared: number): number {
  return Math.max(declared, el.clientHeight);
}

function buildOptions(props: ApexChartProps, el: HTMLElement | null): ApexOptions {
  const {
    type, height: declared = 260, sparkline = false, legend: showLegend = false,
    stacked = false, tooltip: showTooltip = true, categories, labels, color,
    centerLabel, centerValue, series,
    horizontal = false, values: showValues = false, track: showTrack = false,
    unit = '',
  } = props;

  // For a chart that fills its card, the height prop is a FLOOR rather than a
  // fixed size, and the real height is left to ApexCharts: '100%' makes it
  // measure the element's PARENT and — the reason to prefer this over measuring
  // here ourselves — keep measuring it, through its own observer, so the chart
  // re-fits whenever the row's height moves. Nothing else in the library does:
  // updateOptions({ chart: { height } }) is silently ignored in 4.7, so a chart
  // sized once at load could never be corrected afterwards. `height` below stays
  // a pixel number because the gridline count needs one.
  const fill = fillsCard(el);
  const height = fill && el ? chartHeight(el, declared) : declared;

  const colors = color ? [tokenColor(color)] : palette();
  const isDonut = type === 'donut' || type === 'pie';

  const axisColor = token('--at-chart-axis');
  const gridColor = token('--at-chart-grid');
  const axisLine = token('--at-chart-axis-line');
  const trackColor = token('--at-chart-track');
  const surface = token('--at-surface');
  const strongColor = token('--at-text-strong');
  const sans = token('--at-font-sans') || 'inherit';
  const display = token('--at-font-display') || sans;

  // Every number the reader sees — axis tick, bar label, legend value — passes
  // through one formatter, so the unit is declared once and never drifts.
  const fmt = (v: number | string): string =>
    typeof v === 'number' ? compact(v) + unit : v;

  // Axis labels are text, not data — they wear the muted text token so the
  // marks stay the only saturated thing in the frame.
  const axisLabels = {
    style: {
      colors: axisColor,
      fontSize: fontSize('--at-text-2xs', '12px'),
      fontFamily: sans,
      fontWeight: 500,
    },
  };

  const base: ApexOptions = {
    chart: {
      type,
      // '100%' is measured against the mount element's parent — which is the
      // chart body, because a filling chart is mounted one level in.
      height: fill ? '100%' : height,
      sparkline: { enabled: sparkline },
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: sans,
      background: 'transparent',
      stacked,
      animations: { enabled: true, speed: 320, animateGradually: { enabled: false } },
    },
    colors,
    series,
    // Donut/pie read `config.labels.length` with no null guard, so never emit
    // undefined — fall back to [] (apex then derives slice labels). For
    // cartesian charts an undefined labels is fine, so omit the key entirely.
    ...(labels || isDonut ? { labels: labels || [] } : {}),
    legend: {
      show: showLegend,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: fontSize('--at-text-xs', '13px'),
      fontFamily: sans,
      fontWeight: 500,
      labels: { colors: axisColor },
      markers: { size: 6, shape: 'circle', strokeWidth: 0 },
      itemMargin: { horizontal: 10, vertical: 4 },
    },
    tooltip: {
      enabled: showTooltip,
      theme: resolvedMode(),
      // Apex's pie/donut defaults turn fillSeriesColor ON, which paints the
      // whole hover card in the slice's own colour — as an inline background,
      // so no stylesheet can undo it — and hides the marker. The card then
      // reads as a second, larger swatch of the series colour, and its ink text
      // sits on whatever saturation that slice happens to have. The card is
      // chrome; only the small marker carries identity.
      fillSeriesColor: false,
      style: { fontSize: fontSize('--at-text-xs', '13px'), fontFamily: sans },
      marker: { show: true },
    },
    dataLabels: { enabled: false },
    // Apex's built-in hover/active states are an feColorMatrix that multiplies
    // RGB by a hardcoded 2 ('lighten') or 0.3 ('darken') — the `value` you pass
    // is ignored outright. On this palette a mid-tone salmon multiplies out to
    // near-white and a crimson slice to neon, so the mark you are pointing at
    // becomes the least legible thing in the frame. Turn the filters off; the
    // hover emphasis is done in CSS, where the mark keeps its exact colour and
    // the rest of the frame recedes instead.
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  };

  // Donut / pie / radial / polarArea are "no-axis" chart types. ApexCharts
  // throws "Cannot read properties of undefined (reading 'length')" if you pass
  // xaxis/yaxis/grid/plotOptions.bar at them, so those keys are cartesian-only.
  if (isDonut) {
    // The donut hole can carry a two-line center label — a small eyebrow
    // ("Sessions") above a bold total ("54.2K"). Both pieces are opt-in via the
    // centerLabel / centerValue props; omit either and the hole stays empty, so
    // this never forces content onto a chart that didn't ask for it.
    const hasCenter = Boolean(centerLabel || centerValue);
    const donutOpts: ApexOptions = {
      // A 2px surface-coloured ring is the spacer between slices: it separates
      // neighbours without adding a second colour to the frame.
      stroke: { show: true, width: 2, colors: [surface] },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '70%',
            labels: {
              show: hasCenter,
              name: {
                show: true,
                offsetY: -1,
                color: axisColor,
                fontSize: fontSize('--at-text-2xs', '12px'),
                fontWeight: 600,
                fontFamily: sans,
              },
              value: {
                show: true,
                offsetY: 6,
                color: strongColor,
                fontSize: fontSize('--at-text-xl', '24px'),
                fontWeight: 700,
                fontFamily: display,
                // Apex types this hook as string-in/string-out, but it hands the
                // raw slice number through on donuts — hence the widened param.
                formatter: (v: string | number): string =>
                  typeof v === 'number' ? compact(v) : v,
              },
              ...(hasCenter
                ? {
                  total: {
                    show: true,
                    showAlways: true,
                    label: centerLabel || '',
                    color: axisColor,
                    fontSize: fontSize('--at-text-2xs', '12px'),
                    fontWeight: 600,
                    fontFamily: sans,
                    formatter: () => centerValue || '',
                  },
                }
                : {}),
            },
          },
        },
      },
      // Donut/pie legends sit at the bottom and carry their slice value, so
      // each entry reads "Label 58" rather than a bare label on the side.
      legend: {
        ...base.legend,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (seriesName: string, opts: any) => {
          const v = opts.w.globals.series[opts.seriesIndex];
          return `${seriesName}&nbsp;&nbsp;<span class="at-chart-legend-val">${fmt(v)}</span>`;
        },
      },
    };
    Object.assign(base, donutOpts);
  } else {
    // A bar's LENGTH is the value, so it has to grow from zero — a cropped
    // baseline makes a 3% gap look like a 3× one. Lines and areas encode
    // position over time and keep apex's fitted scale: zero-basing a price
    // series pins it into the top sliver of the plot and flattens the very
    // movement the chart exists to show.
    const zeroBased = type === 'bar';
    const step = AXIS_TICKS.find(([upTo]) => height < upTo);
    const ticks = horizontal ? 4 : step ? step[1] : 6;
    const peak = zeroBased ? seriesPeak(series, stacked) : 0;
    const max = niceMax(peak, ticks);
    const valueAxis = {
      labels: { ...axisLabels, formatter: fmt },
      ...(max ? { max, min: 0, tickAmount: ticks } : {}),
    };
    const catAxis = categories ? { categories } : {};

    // Opt-in per-mark values. Left undefined when not asked for, so the key is
    // never merged onto `base` and its `dataLabels: { enabled: false }` stands.
    const valueLabels: ApexOptions['dataLabels'] = showValues
      ? {
        enabled: true,
        formatter: fmt,
        offsetX: horizontal ? 7 : 0,
        offsetY: horizontal ? 0 : -6,
        textAnchor: horizontal ? 'start' : 'middle',
        style: {
          fontSize: fontSize('--at-text-2xs', '12px'),
          fontFamily: sans,
          fontWeight: 600,
          colors: [strongColor],
        },
        background: { enabled: false },
        dropShadow: { enabled: false },
      }
      : undefined;

    const cartesianOpts: ApexOptions = {
      xaxis: {
        ...catAxis,
        labels: horizontal
          ? { ...axisLabels, formatter: fmt }
          : { ...axisLabels, hideOverlappingLabels: false, trim: false },
        axisBorder: { show: !sparkline, color: axisLine },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        crosshairs: {
          show: type === 'line' || type === 'area',
          stroke: { color: axisLine, width: 1, dashArray: 3 },
        },
        ...(horizontal && max ? { max, min: 0, tickAmount: 4 } : {}),
      },
      yaxis: horizontal ? { labels: axisLabels } : valueAxis,
      // The grid sits UNDER the data: value lines only, one tint of ink, and no
      // frame around the plot. Category lines would draw a cage around bars that
      // are already separated by their own spacing.
      grid: {
        borderColor: gridColor,
        strokeDashArray: 0,
        xaxis: { lines: { show: horizontal } },
        yaxis: { lines: { show: !horizontal } },
        /* left:4 left exactly 2px between the last glyph of a y-axis label
           and the first gridline, so "80k" read as if it were touching the
           plot — on all 38 cartesian charts in the template, since this is
           the only place the value is set. Apex spends the first 2px of this
           padding on the axis itself, so the gutter is the value minus 2: 14
           buys the 12px the labels need to read as a column beside the plot
           rather than a fringe of it.
           grid.padding rather than yaxis.labels.offsetX: padding moves the
           PLOT and leaves the axis where it is, where offsetX drags the labels
           toward the edge of the frame and spends the slack that protects a
           long label (measured: 17px of clearance kept, vs 11px). */
        padding: { top: 0, right: 4, bottom: 0, left: 14 },
      },
      stroke:
        type === 'bar'
          ? // On bars the stroke IS the spacer — 2px of surface between stacked
          // segments and between neighbouring bars.
          { show: true, width: 2, colors: [surface] }
          : { curve: 'smooth', width: 2, lineCap: 'round' },
      // Apex derives a line's stroke from `fill` and defaults fill.opacity to
      // 0.85, so a plain line renders as a washed-out version of its own token
      // — wrong for a language built on flat, unmodulated color. Force it solid
      // for `line` only. Areas take a gradient wash instead of a flat fill: two
      // opaque areas hide whichever one is drawn second, so the series behind
      // simply disappears.
      fill:
        type === 'area'
          ? {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.34,
              opacityTo: 0.04,
              stops: [0, 100],
            },
          }
          : { type: 'solid', opacity: 1 },
      markers: {
        size: 0,
        strokeWidth: 2,
        strokeColors: surface,
        hover: { size: 5, sizeOffset: 0 },
      },
      plotOptions: {
        bar: {
          horizontal,
          columnWidth: '58%',
          barHeight: '62%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
          // Values ride just past the end of the mark, on the surface, rather
          // than inside the fill — a short bar has no room inside it, and muted
          // ink on a saturated fill is the one place this palette loses contrast.
          dataLabels: { position: 'top' },
          ...(showTrack
            ? { colors: { backgroundBarColors: [trackColor], backgroundBarRadius: 4 } }
            : {}),
        },
      },
      ...(valueLabels ? { dataLabels: valueLabels } : {}),
    };
    Object.assign(base, cartesianOpts);
  }
  return base;
}

const clamp = (v: number, lo: number, hi: number): number => Math.max(lo, Math.min(v, hi));
// Host elements whose slice-tooltip clamp is already wired. The at:change effect
// below destroys and re-renders the chart but keeps the same host div, so without
// this the listener would stack up once per theme switch.
const _clamped = new WeakSet<HTMLElement>();

// Apex places the pie/donut tooltip at the cursor with NO bounds check:
//   x = clientX - wrap.left - ttWidth / 2
//   y = clientY - wrap.top  - ttHeight - 10
// Hover the upper arc and y goes negative — the card lands outside the plot and
// the chart body clips it in half. Re-place it here instead. Apex binds its own
// handler on the slice <path>, so by the time this bubbling listener runs the
// inline left/top are already set and ours are the last word.
function clampSliceTooltip(el: HTMLElement): void {
  if (_clamped.has(el)) return;
  _clamped.add(el);
  const reposition = (e: MouseEvent | TouchEvent): void => {
    const wrap = el.querySelector('.apexcharts-canvas');
    const tip = wrap?.querySelector<HTMLElement>('.apexcharts-tooltip.apexcharts-active');
    if (!wrap || !tip) return;
    const p = 'touches' in e && e.touches[0] ? e.touches[0] : (e as MouseEvent);
    const box = wrap.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const x = p.clientX - box.left;
    const y = p.clientY - box.top;
    // Sit above the cursor by default; flip below when there is no room up
    // there, so the card never covers the slice it is describing.
    const top = y - th - 12 < 0 ? y + 18 : y - th - 12;
    tip.style.left = `${clamp(x - tw / 2, 2, box.width - tw - 2)}px`;
    tip.style.top = `${clamp(top, 2, box.height - th - 2)}px`;
  };
  el.addEventListener('mousemove', reposition);
  el.addEventListener('touchmove', reposition, { passive: true });
}

export function ApexChart(props: ApexChartProps): React.JSX.Element {
  const { className, height = 260 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  const mount = async (): Promise<void> => {
    if (!ref.current) return;
    const A = await loadApex();
    // Guard: component may have unmounted during the async import.
    if (!ref.current) return;
    const el = ref.current;
    // A filling chart is mounted one level in. ApexCharts resolves a percentage
    // height against its element's PARENT, so the box we want it to match has to
    // BE the parent — and this keeps the drawn chart out of flow (the mount is
    // absolutely positioned in components.css §28), so what ApexCharts draws can
    // never feed back into the flex sizing that decided how much room it had.
    let host: HTMLElement = el;
    if (fillsCard(el)) {
      host = document.createElement('div');
      host.className = 'at-chart__canvas';
      el.appendChild(host);
    }
    try {
      const chart = new A(host, buildOptions(propsRef.current, el));
      Promise.resolve(chart.render()).catch((e) =>
        console.warn('[atelier charts] render failed', e),
      );
      // Only the pie/donut tooltip is cursor-placed and unclamped by apex; the
      // cartesian one is already positioned against the plot box.
      const t = propsRef.current.type;
      if (t === 'donut' || t === 'pie') clampSliceTooltip(el);
      chartRef.current = chart;
    } catch (e) {
      console.warn('[atelier charts] render failed', e);
    }
  };

  // mount once on first paint
  useEffect(() => {
    void mount();
    return (): void => {
      try {
        chartRef.current?.destroy();
      } catch {
        /* noop */
      }
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-theme live on at:change (destroy + re-render on new tokens, like the ref)
  useEffect(() => {
    const onTheme = (): void => {
      try {
        chartRef.current?.destroy();
      } catch {
        /* noop */
      }
      chartRef.current = null;
      if (ref.current) ref.current.innerHTML = '';
      void mount();
    };
    window.addEventListener('at:change', onTheme);
    return () => window.removeEventListener('at:change', onTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={className ?? 'at-chart__body'}
      // The declared height is reserved twice over: as the custom property the
      // stylesheet reads for its floor (components.css §28), and as an inline
      // min-height, which is the whole of the sizing for the sparkline elements
      // that never become a card's own child.
      //
      // The reference does this imperatively, in a pass over every chart on the
      // page before the first one is drawn — a filling chart measures the box
      // its card gave it, and a card's height comes from the tallest card in its
      // row, so a chart still claiming the 260px default while the chart beside
      // it takes its real 120px keeps moving the row under both of them. Here it
      // is part of the same commit that creates the elements, so every box on
      // the page already holds its final height before any effect runs and the
      // layout being measured is the settled one.
      style={{ '--at-chart-min-h': `${height}px`, minHeight: height } as React.CSSProperties}
    />
  );
}
