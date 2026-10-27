import type {AuthUser} from '../../../auth/authStore';

interface Props {
  user: AuthUser;
  onNavigate?: (view: 'hub' | 'courses' | 'assessments' | 'progress' | 'plans') => void;
}

const STATS: {label: string; value: string; sub: string}[] = [
  {label: 'Courses enrolled', value: '3', sub: 'of 6 available'},
  {label: 'Completed', value: '1', sub: 'course this cycle'},
  {label: 'Assessments passed', value: '2', sub: 'avg score 90 %'},
  {label: 'Hours logged', value: '14h', sub: 'this month'},
];

const IN_PROGRESS = [
  {title: 'Lunar Comms Fundamentals', progress: 72, modules: 8, done: 6, category: 'Foundation'},
  {title: 'Uplink Engineering', progress: 35, modules: 10, done: 4, category: 'Core'},
];

const ACTIVITY = [
  {action: 'Completed module 6 of 8', course: 'Lunar Comms Fundamentals', when: '2 h ago'},
  {action: 'Passed assessment', course: 'Signal Processing in Deep Space', when: 'Yesterday'},
  {action: 'Started module 4', course: 'Uplink Engineering', when: '3 days ago'},
  {action: 'Enrolled', course: 'Uplink Engineering', when: '4 days ago'},
];

export function LearningHub({user, onNavigate}: Props) {
  const firstName = user.name.split(' ')[0];
  return (
    <div className="animate-[leg-in_0.45s_cubic-bezier(0.2,0.7,0.1,1)] space-y-10">
      {/* Welcome banner */}
      <div className="rounded-[8px] bg-void-2 px-6 py-7 ring-1 ring-white/10">
        <p className="font-mono text-label text-earth uppercase">Learning Hub</p>
        <h2 className="mt-3 font-display text-[1.75rem] tracking-[0.06em] text-white uppercase">
          Welcome back, {firstName}.
        </h2>
        <p className="mt-2 max-w-[38rem] text-body text-regolith/65">
          You have 2 courses in progress and 1 assessment available. Keep going — you're 72 % through
          Lunar Comms Fundamentals.
        </p>
        {onNavigate && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="rounded-[4px] bg-white px-4 py-2.5 font-mono text-label text-void uppercase transition-colors hover:bg-earth"
            >
              Browse Courses →
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessments')}
              className="rounded-[4px] px-4 py-2.5 font-mono text-label text-white uppercase ring-1 ring-white/20 transition-colors hover:bg-white/10"
            >
              Take Assessment →
            </button>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div>
        <p className="mb-4 font-mono text-label text-regolith/50 uppercase">At a glance</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="brackets rounded-[6px] bg-void-2 px-5 py-5 text-white/20 ring-1 ring-white/8"
            >
              <span className="block font-display text-[2.25rem] leading-none text-white tabular-nums">
                {s.value}
              </span>
              <span className="mt-1 block font-mono text-label text-earth uppercase">{s.label}</span>
              <span className="mt-1 block text-[0.8125rem] text-regolith/50">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* In progress */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-label text-regolith/50 uppercase">Continue learning</p>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="font-mono text-label text-earth uppercase transition-colors hover:text-white"
            >
              All courses →
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {IN_PROGRESS.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col gap-4 rounded-[8px] bg-void-2 p-5 ring-1 ring-white/10 transition-[box-shadow] hover:ring-earth/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-label text-earth uppercase">{c.category}</span>
                  <h3 className="mt-1 font-display text-[1rem] tracking-[0.08em] text-white uppercase">
                    {c.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-[3px] bg-earth/15 px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase">
                  {c.progress} %
                </span>
              </div>
              {/* Progress bar */}
              <div>
                <div className="h-px w-full bg-white/10">
                  <div
                    className="h-full bg-earth transition-all duration-700"
                    style={{width: `${c.progress}%`}}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-mono text-[0.625rem] tracking-[0.1em] text-regolith/50 uppercase">
                    Module {c.done} / {c.modules} complete
                  </p>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('courses')}
                      className="font-mono text-label text-earth uppercase hover:text-white"
                    >
                      Resume →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <p className="mb-4 font-mono text-label text-regolith/50 uppercase">Recent activity</p>
        <ol className="divide-y divide-white/8 rounded-[8px] bg-void-2 ring-1 ring-white/10">
          {ACTIVITY.map((a) => (
            <li key={a.action + a.when} className="flex items-center justify-between gap-6 px-5 py-4">
              <div>
                <span className="block text-[0.9375rem] text-white">{a.action}</span>
                <span className="block font-mono text-[0.625rem] tracking-[0.1em] text-regolith/50 uppercase">
                  {a.course}
                </span>
              </div>
              <span className="shrink-0 font-mono text-label text-regolith/40">{a.when}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
