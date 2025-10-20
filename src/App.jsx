import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RoleSelect from './pages/auth/RoleSelect';
import RiderDashboard from './pages/rider/RiderDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import LandingPage from './pages/auth/LandingPage';
import NavBar from './components/Navigation/NavBar';

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
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            session ? <Navigate to="/role-select" /> : <LandingPage />
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
