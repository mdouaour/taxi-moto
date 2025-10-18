import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelect from './pages/RoleSelect';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            session ? <Navigate to="/role-select" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/role-select"
          element={session ? <RoleSelect /> : <Navigate to="/login" />}
        />
        <Route
          path="/rider-dashboard"
          element={session ? <RiderDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/driver-dashboard"
          element={session ? <DriverDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
