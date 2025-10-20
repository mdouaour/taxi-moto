import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Admin Sidebar will go here */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">{t('adminPanel')}</h2>
        {/* Navigation links will go here */}
        <ul>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:underline">{t('dashboard')}</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:underline">{t('driverManagement')}</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:underline">{t('riderManagement')}</a>
          </li>
          {/* More links */}
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">{t('adminDashboard')}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>{t('adminDashboardContent')}</p>
          {/* Real-time metrics and charts will go here */}
        </div>
      </main>
    </div>
  );
}
