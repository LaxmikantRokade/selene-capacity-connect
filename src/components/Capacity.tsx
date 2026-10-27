import {capacity} from '../content';
import {useReveals} from '../hooks/useReveals';

/**
 * Capacity Connect — feature overview.
 *
 * Static section (no scroll pin) using the same useReveals / data-reveal
 * pattern as Missions and Reserve. Layout: intro column on the left, 2×2
 * feature grid on the right, separated by a vertical rule on desktop.
 */
export function Capacity({onGetStarted}: {onGetStarted?: () => void}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section
      ref={ref}
      id="capacity"
      aria-labelledby="capacity-title"
      className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-40"
    >
      {/* Decorative signal-ring background — mirrors the Earth glow in Reserve. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30vw] right-[-10vw] size-[70vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(111,182,255,0.07),transparent_65%)]"
      />

      <div className="relative grid gap-16 md:grid-cols-[1fr_auto_1fr] md:gap-0">
        {/* Left — intro */}
        <div data-reveal className="md:pr-16">
          <p className="font-mono text-label text-earth uppercase">{capacity.eyebrow}</p>
          <h2
            id="capacity-title"
            className="mt-4 font-display text-display text-white"
          >
            {capacity.heading}
          </h2>
          <p className="mt-5 max-w-[30rem] text-body text-regolith/70">{capacity.body}</p>

          {/* Signal-strength telemetry bar — decorative. */}
          <div
            aria-hidden="true"
            className="mt-10 flex items-end gap-1"
          >
            {[0.3, 0.55, 0.75, 1].map((h, i) => (
              <span
                key={i}
                className="w-2 rounded-sm bg-earth"
                style={{height: `${h * 28}px`, opacity: 0.3 + i * 0.18}}
              />
            ))}
            <span className="ml-3 font-mono text-label text-earth uppercase">
              Uplink active
            </span>
          </div>

          {onGetStarted && (
            <div className="mt-8">
              <button
                type="button"
                onClick={onGetStarted}
                className="rounded-[4px] bg-white px-5 py-3 font-mono text-label text-void uppercase transition-colors hover:bg-earth"
              >
                Access Learning Hub →
              </button>
            </div>
          )}
        </div>

        {/* Vertical rule */}
        <div
          aria-hidden="true"
          className="hidden w-px self-stretch bg-white/10 md:block"
        />

        {/* Right — feature grid */}
        <ul className="grid gap-8 sm:grid-cols-2 md:pl-16">
          {capacity.features.map((f, i) => (
            <li
              key={f.title}
              data-reveal
              style={{transitionDelay: `${i * 90}ms`}}
              className="flex flex-col gap-3"
            >
              {/* Bracket accent */}
              <span
                aria-hidden="true"
                className="brackets inline-block h-6 w-6 text-earth/50"
              />
              <h3 className="font-display text-[0.9375rem] tracking-[0.1em] text-white uppercase">
                {f.title}
              </h3>
              <p className="text-body text-regolith/65">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
