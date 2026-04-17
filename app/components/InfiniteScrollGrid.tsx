'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Pokemon, PokemonListResponse } from '@/app/types/pokemon';
import { fetchPokemonList, fetchPokemonDetail } from '@/app/services/pokemonService';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { LoadingCard } from './Loading';
import { useLanguage } from '@/app/i18n/LanguageContext';

interface InfiniteScrollGridProps {
  initialLimit?: number;
}

export default function InfiniteScrollGrid({ initialLimit = 20 }: InfiniteScrollGridProps) {
  const { t } = useLanguage();
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  // Initial load
  useEffect(() => {
    const loadInitialPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const listResponse = await fetchPokemonList(initialLimit, 0);

        const pokemonNames = listResponse.results.map((p) => p.name);
        const pokemonDetails = await Promise.all(
          pokemonNames.map((name) => fetchPokemonDetail(name))
        );

        setAllPokemon(pokemonDetails);
        setHasMore(!!listResponse.next);
        offsetRef.current = initialLimit;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadInitialPokemon();
  }, [initialLimit]);

  // Load more pokemon
  const loadMorePokemon = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const listResponse = await fetchPokemonList(initialLimit, offsetRef.current);

      const pokemonNames = listResponse.results.map((p) => p.name);
      const pokemonDetails = await Promise.all(
        pokemonNames.map((name) => fetchPokemonDetail(name))
      );

      setAllPokemon((prev) => [...prev, ...pokemonDetails]);
      setHasMore(!!listResponse.next);
      offsetRef.current += initialLimit;
    } catch (err) {
      console.error('Error loading more pokemon:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [initialLimit, hasMore, loadingMore]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMorePokemon();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, loadMorePokemon]);

  // Filter pokemon
  const filteredPokemon = allPokemon.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toString().includes(searchQuery);

    const matchesType = selectedType === '' || p.types.includes(selectedType);

    return matchesSearch && matchesType;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">{t('error')}</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SearchBar onSearch={setSearchQuery} onTypeFilter={setSelectedType} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: initialLimit }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : filteredPokemon.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <p className="text-gray-600 mb-2">😅 {t('noResults')}</p>
            {searchQuery || selectedType ? (
              <p className="text-sm text-gray-500">
                {t('search')}: "{searchQuery}" | {t('filterByType')}: {selectedType || 'Todos'}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            {t('showing')} <span className="font-bold">{filteredPokemon.length}</span> {t('pokemon')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          {/* Loading indicator for infinite scroll */}
          {loadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingCard key={`loading-${i}`} />
              ))}
            </div>
          )}

          {/* Intersection observer target */}
          <div ref={observerTarget} className="py-8 text-center">
            {hasMore && !loadingMore && (
              <button
                onClick={loadMorePokemon}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                {t('showMore')}
              </button>
            )}
            {!hasMore && filteredPokemon.length > 0 && (
              <p className="text-gray-600">{t('allLoaded')}</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
