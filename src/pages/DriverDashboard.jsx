import { useTranslation } from 'react-i18next';

export default function DriverDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('welcome')} - {t('driver')}</h1>
      </nav>
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>
          <p>Driver interface coming in H3...</p>
        </div>
      </div>
    </div>
  );
}
