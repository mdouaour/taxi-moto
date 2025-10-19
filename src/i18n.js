import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Taxi Moto',
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      selectRole: 'Select Your Role',
      rider: 'Rider',
      driver: 'Driver',
      continue: 'Continue',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      logout: 'Logout',
      bookARide: 'Book a Ride',
      destination: 'Destination',
      enterDestination: 'Enter destination',
      requestRide: 'Request Ride',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue à Taxi Moto',
      login: 'Connexion',
      signup: "S'inscrire",
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      selectRole: 'Sélectionnez votre rôle',
      rider: 'Passager',
      driver: 'Chauffeur',
      continue: 'Continuer',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      dontHaveAccount: "Vous n'avez pas de compte?",
      logout: 'Déconnexion',
      bookARide: 'Réserver une course',
      destination: 'Destination',
      enterDestination: 'Entrez la destination',
      requestRide: 'Demander une course',
    },
  },
  ar: {
    translation: {
      welcome: 'مرحبا بكم في تاكسي موتو',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      selectRole: 'اختر دورك',
      rider: 'راكب',
      driver: 'سائق',
      continue: 'متابعة',
      alreadyHaveAccount: 'هل لديك حساب؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      logout: 'تسجيل الخروج',
      bookARide: 'حجز رحلة',
      destination: 'الوجهة',
      enterDestination: 'أدخل الوجهة',
      requestRide: 'طلب رحلة',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
