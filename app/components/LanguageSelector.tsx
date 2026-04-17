'use client';

import { useLanguage } from '@/app/i18n/LanguageContext';
import { Language } from '@/app/i18n/translations';

const languages: { code: Language; name: string; label: string; color: string }[] = [
  { code: 'en', name: 'English', label: 'EN', color: 'from-blue-500 to-blue-600' },
  { code: 'pt', name: 'Português', label: 'PT', color: 'from-green-500 to-green-600' },
  { code: 'it', name: 'Italiano', label: 'IT', color: 'from-red-500 to-red-600' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-2.5 flex-wrap">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-full flex items-center justify-center font-bold text-xs sm:text-xs md:text-sm transition-all duration-300 active:scale-95 ${
              isActive
                ? `bg-gradient-to-br ${lang.color} text-white shadow-lg scale-110 border-2 border-white drop-shadow-md`
                : `bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400 hover:scale-105 cursor-pointer`
            }`}
            title={lang.name}
            aria-label={lang.name}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
