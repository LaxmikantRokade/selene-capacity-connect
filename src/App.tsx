import {useEffect, useState} from 'react';
import {getSession, logout, type AuthUser} from './auth/authStore';
import {AuthPage} from './components/auth/AuthPage';
import {Footer, Header} from './components/Chrome';
import {Capacity} from './components/Capacity';
import {Dashboard} from './components/dashboard/Dashboard';
import {Earthrise} from './components/Earthrise';
import {MissionLog} from './components/MissionLog';
import {Trajectory} from './components/Trajectory';
import {useReducedMotion} from './hooks/useReducedMotion';
import {startScroll} from './lib/scroll';

type View = 'landing' | 'auth' | 'dashboard';

export default function App() {
  const reduced = useReducedMotion();

  const [view, setView] = useState<View>(() =>
    getSession() ? 'dashboard' : 'landing',
  );
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<AuthUser | null>(() => getSession());

  // Lenis smooth-scroll only runs while the landing page is active.
  // Cleanup fires automatically when view changes away from 'landing'.
  useEffect(() => {
    if (view !== 'landing') return;
    return startScroll(reduced);
  }, [reduced, view]);

  const handleAuthSuccess = (u: AuthUser) => {
    setUser(u);
    setView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    window.scrollTo(0, 0);
    setView('landing');
  };

  if (view === 'auth') {
    return (
      <AuthPage
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
        onCancel={() => setView('landing')}
      />
    );
  }

  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      <Header
        onSignIn={(mode) => {
          setAuthMode(mode || 'login');
          setView('auth');
        }}
      />
      <main>
        <Earthrise />
        <MissionLog />
        <Trajectory />
        <Capacity
          onGetStarted={() => {
            setAuthMode('register');
            setView('auth');
          }}
        />
      </main>
      <Footer />
    </>
  );
}
