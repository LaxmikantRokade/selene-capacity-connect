import {useState} from 'react';

type AssessmentStatus = 'completed' | 'available' | 'locked';

interface Assessment {
  id: number;
  title: string;
  course: string;
  status: AssessmentStatus;
  score: number | null;
  date: string | null;
  duration: string;
  questions: number;
}

const ASSESSMENTS: Assessment[] = [
  {
    id: 1,
    title: 'Comms Fundamentals Quiz',
    course: 'Lunar Comms Fundamentals',
    status: 'completed',
    score: 87,
    date: '15 Oct 2026',
    duration: '30 min',
    questions: 25,
  },
  {
    id: 2,
    title: 'Signal Processing Exam',
    course: 'Signal Processing in Deep Space',
    status: 'completed',
    score: 94,
    date: '22 Oct 2026',
    duration: '45 min',
    questions: 40,
  },
  {
    id: 3,
    title: 'Uplink Protocol Assessment',
    course: 'Uplink Engineering',
    status: 'available',
    score: null,
    date: null,
    duration: '40 min',
    questions: 35,
  },
  {
    id: 4,
    title: 'Mid-Programme Review',
    course: 'All modules',
    status: 'locked',
    score: null,
    date: null,
    duration: '60 min',
    questions: 60,
  },
];

const STATUS_BADGE: Record<AssessmentStatus, {label: string; cls: string}> = {
  completed: {label: 'Completed', cls: 'text-sunlit bg-sunlit/10'},
  available: {label: 'Available', cls: 'text-earth bg-earth/15'},
  locked:    {label: 'Locked',    cls: 'text-regolith/40 bg-white/5'},
};

export function Assessments() {
  const [items, setItems] = useState<Assessment[]>(ASSESSMENTS);
  const [activeModal, setActiveModal] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const completed = items.filter((a) => a.status === 'completed');
  const avgScore = completed.length
    ? Math.round(
        completed.reduce((acc, cur) => acc + (cur.score ?? 0), 0) / completed.length,
      )
    : 0;

  const summary = [
    {label: 'Taken', value: String(completed.length)},
    {label: 'Avg score', value: `${avgScore} %`},
    {label: 'Available', value: String(items.filter((a) => a.status === 'available').length)},
    {label: 'Locked', value: String(items.filter((a) => a.status === 'locked').length)},
  ];

  const handleStart = (a: Assessment) => {
    setActiveModal(a);
    setAnswers({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModal) return;

    let score = 70;
    if (answers[1] === 'BPSK with Turbo Coding') score += 15;
    if (answers[2] === '~1.28 seconds') score += 15;

    setItems((prev) =>
      prev.map((item) =>
        item.id === activeModal.id
          ? {
              ...item,
              status: 'completed',
              score,
              date: 'Just now',
            }
          : item,
      ),
    );
    setActiveModal(null);
  };

  return (
    <div className="animate-[leg-in_0.45s_cubic-bezier(0.2,0.7,0.1,1)] space-y-8">
      <div>
        <p className="font-mono text-label text-earth uppercase">Assessments</p>
        <h2 className="mt-3 font-display text-[1.75rem] tracking-[0.06em] text-white uppercase">
          Track your scores.
        </h2>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="brackets rounded-[6px] bg-void-2 px-4 py-4 text-white/20 ring-1 ring-white/8"
          >
            <span className="block font-display text-[2rem] leading-none text-white tabular-nums">
              {s.value}
            </span>
            <span className="mt-1 block font-mono text-label text-regolith/50 uppercase">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Assessment list */}
      <div>
        <p className="mb-4 font-mono text-label text-regolith/50 uppercase">All assessments</p>
        <ol className="divide-y divide-white/8 rounded-[8px] bg-void-2 ring-1 ring-white/10">
          {items.map((a) => {
            const badge = STATUS_BADGE[a.status];
            return (
              <li key={a.id} className="grid gap-4 px-5 py-5 sm:grid-cols-[1fr_auto]">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-[0.9375rem] tracking-[0.08em] text-white uppercase">
                      {a.title}
                    </h3>
                    <span
                      className={`rounded-[3px] px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-[0.8125rem] text-regolith/55">{a.course}</p>
                  <p className="font-mono text-[0.625rem] tracking-[0.1em] text-regolith/40 uppercase">
                    {a.questions} questions · {a.duration}
                    {a.date ? ` · Taken ${a.date}` : ''}
                  </p>
                </div>

                {/* Score / action */}
                <div className="flex items-center gap-4 sm:justify-end">
                  {a.status === 'completed' && a.score !== null && (
                    <div className="text-right">
                      <span className="block font-display text-[2rem] leading-none text-white tabular-nums">
                        {a.score}
                      </span>
                      <span className="font-mono text-label text-earth uppercase">/ 100</span>
                    </div>
                  )}
                  {a.status === 'available' && (
                    <button
                      type="button"
                      onClick={() => handleStart(a)}
                      className="rounded-[4px] bg-earth px-4 py-2.5 font-mono text-label text-void uppercase transition-colors hover:bg-white"
                    >
                      Start
                    </button>
                  )}
                  {a.status === 'locked' && (
                    <span className="font-mono text-label text-regolith/30 uppercase">Locked ·</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Interactive Assessment Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-lg rounded-[8px] border border-white/10 bg-void-2 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase">
                  Flight Readiness Exam
                </span>
                <h3 id="modal-title" className="mt-1 font-display text-[1.125rem] text-white uppercase">
                  {activeModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="font-mono text-label text-regolith/50 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <p className="text-[0.875rem] text-white">
                  1. Which modulation standard is specified for deep-space lunar orbital telemetry?
                </p>
                <div className="mt-2.5 space-y-2">
                  {['BPSK with Turbo Coding', 'Uncoded QAM-64', 'FSK Legacy'].map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-[4px] bg-white/5 p-3 text-[0.8125rem] text-regolith/80 hover:bg-white/10"
                    >
                      <input
                        type="radio"
                        name="q1"
                        required
                        value={opt}
                        onChange={() => setAnswers((prev) => ({...prev, 1: opt}))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[0.875rem] text-white">
                  2. What is the one-way line-of-sight propagation delay to Mare Tranquillitatis?
                </p>
                <div className="mt-2.5 space-y-2">
                  {['~1.28 seconds', '~12.8 seconds', '~0.12 seconds'].map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-[4px] bg-white/5 p-3 text-[0.8125rem] text-regolith/80 hover:bg-white/10"
                    >
                      <input
                        type="radio"
                        name="q2"
                        required
                        value={opt}
                        onChange={() => setAnswers((prev) => ({...prev, 2: opt}))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 rounded-[4px] bg-earth py-3 font-mono text-label text-void uppercase transition-colors hover:bg-white"
                >
                  Submit & Record Score
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-[4px] px-4 py-3 font-mono text-label text-regolith/60 uppercase ring-1 ring-white/10 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
