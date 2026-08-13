'use client';

import { useMemo, useRef, useState } from 'react';
import { plants, Plant } from '@/lib/plants';
import { useFavorites } from '@/hooks/use-favorites';
import { CatalogHeader } from '@/components/catalog-header';
import { CategoryFilters } from '@/components/category-filters';
import { HeroSection } from '@/components/hero-section';
import { PlantGrid } from '@/components/plant-grid';
import { PlantModal } from '@/components/plant-modal';
import { SpotlightSection } from '@/components/spotlight-section';

export default function Home() {
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('todas');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const catalogRef = useRef<HTMLElement>(null);

  const scrollToCatalog = () =>
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  const featuredPlants = useMemo(
    () =>
      ['monstera-deliciosa', 'alocasia-polly', 'lirio-da-paz']
        .map((id) => plants.find((p) => p.id === id))
        .filter((p): p is Plant => p !== undefined),
    []
  );

  const filteredPlants = useMemo(() => {
    let result = plants;

    if (showFavoritesOnly) {
      result = result.filter((plant) => favorites.includes(plant.id));
    }

    if (activeFilter !== 'todas') {
      if (activeFilter === 'facil-cuidado') {
        result = result.filter((plant) => plant.difficulty === 'Fácil');
      } else if (activeFilter === 'pet-friendly') {
        result = result.filter((plant) => plant.petFriendly);
      } else {
        result = result.filter((plant) => plant.category === activeFilter);
      }
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (plant) =>
          plant.name.toLowerCase().includes(query) ||
          plant.scientificName.toLowerCase().includes(query) ||
          plant.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [favorites, showFavoritesOnly, activeFilter, search]);

  const emptyMessage = showFavoritesOnly
    ? 'Você ainda não favoritou nenhuma planta. Toque no coração de qualquer card para adicioná-la ao seu jardim.'
    : 'Nenhuma planta encontrada com esses filtros. Tente buscar por outro nome ou trocar a categoria.';

  return (
    <div
      id="scroll-container"
      className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-none bg-neutral-950 text-white"
    >
      <CatalogHeader
        search={search}
        onSearchChange={setSearch}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
      />

      <HeroSection onExplore={scrollToCatalog} />

      {featuredPlants.map((plant, index) => (
        <SpotlightSection
          key={plant.id}
          plant={plant}
          index={index}
          onOpen={() => setSelectedPlant(plant)}
        />
      ))}

      <section
        ref={catalogRef}
        className="min-h-screen snap-start px-4 pb-20 pt-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              O Catálogo
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tighter text-white md:text-5xl">
              Todas as Espécies
            </h2>
          </div>

          <CategoryFilters active={activeFilter} onChange={setActiveFilter} />

          <div className="mt-6 mb-8 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              {isLoaded ? (
                <>
                  {filteredPlants.length}{' '}
                  {filteredPlants.length === 1
                    ? 'planta encontrada'
                    : 'plantas encontradas'}
                </>
              ) : (
                'Carregando catálogo...'
              )}
            </p>
            {showFavoritesOnly && (
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="text-sm text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Ver todas as plantas
              </button>
            )}
          </div>

          <PlantGrid
            plants={filteredPlants}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpen={setSelectedPlant}
            emptyMessage={emptyMessage}
          />
        </div>
      </section>

      <footer className="snap-start border-t border-neutral-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-2xl font-bold tracking-tighter text-white">Verde.</p>
        <p className="mt-3 text-sm text-neutral-500">
          Catálogo de plantas ornamentais
        </p>
        <p className="mt-1 text-xs text-neutral-600">
          Fotos via Pexels · Dados de cuidado para fins educativos
        </p>
      </footer>

      <PlantModal
        plant={selectedPlant}
        isFavorite={selectedPlant ? isFavorite(selectedPlant.id) : false}
        onToggleFavorite={() => selectedPlant && toggleFavorite(selectedPlant.id)}
        onClose={() => setSelectedPlant(null)}
      />
    </div>
  );
}
