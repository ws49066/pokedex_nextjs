import { Pokemon, PokemonListResponse, PokemonDetailResponse } from '@/app/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Cache for all pokemon names
let allPokemonCache: { name: string; url: string }[] | null = null;

export const fetchPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  return response.json();
};

export const fetchAllPokemonNames = async (): Promise<{ name: string; url: string }[]> => {
  if (allPokemonCache) {
    return allPokemonCache;
  }
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=10000&offset=0`);
  if (!response.ok) {
    throw new Error('Failed to fetch all pokemon');
  }
  const data = await response.json();
  allPokemonCache = data.results;
  return data.results;
};

export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  const allPokemon = await fetchAllPokemonNames();
  const lowerQuery = query.toLowerCase();

  // Filter by name or ID
  const filtered = allPokemon.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(lowerQuery);
    const idMatch = p.url.split('/').filter(Boolean).pop() === query;
    return nameMatch || idMatch;
  });

  // Limit to first 50 results to avoid too many requests
  const limited = filtered.slice(0, 50);

  // Fetch details for filtered pokemon
  const promises = limited.map((p) => fetchPokemonDetail(p.name));
  return Promise.all(promises);
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
