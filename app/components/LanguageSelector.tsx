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
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all text-sm font-semibold ${
            language === lang.code
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={lang.name}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
