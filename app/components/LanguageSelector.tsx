'use client';

import { useLanguage } from '@/app/i18n/LanguageContext';
import { Language } from '@/app/i18n/translations';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all duration-300 border-2 ${\n            language === lang.code
              ? 'border-blue-600 bg-blue-50 shadow-lg scale-110'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:scale-105'
          }`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
