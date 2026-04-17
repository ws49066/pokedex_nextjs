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
    <div className="flex gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
            language === lang.code
              ? 'ring-4 ring-blue-500 shadow-lg scale-110'
              : 'hover:scale-105 opacity-70 hover:opacity-100'
          }`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
