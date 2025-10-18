import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = async () => {
    if (!selectedRole) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Store role in user metadata
      await supabase.auth.updateUser({
        data: { role: selectedRole },
      });

      // Navigate based on role
      if (selectedRole === 'rider') {
        navigate('/rider-dashboard');
      } else {
        navigate('/driver-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t('selectRole')}
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => setSelectedRole('rider')}
            className={`w-full p-6 rounded-lg border-2 transition ${
              selectedRole === 'rider'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="text-4xl mb-2">🏍️</div>
            <div className="text-xl font-semibold">{t('rider')}</div>
          </button>
          <button
            onClick={() => setSelectedRole('driver')}
            className={`w-full p-6 rounded-lg border-2 transition ${
              selectedRole === 'driver'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="text-4xl mb-2">🏁</div>
            <div className="text-xl font-semibold">{t('driver')}</div>
          </button>
        </div>
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full mt-6 py-3 rounded transition ${
            selectedRole
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
}
