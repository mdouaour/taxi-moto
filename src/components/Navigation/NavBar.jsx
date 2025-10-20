import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';

export default function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src={reactLogo} className="logo react w-8 h-8" alt="React logo" />
        <span className="text-xl font-bold text-blue-600">{t('appName')}</span>
      </Link>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        {session ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {t('logout')}
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {t('login')}
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {t('signup')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
