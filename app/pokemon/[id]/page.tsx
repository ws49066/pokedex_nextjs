'use client';

import { usePokemonDetail } from '@/app/hooks/usePokemon';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StatsDisplay from '@/app/components/StatsDisplay';
import { useLanguage } from '@/app/i18n/LanguageContext';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-blue-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-purple-700',
  dragon: 'bg-purple-600',
  dark: 'bg-gray-900',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

const getTypeColor = (type: string) => typeColors[type] || 'bg-gray-400';

export default function PokemonDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const { pokemon, loading, error } = usePokemonDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{t('error')}</p>
          <Link href="/" className="text-blue-600 hover:underline font-semibold">
            {t('back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:underline font-semibold mb-4 inline-flex items-center gap-2">
            {t('back')}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold capitalize text-gray-800 mt-2">
            {pokemon.name}
          </h1>
          <p className="text-gray-600 mt-2">#{String(pokemon.id).padStart(4, '0')}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="bg-white rounded-xl shadow-xl p-8 flex items-center justify-center fade-in">
            {pokemon.image && (
              <div className="relative w-full h-96">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100%"
                  priority
                />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Types */}
            <div className="bg-white rounded-xl shadow-lg p-6 fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🏷️ {t('types')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`${getTypeColor(
                      type
                    )} text-white font-bold px-4 py-2 rounded-full capitalize shadow-md hover:shadow-lg transform hover:scale-105 transition-all`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Physical Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 fade-in" style={{ animationDelay: '150ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📏 {t('physicalInfo')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="text-gray-600 text-sm font-semibold">{t('height')}</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{(pokemon.height / 10).toFixed(1)}m</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
                  <p className="text-gray-600 text-sm font-semibold">{t('weight')}</p>
                  <p className="text-3xl font-bold text-purple-600 mt-1">{(pokemon.weight / 10).toFixed(1)}kg</p>
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="bg-white rounded-xl shadow-lg p-6 fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ⚡ {t('abilities')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize border border-green-300"
                  >
                    {ability.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-xl p-8 mt-8 fade-in" style={{ animationDelay: '250ms' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            📊 {t('stats')}
          </h2>
          <StatsDisplay stats={pokemon.stats} />
        </div>
      </main>
    </div>
  );
}
