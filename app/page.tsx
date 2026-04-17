'use client';

import InfiniteScrollGrid from './components/InfiniteScrollGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">🎮</span>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pokédex
            </h1>
            <span className="text-4xl">⚡</span>
          </div>
          <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
            Explore o mundo dos Pokémon com um design moderno e responsivo
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
          <p>Desenvolvido com ❤️ usando Next.js, React e Tailwind CSS</p>
          <p className="mt-2">Dados da <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PokéAPI</a></p>
        </div>
      </footer>
    </div>
  );
}
