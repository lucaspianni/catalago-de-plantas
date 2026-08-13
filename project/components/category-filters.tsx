'use client';

import { categoryFilters } from '@/lib/plants';
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
  active: string;
  onChange: (value: string) => void;
}

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {categoryFilters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
            active === filter.value
              ? 'border-white bg-white text-black'
              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
