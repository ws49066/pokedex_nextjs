'use client';

import { useEffect, useState } from 'react';
import { Pokemon } from '@/app/types/pokemon';
import { fetchPokemonList, fetchPokemonDetail } from '@/app/services/pokemonService';

interface UsePokemonListOptions {
  limit?: number;
  offset?: number;
}

export const usePokemonList = (options: UsePokemonListOptions = {}) => {
  const { limit = 20, offset = 0 } = options;
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const listResponse = await fetchPokemonList(limit, offset);
        
        // Fetch details for each pokemon
        const pokemonNames = listResponse.results.map(p => p.name);
        const pokemonDetails = await Promise.all(
          pokemonNames.map(name => fetchPokemonDetail(name))
        );
        
        setPokemon(pokemonDetails);
        setHasMore(!!listResponse.next);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [limit, offset]);

  return { pokemon, loading, error, hasMore };
};

export const usePokemonDetail = (nameOrId: string | number | null) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) {
      setPokemon(null);
      return;
    }

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonDetail(nameOrId);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [nameOrId]);

  return { pokemon, loading, error };
};
