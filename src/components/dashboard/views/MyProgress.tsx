const SKILLS = [
  {name: 'Link Budget Analysis', progress: 78},
  {name: 'RF Signal Processing', progress: 95},
  {name: 'Uplink Protocol Design', progress: 42},
  {name: 'Ground Station Ops', progress: 20},
  {name: 'Data Framing (CCSDS)', progress: 10},
];

const OVERALL = 49; // percent of full programme

const ACHIEVEMENTS = [
  {title: 'First Contact', desc: 'Completed your first module.', earned: true},
  {title: 'Clear Signal', desc: 'Scored ≥ 90 % on an assessment.', earned: true},
  {title: 'Coast Phase', desc: 'Logged 10+ hours of study.', earned: true},
  {title: 'Lunar Orbit', desc: 'Completed a full course.', earned: true},
  {title: 'Surface EVA', desc: 'Passed 5 assessments.', earned: false},
  {title: 'Resident', desc: 'Complete all courses in a plan.', earned: false},
];

export function MyProgress() {
  return (
    <div className="animate-[leg-in_0.45s_cubic-bezier(0.2,0.7,0.1,1)] space-y-10">
      <div>
        <p className="font-mono text-label text-earth uppercase">My Progress</p>
        <h2 className="mt-3 font-display text-[1.75rem] tracking-[0.06em] text-white uppercase">
          Your trajectory so far.
        </h2>
      </div>

      {/* Overall programme progress */}
      <div className="rounded-[8px] bg-void-2 p-6 ring-1 ring-white/10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
          {/* Radial-ring progress indicator (CSS only) */}
          <div className="relative mx-auto size-36 shrink-0 md:mx-0">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff12" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#6fb6ff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - OVERALL / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[2rem] leading-none text-white">{OVERALL}%</span>
              <span className="mt-1 font-mono text-[0.625rem] tracking-[0.12em] text-regolith/50 uppercase">
                Complete
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-display text-[1rem] tracking-[0.1em] text-white uppercase">
              Programme overview
            </h3>
            <p className="mt-2 max-w-[34rem] text-body text-regolith/65">
              You've completed 1 of 6 courses, passed 2 assessments, and logged approximately 14 hours
              of study. Finish Uplink Engineering to unlock the Mid-Programme Review.
            </p>
            <div className="mt-5 flex flex-wrap gap-6 font-mono text-label uppercase">
              <span className="text-earth">1 / 6 <span className="text-regolith/50">courses done</span></span>
              <span className="text-earth">2 / 4 <span className="text-regolith/50">assessments passed</span></span>
              <span className="text-earth">14 h <span className="text-regolith/50">logged</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill breakdown */}
      <div>
        <p className="mb-5 font-mono text-label text-regolith/50 uppercase">Skill breakdown</p>
        <ol className="space-y-4">
          {SKILLS.map((s) => (
            <li key={s.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.9375rem] text-white">{s.name}</span>
                <span className="font-mono text-label text-regolith/60">{s.progress} %</span>
              </div>
              <div className="h-px w-full bg-white/10">
                <div
                  className="h-full bg-earth transition-all duration-700"
                  style={{width: `${s.progress}%`}}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Achievements */}
      <div>
        <p className="mb-5 font-mono text-label text-regolith/50 uppercase">Achievements</p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <li
              key={a.title}
              className={`rounded-[8px] p-4 ring-1 transition-colors ${
                a.earned
                  ? 'bg-void-2 ring-earth/40'
                  : 'bg-void-2/40 ring-white/8 opacity-40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 font-mono text-[0.75rem] ${a.earned ? 'text-earth' : 'text-regolith/30'}`}
                  aria-hidden="true"
                >
                  {a.earned ? '✦' : '◇'}
                </span>
                <div>
                  <h3 className="font-display text-[0.875rem] tracking-[0.1em] text-white uppercase">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-regolith/55">{a.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
