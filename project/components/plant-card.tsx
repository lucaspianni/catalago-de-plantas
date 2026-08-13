'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, PawPrint } from 'lucide-react';
import { Plant } from '@/lib/plants';
import { cn } from '@/lib/utils';

const difficultyColor: Record<Plant['difficulty'], string> = {
  Fácil: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30',
  Médio: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
  Difícil: 'text-rose-300 bg-rose-500/15 border-rose-400/30',
};

interface PlantCardProps {
  plant: Plant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
  index: number;
}

export function PlantCard({ plant, isFavorite, onToggleFavorite, onOpen, index }: PlantCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 text-left transition-all duration-300 hover:scale-[1.01] hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={plant.image}
          alt={plant.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
            {plant.category}
          </span>
          {plant.petFriendly && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
              <PawPrint className="h-3 w-3" />
            </span>
          )}
        </div>

        <span
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          role="button"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white/80'
            )}
          />
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold leading-tight text-white">{plant.name}</h3>
          <p className="mt-0.5 text-sm italic text-neutral-400">{plant.scientificName}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[11px] font-medium',
              difficultyColor[plant.difficulty]
            )}
          >
            {plant.difficulty}
          </span>
          {plant.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-[11px] text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-400">
          {plant.description}
        </p>
      </div>
    </motion.button>
  );
}
