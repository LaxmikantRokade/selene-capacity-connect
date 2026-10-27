import {useState} from 'react';
import type {AuthUser} from '../../auth/authStore';
import {Assessments} from './views/Assessments';
import {Courses} from './views/Courses';
import {LearningHub} from './views/LearningHub';
import {LearningPlans} from './views/LearningPlans';
import {MyProgress} from './views/MyProgress';

interface Props {
  user: AuthUser;
  onLogout: () => void;
}

type DashView = 'hub' | 'courses' | 'assessments' | 'progress' | 'plans';

interface NavItem {
  id: DashView;
  label: string;
  mark: string;
}

const NAV_ITEMS: NavItem[] = [
  {id: 'hub',         label: 'Learning Hub',   mark: '◈'},
  {id: 'courses',     label: 'Courses',         mark: '◇'},
  {id: 'assessments', label: 'Assessments',     mark: '✦'},
  {id: 'progress',    label: 'My Progress',     mark: '◉'},
  {id: 'plans',       label: 'Learning Plans',  mark: '≡'},
];

/** Crescent mark — inlined to avoid cross-tree imports. */
function Crescent({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M15.5 3.2A9 9 0 1 0 20.8 16 7.2 7.2 0 0 1 15.5 3.2Z" fill="currentColor" />
    </svg>
  );
}

export function Dashboard({user, onLogout}: Props) {
  const [view, setView]         = useState<DashView>('hub');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function navigate(id: DashView) {
    setView(id);
    setSidebarOpen(false);
  }

  function renderView() {
    // key forces remount (and re-animation) on every view switch
    switch (view) {
      case 'hub':         return <LearningHub     key="hub"         user={user} onNavigate={navigate} />;
      case 'courses':     return <Courses         key="courses"     />;
      case 'assessments': return <Assessments     key="assessments" />;
      case 'progress':    return <MyProgress      key="progress"    />;
      case 'plans':       return <LearningPlans   key="plans"       />;
    }
  }

  const sidebarBase =
    'fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-void-2 border-r border-white/10 transition-transform duration-300 ease-in-out';
  const sidebarMobile = sidebarOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <div className="flex h-screen overflow-hidden bg-void">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-void/70 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        className={`${sidebarBase} ${sidebarMobile} md:relative md:translate-x-0 md:transition-none md:flex-shrink-0`}
        aria-label="Dashboard navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <Crescent className="size-4 text-white" />
          <div>
            <span className="block font-display text-[0.75rem] tracking-[0.36em] text-white uppercase">
              Selene
            </span>
            <span className="block font-mono text-[0.5625rem] tracking-[0.18em] text-earth uppercase">
              Capacity Connect
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav aria-label="Dashboard sections" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = view === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigate(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex w-full items-center gap-3 rounded-[4px] px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'bg-earth/15 text-earth'
                        : 'text-regolith/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-4 text-center font-mono text-[0.875rem]"
                    >
                      {item.mark}
                    </span>
                    <span className="font-mono text-label uppercase">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User + logout */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="mb-3">
            <p className="font-mono text-label text-white uppercase truncate">{user.name}</p>
            <p className="mt-0.5 font-mono text-[0.625rem] tracking-[0.1em] text-regolith/40 uppercase truncate">
              {user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-[4px] px-3 py-2.5 font-mono text-label text-regolith/50 uppercase ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto" id="main-content">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-4 border-b border-white/10 bg-void px-4 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
            className="flex size-8 items-center justify-center rounded-[4px] font-mono text-[1rem] text-regolith/70 hover:text-white"
          >
            ☰
          </button>
          <span className="font-mono text-label text-earth uppercase tracking-[0.14em]">
            Capacity Connect
          </span>
          <div className="ml-auto">
            <Crescent className="size-4 text-white/40" />
          </div>
        </div>

        {/* Page content with consistent padding */}
        <div className="flex-1 px-4 py-8 sm:px-6 md:px-8 md:py-10">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
