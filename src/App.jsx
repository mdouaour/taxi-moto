import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RoleSelect from './pages/auth/RoleSelect';
import RiderDashboard from './pages/rider/RiderDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import LandingPage from './pages/auth/LandingPage';
import NavBar from './components/Navigation/NavBar';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { session, userRole, loading } = useAuth();

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
        <Route
          path="/admin-dashboard"
          element={session && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
