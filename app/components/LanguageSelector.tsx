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
    <>
      {/* Mobile: Select Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="md:hidden px-2 py-1.5 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-semibold text-xs cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Selecionar idioma"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Desktop: Button Circles */}
      <div className="hidden md:flex items-center justify-center gap-1.5">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 active:scale-95 ${
                isActive
                  ? `bg-gradient-to-br ${lang.color} text-white shadow-lg scale-105 border-2 border-white drop-shadow-md`
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
    </>
  );
}
