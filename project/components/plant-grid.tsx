'use client';

import { Leaf } from 'lucide-react';
import { Plant } from '@/lib/plants';
import { PlantCard } from '@/components/plant-card';

interface PlantGridProps {
  plants: Plant[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpen: (plant: Plant) => void;
  emptyMessage: string;
}

export function PlantGrid({
  plants,
  favorites,
  onToggleFavorite,
  onOpen,
  emptyMessage,
}: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/50 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-600">
          <Leaf className="h-6 w-6" />
        </span>
        <p className="max-w-sm text-sm text-neutral-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {plants.map((plant, index) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          index={index}
          isFavorite={favorites.includes(plant.id)}
          onToggleFavorite={() => onToggleFavorite(plant.id)}
          onOpen={() => onOpen(plant)}
        />
      ))}
    </div>
  );
}
