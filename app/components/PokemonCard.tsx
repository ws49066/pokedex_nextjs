'use client';

import { Pokemon } from '@/app/types/pokemon';
import Link from 'next/link';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

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

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const getTypeColor = (type: string) => typeColors[type] || 'bg-gray-400';

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <h3 className="text-white font-bold text-lg capitalize truncate">
            {pokemon.name}
          </h3>
          <p className="text-blue-100 text-sm">#{String(pokemon.id).padStart(4, '0')}</p>
        </div>

        {/* Image Container */}
        <div className="w-full h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center p-4">
          {pokemon.image && (
            <div className="relative w-40 h-40">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 100px, 160px"
                priority={false}
              />
            </div>
          )}
        </div>

        {/* Types */}
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`${getTypeColor(
                type
              )} text-white text-xs font-bold px-3 py-1 rounded-full capitalize`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Stats Preview */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600 text-xs">Altura</p>
              <p className="font-bold text-gray-800">{(pokemon.height / 10).toFixed(1)}m</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600 text-xs">Peso</p>
              <p className="font-bold text-gray-800">{(pokemon.weight / 10).toFixed(1)}kg</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
