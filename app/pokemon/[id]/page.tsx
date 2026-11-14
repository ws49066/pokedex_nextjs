import PokemonDetailClient from './PokemonDetailClient';

// Exportação estática: gera uma página para cada Pokémon (1 a 1025).
export function generateStaticParams() {
  return Array.from({ length: 1025 }, (_, i) => ({ id: String(i + 1) }));
}

export default function Page() {
  return <PokemonDetailClient />;
}
