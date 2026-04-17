'use client';

import InfiniteScrollGrid from './components/InfiniteScrollGrid';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './i18n/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
          {/* Top Row: Language Selector */}
          <div className="flex justify-end mb-4 absolute top-4 right-4">
            <LanguageSelector />
          </div>

          {/* Title and Subtitle */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl">🎮</span>
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <span className="text-3xl sm:text-4xl">⚡</span>
          </div>
          <p className="text-center text-gray-600 text-sm sm:text-base mt-2">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <InfiniteScrollGrid initialLimit={20} />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>{t('developedWith')}</p>
          <p className="mt-2">{t('dataFrom')} <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PokéAPI</a></p>
        </div>
      </footer>
    </div>
  );
}
