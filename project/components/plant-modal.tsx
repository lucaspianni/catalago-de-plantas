'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Droplet, Heart, PawPrint, Sprout, Sun, Thermometer, X } from 'lucide-react';
import { Plant } from '@/lib/plants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface PlantModalProps {
  plant: Plant | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

const metricIcons = {
  light: Sun,
  water: Droplet,
  temperature: Thermometer,
  soil: Sprout,
} as const;

const metricLabels: Record<keyof Plant['specs'], string> = {
  light: 'Luz',
  water: 'Rega',
  temperature: 'Temperatura',
  soil: 'Solo',
};

export function PlantModal({ plant, isFavorite, onToggleFavorite, onClose }: PlantModalProps) {
  useEffect(() => {
    if (!plant) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      scrollContainer.style.overflowY = 'hidden';
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (scrollContainer) {
        scrollContainer.style.overflowY = '';
      }
      document.body.style.overflow = '';
    };
  }, [plant, onClose]);

  return (
    <AnimatePresence>
      {plant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl md:grid-cols-2"
            style={{ maxHeight: '90vh' }}
          >
            <div className="relative h-64 shrink-0 md:h-auto">
              <Image
                src={plant.image}
                alt={plant.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 md:bg-gradient-to-r" />

              <button
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
              >
                <Heart
                  className={cn(
                    'h-5 w-5',
                    isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
                  )}
                />
              </button>

              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 md:hidden"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="relative flex flex-col overflow-y-auto p-6 md:p-8">
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-6 top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white md:flex"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 pr-12">
                <span className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs font-medium text-neutral-300">
                  {plant.category}
                </span>
                <span className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs font-medium text-neutral-300">
                  {plant.difficulty}
                </span>
                {plant.petFriendly && (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    <PawPrint className="h-3.5 w-3.5" />
                    Pet Friendly
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                {plant.name}
              </h2>
              <p className="mt-1 text-sm uppercase tracking-widest text-neutral-500">
                {plant.scientificName}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                {plant.description}
              </p>

              <Tabs defaultValue="ficha" className="mt-6">
                <TabsList className="grid w-full grid-cols-2 rounded-full border border-neutral-800 bg-neutral-950 p-1">
                  <TabsTrigger
                    value="ficha"
                    className="rounded-full text-neutral-400 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none"
                  >
                    Ficha Técnica
                  </TabsTrigger>
                  <TabsTrigger
                    value="cuidados"
                    className="rounded-full text-neutral-400 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none"
                  >
                    Guia de Cultivo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ficha" className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(Object.keys(plant.specs) as (keyof Plant['specs'])[]).map((key) => {
                      const Icon = metricIcons[key];
                      const metric = plant.specs[key];
                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4"
                        >
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Icon className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                              {metricLabels[key]}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-neutral-200">{metric.value}</p>
                          <div className="mt-3 flex gap-1">
                            {[1, 2, 3, 4, 5].map((segment) => (
                              <span
                                key={segment}
                                className={cn(
                                  'h-1.5 flex-1 rounded-full',
                                  segment <= metric.level
                                    ? 'bg-emerald-400'
                                    : 'bg-neutral-800'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {plant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cuidados" className="mt-5">
                  <ol className="space-y-4">
                    {plant.careGuide.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-xs font-semibold text-emerald-300">
                          {stepIndex + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-neutral-300">{step}</p>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
