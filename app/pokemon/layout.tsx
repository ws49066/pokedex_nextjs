import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalhes do Pokémon | Pokédex',
  description: 'Explore detalhes completos e estatísticas do Pokémon',
};

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
