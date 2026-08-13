'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Plant } from '@/lib/plants';

interface SpotlightSectionProps {
  plant: Plant;
  index: number;
  onOpen: () => void;
}

export function SpotlightSection({ plant, index, onOpen }: SpotlightSectionProps) {
  const isReversed = index % 2 === 1;

  return (
    <section className="flex min-h-screen snap-start items-center bg-neutral-950 px-4 py-20 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-16 ${
          isReversed ? 'md:flex-row-reverse' : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] w-full max-w-sm shrink-0 overflow-hidden rounded-3xl border border-neutral-800"
        >
          <Image
            src={plant.image}
            alt={plant.name}
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-400">
            {`Em Destaque · 0${index + 1}`}
          </span>
          <h2 className="mt-4 text-5xl font-black tracking-tighter text-white md:text-6xl">
            {plant.name}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-widest text-neutral-400">
            {plant.scientificName}
          </p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
            {plant.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Categoria
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                {plant.category}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Dificuldade
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                {plant.difficulty}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Luz
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                {plant.specs.light.value}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Rega
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                {plant.specs.water.value}
              </div>
            </div>
          </div>

          <button
            onClick={onOpen}
            className="mt-8 flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Ver ficha completa
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
