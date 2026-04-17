'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/i18n/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTypeFilter: (type: string) => void;
}

const pokemonTypes = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400 hover:bg-gray-500',
  fire: 'bg-red-500 hover:bg-red-600',
  water: 'bg-blue-500 hover:bg-blue-600',
  grass: 'bg-green-500 hover:bg-green-600',
  electric: 'bg-yellow-400 hover:bg-yellow-500',
  ice: 'bg-blue-200 hover:bg-blue-300',
  fighting: 'bg-red-700 hover:bg-red-800',
  poison: 'bg-purple-500 hover:bg-purple-600',
  ground: 'bg-yellow-600 hover:bg-yellow-700',
  flying: 'bg-blue-300 hover:bg-blue-400',
  psychic: 'bg-pink-500 hover:bg-pink-600',
  bug: 'bg-green-600 hover:bg-green-700',
  rock: 'bg-gray-600 hover:bg-gray-700',
  ghost: 'bg-purple-700 hover:bg-purple-800',
  dragon: 'bg-purple-600 hover:bg-purple-700',
  dark: 'bg-gray-900 hover:bg-black',
  steel: 'bg-gray-500 hover:bg-gray-600',
  fairy: 'bg-pink-400 hover:bg-pink-500',
};

export default function SearchBar({ onSearch, onTypeFilter }: SearchBarProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleTypeFilter = (type: string) => {
    const newType = selectedType === type ? '' : type;
    setSelectedType(newType);
    onTypeFilter(newType);
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Search Input */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-3">
          🔍 {t('search')}
        </label>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-3">
          ⚡ {t('filterByType')}
        </label>
        <div className="flex flex-wrap gap-2">
          {pokemonTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`${
                typeColors[type]
              } text-white font-bold px-3 py-1 rounded-full capitalize text-sm transition-all ${
                selectedType === type ? 'ring-2 ring-offset-2 ring-offset-white' : 'opacity-70'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
