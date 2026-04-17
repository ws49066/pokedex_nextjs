import { Pokemon, PokemonListResponse, PokemonDetailResponse } from '@/app/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  return response.json();
};

export const fetchPokemonDetail = async (nameOrId: string | number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon: ${nameOrId}`);
  }

  const data: PokemonDetailResponse = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || '',
    types: data.types.map(t => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name),
    stats: data.stats.map(s => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
};

export const fetchMultiplePokemon = async (names: string[]): Promise<Pokemon[]> => {
  const promises = names.map(name => fetchPokemonDetail(name));
  return Promise.all(promises);
};
