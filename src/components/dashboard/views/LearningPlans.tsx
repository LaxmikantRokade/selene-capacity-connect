import {useState} from 'react';

interface Phase {
  title: string;
  modules: string[];
  status: 'done' | 'active' | 'upcoming';
}

interface Plan {
  name: string;
  tier: string;
  description: string;
  phases: Phase[];
  totalHours: string;
  enrolled: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Signal Certification',
    tier: 'Signal · 1 Mbps',
    description:
      'The foundational track for new crew. Covers everything you need to operate within the Signal bandwidth tier.',
    totalHours: '12 h',
    enrolled: true,
    phases: [
      {
        title: 'Foundation',
        modules: ['Lunar Comms Fundamentals'],
        status: 'active',
      },
      {
        title: 'Core skills',
        modules: ['Uplink Engineering', 'Ground Station Operations'],
        status: 'upcoming',
      },
      {
        title: 'Certification exam',
        modules: ['Signal Tier Assessment'],
        status: 'upcoming',
      },
    ],
  },
  {
    name: 'Relay Track',
    tier: 'Relay · 10 Mbps',
    description:
      'The intermediate programme for crew requiring audio and video uplink. Builds on Signal foundations.',
    totalHours: '22 h',
    enrolled: false,
    phases: [
      {
        title: 'Signal prerequisites',
        modules: ['Signal Certification (required first)'],
        status: 'upcoming',
      },
      {
        title: 'Advanced signal processing',
        modules: ['Signal Processing in Deep Space', 'Earthrise Data Protocols'],
        status: 'upcoming',
      },
      {
        title: 'Certification exam',
        modules: ['Relay Tier Assessment'],
        status: 'upcoming',
      },
    ],
  },
  {
    name: 'Uplink Elite',
    tier: 'Uplink · 100 Mbps',
    description:
      'Expert-level programme for dedicated ground station operators and mission control integrators.',
    totalHours: '35 h',
    enrolled: false,
    phases: [
      {
        title: 'Relay prerequisites',
        modules: ['Relay Track (required first)'],
        status: 'upcoming',
      },
      {
        title: 'Expert modules',
        modules: ['Mission Control Integration'],
        status: 'upcoming',
      },
      {
        title: 'Final assessment',
        modules: ['Uplink Elite Capstone'],
        status: 'upcoming',
      },
    ],
  },
];

const PHASE_DOT: Record<Phase['status'], {cls: string; label: string}> = {
  done:     {cls: 'bg-sunlit',       label: 'Complete'},
  active:   {cls: 'bg-earth animate-pulse', label: 'In progress'},
  upcoming: {cls: 'bg-white/20',     label: 'Upcoming'},
};

export function LearningPlans() {
  const [plans, setPlans] = useState<Plan[]>(PLANS);

  const handleEnrol = (planName: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.name !== planName) return p;
        return {
          ...p,
          enrolled: true,
          phases: p.phases.map((ph, idx) =>
            idx === 0 ? {...ph, status: 'active'} : ph,
          ),
        };
      }),
    );
  };

  return (
    <div className="animate-[leg-in_0.45s_cubic-bezier(0.2,0.7,0.1,1)] space-y-8">
      <div>
        <p className="font-mono text-label text-earth uppercase">Learning Plans</p>
        <h2 className="mt-3 font-display text-[1.75rem] tracking-[0.06em] text-white uppercase">
          Structured paths to certification.
        </h2>
        <p className="mt-2 max-w-[38rem] text-body text-regolith/60">
          Each plan is tied to a Capacity Connect bandwidth tier. Complete the plan to unlock your
          allocated uplink for the mission.
        </p>
      </div>

      <ol className="space-y-5">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className={`rounded-[8px] bg-void-2 ring-1 ${
              plan.enrolled ? 'ring-earth/50' : 'ring-white/10'
            }`}
          >
            {/* Plan header */}
            <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-label text-earth uppercase">{plan.tier}</span>
                  {plan.enrolled && (
                    <span className="rounded-[3px] bg-earth px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-void uppercase">
                      Enrolled
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-[1.125rem] tracking-[0.1em] text-white uppercase">
                  {plan.name}
                </h3>
                <p className="mt-2 max-w-[38rem] text-[0.875rem] text-regolith/60">{plan.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <div className="text-right">
                  <span className="block font-display text-[1.75rem] leading-none text-white">
                    {plan.totalHours}
                  </span>
                  <span className="font-mono text-label text-regolith/50 uppercase">total</span>
                </div>
                {!plan.enrolled && (
                  <button
                    type="button"
                    onClick={() => handleEnrol(plan.name)}
                    className="rounded-[4px] px-4 py-2.5 font-mono text-label text-white uppercase ring-1 ring-white/25 transition-colors hover:bg-white hover:text-void"
                  >
                    Enrol
                  </button>
                )}
              </div>
            </div>

            {/* Phases */}
            <ol className="divide-y divide-white/8">
              {plan.phases.map((phase, i) => {
                const dot = PHASE_DOT[phase.status];
                return (
                  <li key={phase.title} className="flex gap-5 px-6 py-4">
                    {/* Step indicator */}
                    <div className="flex flex-col items-center gap-1 pt-0.5">
                      <span
                        aria-label={dot.label}
                        className={`size-2.5 shrink-0 rounded-full ${dot.cls}`}
                      />
                      {i < plan.phases.length - 1 && (
                        <span className="w-px flex-1 bg-white/10" aria-hidden="true" />
                      )}
                    </div>
                    {/* Phase content */}
                    <div className="pb-4">
                      <h4 className="font-mono text-label text-regolith/70 uppercase">{phase.title}</h4>
                      <ul className="mt-2 space-y-1">
                        {phase.modules.map((mod) => (
                          <li key={mod} className="flex items-baseline gap-2 text-[0.875rem] text-white">
                            <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-earth mt-1.5" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
