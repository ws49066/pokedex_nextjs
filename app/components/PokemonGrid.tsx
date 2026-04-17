'use client';

import { usePokemonList } from '@/app/hooks/usePokemon';
import PokemonCard from './PokemonCard';
import { LoadingGrid } from './Loading';

interface PokemonGridProps {
  limit?: number;
  offset?: number;
}

export default function PokemonGrid({ limit = 20, offset = 0 }: PokemonGridProps) {
  const { pokemon, loading, error } = usePokemonList({ limit, offset });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">❌ Erro ao carregar pokémon</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingGrid count={limit} />;
  }

  if (pokemon.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-600">Nenhum pokémon encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
