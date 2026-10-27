import type {MouseEvent} from 'react';
import {capacityPlans} from '../content';
import {useReveals} from '../hooks/useReveals';
import {scrollToHash} from '../lib/scroll';

/**
 * Capacity Connect tier cards.
 *
 * Mirrors Missions.tsx exactly: 3-column grid, featured card, orbit-ring SVG
 * (here redrawn as concentric signal rings), useReveals entrance, staggered
 * transitionDelay, and a CTA that scrolls to #reserve.
 */

const toReserve = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  scrollToHash('#reserve');
};

/** Concentric signal rings — one per feature line, echoing the orbit rings in Missions. */
function SignalRings({count}: {count: number}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="absolute -top-10 -right-10 size-48 text-white/10 transition-transform duration-[1.2s] group-hover:rotate-12"
    >
      {Array.from({length: count}, (_, k) => (
        <circle
          key={k}
          cx="100"
          cy="100"
          r={28 + k * 20}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={`${6 + k * 2} ${8 + k * 3}`}
        />
      ))}
      <circle cx="100" cy="100" r="9" fill="currentColor" />
    </svg>
  );
}

export function CapacityPlans() {
  const ref = useReveals<HTMLElement>();
  return (
    <section
      ref={ref}
      id="capacity-plans"
      aria-labelledby="capacity-plans-title"
      className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-40"
    >
      {/* Section header */}
      <div
        className="flex flex-col gap-3 border-t border-white/10 pt-16 md:flex-row md:items-end md:justify-between md:pt-20"
        data-reveal
      >
        <div>
          <p className="font-mono text-label text-earth uppercase">{capacityPlans.eyebrow}</p>
          <h2
            id="capacity-plans-title"
            className="mt-4 font-display text-display text-white"
          >
            {capacityPlans.heading}
          </h2>
        </div>
        <p className="font-mono text-label text-regolith/50 uppercase">{capacityPlans.note}</p>
      </div>

      {/* Cards */}
      <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
        {capacityPlans.items.map((plan, i) => (
          <li
            key={plan.name}
            data-reveal
            style={{transitionDelay: `${i * 110}ms`}}
            className={`group relative flex flex-col overflow-hidden rounded-[8px] p-6 ring-1 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 md:p-8 ${
              plan.featured
                ? 'bg-void-2 ring-earth/60 hover:shadow-[0_30px_80px_-30px_rgb(111_182_255/0.45)]'
                : 'bg-void-2/60 ring-white/10 hover:ring-white/25'
            }`}
          >
            <SignalRings count={plan.lines.length} />

            {plan.featured && (
              <span className="self-start rounded-[3px] bg-earth px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-void uppercase">
                Most requested
              </span>
            )}

            <h3
              className={`font-display text-[1.25rem] tracking-[0.14em] text-white uppercase ${plan.featured ? 'mt-5' : ''}`}
            >
              {plan.name}
            </h3>

            {/* Bandwidth as the hero metric — mirrors the "days" figure in Missions. */}
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-[3.5rem] leading-none text-white">
                {plan.bandwidth}
              </span>
              <span className="font-mono text-label text-regolith/60 uppercase">{plan.unit}</span>
            </p>

            <ul className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
              {plan.lines.map((line) => (
                <li key={line} className="flex gap-3 text-[0.9375rem] text-regolith/80">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-earth" />
                  {line}
                </li>
              ))}
            </ul>

            <a
              href="#reserve"
              onClick={toReserve}
              className={`mt-10 rounded-[4px] px-5 py-3.5 text-center font-mono text-label uppercase transition-colors ${
                plan.featured
                  ? 'bg-earth text-void hover:bg-white'
                  : 'text-white ring-1 ring-white/25 hover:bg-white hover:text-void'
              }`}
            >
              {plan.cta}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
