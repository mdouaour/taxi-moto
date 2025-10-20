import React from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/Navigation/Sidebar';

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

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
