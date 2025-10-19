import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">{t('appName')}</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">{t('appSlogan')}</p>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Link
          to="/login"
          className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg"
        >
          {t('login')}
        </Link>
        <Link
          to="/signup"
          className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg"
        >
          {t('signup')}
        </Link>
      </div>

      <div className="mt-12 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold mb-4">{t('whyChooseUs')}</h2>
        <p className="text-lg mb-2">{t('feature1')}</p>
        <p className="text-lg mb-2">{t('feature2')}</p>
        <p className="text-lg">{t('feature3')}</p>
      </div>
    </div>
  );
}
