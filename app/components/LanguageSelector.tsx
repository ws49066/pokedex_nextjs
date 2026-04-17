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
    <div className="flex items-center gap-1 sm:gap-2">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
              isActive
                ? `bg-gradient-to-br ${lang.color} text-white shadow-lg scale-110 border-2 border-white`
                : `bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400 hover:scale-105`
            }`}
            title={lang.name}
            aria-label={lang.name}
          >
            {isActive ? lang.label : lang.label}
          </button>
        );
      })}
    </div>
  );
}
