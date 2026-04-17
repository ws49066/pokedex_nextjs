'use client';

import { useState, useMemo } from 'react';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { LoadingGrid } from './Loading';
import { usePokemonList } from '@/app/hooks/usePokemon';

interface PokemonGridWithSearchProps {
  limit?: number;
  offset?: number;
}

export default function PokemonGridWithSearch({ limit = 20, offset = 0 }: PokemonGridWithSearchProps) {
  const { pokemon, loading, error } = usePokemonList({ limit, offset });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery);

      const matchesType = selectedType === '' || p.types.includes(selectedType);

      return matchesSearch && matchesType;
    });
  }, [pokemon, searchQuery, selectedType]);

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
    return (
      <>
        <SearchBar onSearch={setSearchQuery} onTypeFilter={setSelectedType} />
        <LoadingGrid count={limit} />
      </>
    );
  }

  return (
    <>
      <SearchBar onSearch={setSearchQuery} onTypeFilter={setSelectedType} />

      {pokemon.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-600">Nenhum pokémon encontrado</p>
        </div>
      ) : filteredPokemon.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <p className="text-gray-600 mb-2">😅 Nenhum pokémon encontrado com esses filtros</p>
            <p className="text-sm text-gray-500">
              Busca: "{searchQuery}" | Tipo: {selectedType || 'Todos'}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Mostrando <span className="font-bold">{filteredPokemon.length}</span> de{' '}
            <span className="font-bold">{pokemon.length}</span> pokémon
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
