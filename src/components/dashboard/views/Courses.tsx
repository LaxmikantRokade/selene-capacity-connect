import {useState} from 'react';

type Status = 'in-progress' | 'completed' | 'not-started';
type Filter  = 'all' | 'in-progress' | 'completed';

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  modules: number;
  duration: string;
  status: Status;
  description: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: 'Lunar Comms Fundamentals',
    category: 'Foundation',
    progress: 72,
    modules: 8,
    duration: '4 h 30 m',
    status: 'in-progress',
    description: 'Radio propagation, link budgets, and the basics of Earth–Moon communications.',
  },
  {
    id: 2,
    title: 'Signal Processing in Deep Space',
    category: 'Advanced',
    progress: 100,
    modules: 12,
    duration: '6 h 15 m',
    status: 'completed',
    description: 'DSP fundamentals, noise modelling, and real-time decoding at 384,400 km.',
  },
  {
    id: 3,
    title: 'Uplink Engineering',
    category: 'Core',
    progress: 35,
    modules: 10,
    duration: '5 h 00 m',
    status: 'in-progress',
    description: 'Power amplifiers, antenna selection, and uplink scheduling for Relay and above.',
  },
  {
    id: 4,
    title: 'Earthrise Data Protocols',
    category: 'Advanced',
    progress: 0,
    modules: 9,
    duration: '4 h 45 m',
    status: 'not-started',
    description: 'CCSDS framing, forward error correction, and the Earthrise feed pipeline.',
  },
  {
    id: 5,
    title: 'Ground Station Operations',
    category: 'Intermediate',
    progress: 0,
    modules: 7,
    duration: '3 h 30 m',
    status: 'not-started',
    description: 'Tracking mounts, software-defined radio, and handover between ground stations.',
  },
  {
    id: 6,
    title: 'Mission Control Integration',
    category: 'Expert',
    progress: 0,
    modules: 14,
    duration: '7 h 00 m',
    status: 'not-started',
    description: 'End-to-end integration: from the crew headset to your dashboard in real time.',
  },
];

const STATUS_LABEL: Record<Status, string> = {
  'in-progress': 'In progress',
  completed: 'Completed',
  'not-started': 'Not started',
};

const STATUS_COLOR: Record<Status, string> = {
  'in-progress': 'text-earth bg-earth/15',
  completed: 'text-sunlit bg-sunlit/10',
  'not-started': 'text-regolith/50 bg-white/5',
};

const FILTERS: {id: Filter; label: string}[] = [
  {id: 'all', label: 'All courses'},
  {id: 'in-progress', label: 'In progress'},
  {id: 'completed', label: 'Completed'},
];

export function Courses() {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [filter, setFilter] = useState<Filter>('all');

  const advanceCourse = (id: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.status === 'not-started') {
          return {...c, status: 'in-progress', progress: 15};
        }
        if (c.status === 'in-progress') {
          const next = Math.min(100, c.progress + 25);
          return {
            ...c,
            progress: next,
            status: next >= 100 ? 'completed' : 'in-progress',
          };
        }
        return c;
      }),
    );
  };

  const visible = filter === 'all' ? courses : courses.filter((c) => c.status === filter);

  return (
    <div className="animate-[leg-in_0.45s_cubic-bezier(0.2,0.7,0.1,1)] space-y-8">
      <div>
        <p className="font-mono text-label text-earth uppercase">Courses</p>
        <h2 className="mt-3 font-display text-[1.75rem] tracking-[0.06em] text-white uppercase">
          Your course catalogue.
        </h2>
      </div>

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter courses"
        className="flex gap-2 border-b border-white/10 pb-0"
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`-mb-px border-b-[1.5px] pb-3 font-mono text-label uppercase transition-colors ${
              filter === f.id
                ? 'border-earth text-earth'
                : 'border-transparent text-regolith/50 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Course cards */}
      {visible.length === 0 ? (
        <p className="py-12 text-center text-body text-regolith/40">No courses match this filter.</p>
      ) : (
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <li
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-[8px] bg-void-2 ring-1 ring-white/10 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:ring-earth/30"
            >
              {/* Category bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-earth/60 to-transparent" />

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase">
                      {c.category}
                    </span>
                    <h3 className="mt-1 font-display text-[0.9375rem] tracking-[0.08em] text-white uppercase">
                      {c.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-[3px] px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${STATUS_COLOR[c.status]}`}
                  >
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>

                <p className="text-[0.875rem] leading-relaxed text-regolith/60">{c.description}</p>

                {/* Progress */}
                <div className="mt-auto">
                  {c.status !== 'not-started' && (
                    <div className="mb-3">
                      <div className="h-px w-full bg-white/10">
                        <div
                          className="h-full bg-earth"
                          style={{width: `${c.progress}%`}}
                        />
                      </div>
                      <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.1em] text-regolith/50 uppercase">
                        {c.progress} % complete
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.1em] text-regolith/40 uppercase">
                      {c.modules} modules · {c.duration}
                    </span>
                    {c.status === 'not-started' && (
                      <button
                        type="button"
                        onClick={() => advanceCourse(c.id)}
                        className="rounded-[3px] bg-white/10 px-2 py-1 font-mono text-label text-white uppercase transition-colors hover:bg-earth hover:text-void"
                      >
                        Start →
                      </button>
                    )}
                    {c.status === 'in-progress' && (
                      <button
                        type="button"
                        onClick={() => advanceCourse(c.id)}
                        className="rounded-[3px] bg-earth/20 px-2 py-1 font-mono text-label text-earth uppercase transition-colors hover:bg-earth hover:text-void"
                      >
                        Continue →
                      </button>
                    )}
                    {c.status === 'completed' && (
                      <span className="font-mono text-label text-sunlit uppercase">✦ Done</span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
