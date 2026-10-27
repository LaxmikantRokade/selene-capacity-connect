import {useState, type FormEvent} from 'react';
import {login, register, type AuthUser} from '../../auth/authStore';

interface Props {
  initialMode?: 'login' | 'register';
  onSuccess: (user: AuthUser) => void;
  onCancel: () => void;
}

type Mode = 'login' | 'register';

/** Shared with Chrome — inlined to avoid a cross-component import. */
function Crescent({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M15.5 3.2A9 9 0 1 0 20.8 16 7.2 7.2 0 0 1 15.5 3.2Z" fill="currentColor" />
    </svg>
  );
}

export function AuthPage({initialMode = 'login', onSuccess, onCancel}: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [error, setError] = useState('');

  const field =
    'w-full rounded-[4px] bg-white/[0.04] px-4 py-3.5 text-body text-white ring-1 ring-white/15 outline-none placeholder:text-regolith/40 focus:ring-earth transition-[box-shadow]';

  function switchMode(m: Mode) {
    setMode(m);
    setError('');
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);

    if (mode === 'register') {
      const name     = String(data.get('name'));
      const email    = String(data.get('email'));
      const password = String(data.get('password'));
      const confirm  = String(data.get('confirm'));
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }
      const result = register(name, email, password);
      if (result.error) { setError(result.error); return; }
      onSuccess(result.user!);
    } else {
      const email    = String(data.get('email'));
      const password = String(data.get('password'));
      const result = login(email, password);
      if (result.error) { setError(result.error); return; }
      onSuccess(result.user!);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-void">
      {/* Minimal header — same gutter and wordmark as the landing Header */}
      <header className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5 md:px-[3vw]">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-70"
          aria-label="Back to SELENE landing page"
        >
          <Crescent className="size-5" />
          <span className="font-display text-[0.9375rem] tracking-[0.36em]">SELENE</span>
        </button>
        <span className="font-mono text-label text-earth uppercase tracking-[0.14em]">
          Capacity Connect
        </span>
      </header>

      {/* Centred form card */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-[26rem]">
          {/* Mode toggle */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="mb-8 flex gap-1 rounded-[6px] bg-void-2 p-1"
          >
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={`flex-1 rounded-[4px] py-2.5 font-mono text-label uppercase transition-colors ${
                  mode === m
                    ? 'bg-earth text-void'
                    : 'text-regolith/60 hover:text-white'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-display text-[1.75rem] tracking-[0.08em] text-white uppercase">
              {mode === 'login' ? 'Welcome back.' : 'Join the mission.'}
            </h1>
            <p className="mt-2 text-body text-regolith/60">
              {mode === 'login'
                ? 'Sign in to your Capacity Connect account.'
                : 'Create your Capacity Connect account.'}
            </p>
          </div>

          {/* Form */}
          <form noValidate onSubmit={onSubmit} className="space-y-3" aria-describedby="auth-error">
            {mode === 'register' && (
              <label className="block" key="name-field">
                <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">
                  Full name
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="As it should appear on the manifest"
                  className={field}
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@earth.com"
                className={field}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={mode === 'register' ? 'Minimum 8 characters' : '••••••••'}
                className={field}
              />
            </label>

            {mode === 'register' && (
              <label className="block" key="confirm-field">
                <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">
                  Confirm password
                </span>
                <input
                  name="confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={field}
                />
              </label>
            )}

            {/* Error message */}
            <div id="auth-error" role="alert" aria-live="assertive" className="min-h-[2.5rem]">
              {error && (
                <p className="rounded-[4px] bg-red-950/50 px-4 py-3 text-[0.875rem] leading-snug text-red-300 ring-1 ring-red-400/30">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-[4px] bg-white px-5 py-4 font-mono text-label text-void uppercase transition-colors hover:bg-earth"
            >
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Security disclaimer */}
          <div className="mt-8 rounded-[6px] border border-white/10 bg-void-2 px-4 py-4">
            <p className="font-mono text-[0.625rem] leading-relaxed tracking-[0.1em] text-regolith/40 uppercase">
              Demo auth · Accounts stored in browser localStorage only — not a
              production-secure system.{' '}
              <a
                href="https://supabase.com/docs/guides/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth transition-colors hover:text-white"
              >
                See what real auth requires →
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
