import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const { t } = useTranslation();

  const navLinks = [
    { path: '/admin-dashboard', label: t('dashboard') },
    { path: '/admin-dashboard/driver-management', label: t('driverManagement') },
    { path: '/admin-dashboard/rider-management', label: t('riderManagement') },
    { path: '/admin-dashboard/ride-monitoring', label: t('rideMonitoring') }, // New translation key
    { path: '/admin-dashboard/earnings-report', label: t('earningsReport') }, // New translation key
    { path: '/admin-dashboard/complaints-management', label: t('complaintsManagement') }, // New translation key
    { path: '/admin-dashboard/promo-codes', label: t('promoCodes') }, // New translation key
    { path: '/admin-dashboard/settings', label: t('settings') }, // New translation key
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6">{t('adminPanel')}</h2>
      <ul>
        {navLinks.map((link) => (
          <li key={link.path} className="mb-2">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors duration-200 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
