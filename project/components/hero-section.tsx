'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Leaf } from 'lucide-react';
import { plants } from '@/lib/plants';

interface HeroSectionProps {
  onExplore: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  const categoryCount = new Set(plants.map((plant) => plant.category)).size;
  const heroImage = plants.find((p) => p.id === 'monstera-deliciosa')?.image;

  return (
    <section className="relative flex min-h-screen snap-start flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-neutral-950" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-widest text-neutral-400 sm:text-sm"
        >
          Catálogo de Plantas Ornamentais
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-6xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl"
        >
          Verde.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400 md:text-xl"
        >
          Encontre a planta perfeita para o seu espaço.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Explorar Catálogo
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            onClick={onExplore}
            className="rounded-full border border-neutral-700 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-neutral-500 hover:bg-white/5"
          >
            Conhecer as Espécies
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-neutral-500"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{plants.length}</span>
            <span className="mt-1 text-xs uppercase tracking-widest">Espécies</span>
          </div>
          <span className="h-8 w-px bg-neutral-800" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{categoryCount}</span>
            <span className="mt-1 text-xs uppercase tracking-widest">Categorias</span>
          </div>
          <span className="h-8 w-px bg-neutral-800" />
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1.5 text-2xl font-bold text-white">
              <Leaf className="h-5 w-5 text-emerald-400" />
              120
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest">Dicas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
