'use client';

import { Heart, Leaf, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CatalogHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

export function CatalogHeader({
  search,
  onSearchChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
}: CatalogHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-6 md:py-5 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Verde.</span>
        </div>

        <div className="relative flex-1 md:max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            type="text"
            placeholder="Buscar por nome, ex: Monstera, Jiboia, Suculenta..."
            className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-neutral-600"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={onToggleFavoritesOnly}
          className={cn(
            'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
            showFavoritesOnly
              ? 'border-rose-400/40 bg-rose-500/15 text-rose-300'
              : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700 hover:text-white'
          )}
        >
          <Heart className={cn('h-4 w-4', showFavoritesOnly && 'fill-rose-400 text-rose-400')} />
          Meu Jardim
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-xs',
              showFavoritesOnly ? 'bg-rose-400/20' : 'bg-neutral-800'
            )}
          >
            {favoritesCount}
          </span>
        </button>
      </div>
    </header>
  );
}
