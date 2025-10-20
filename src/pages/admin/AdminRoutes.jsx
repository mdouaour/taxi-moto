import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      {/* Define sub-routes for admin sections here */}
      {/* <Route path="/driver-management" element={<DriverManagement />} /> */}
      {/* <Route path="/rider-management" element={<RiderManagement />} /> */}
      {/* ... other admin routes */}
    </Routes>
  );
}
