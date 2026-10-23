"use client";

import { motion } from "motion/react";
import Rose, { Leaves } from "@/components/Rose";
import { Motes, Petals } from "@/components/Petals";
import { surpriseContent } from "@/data/surprise-content";

type Props = { onNext: () => void };

export default function FlowerGarden({ onNext }: Props) {
  const { text, button } = surpriseContent.garden;

  return (
    <section
      aria-label="The Garden"
      className="relative flex min-h-full flex-col items-center justify-center gap-8 px-6 py-20 text-center"
    >
      <Petals count={6} />
      <Motes />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-square w-[min(86vw,26rem)] max-h-[48dvh]"
        style={{ filter: "drop-shadow(0 0 40px rgba(233,75,131,0.28))" }}
      >
        <Leaves className="absolute inset-0 size-full" />
        <Rose tone="pink" delay={0.5} className="absolute left-[2%] top-[34%] w-[46%]" />
        <Rose tone="red" delay={0.8} className="absolute right-[0%] top-[8%] w-[44%]" />
        <Rose tone="red" delay={0.2} breathe className="absolute left-[18%] top-[4%] w-[66%]" />
      </motion.div>

      <div className="flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
          className="max-w-sm font-display text-3xl italic leading-tight text-blush sm:text-4xl"
        >
          {text}
        </motion.p>
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          whileTap={{ scale: 0.97 }}
          className="min-h-14 rounded-full bg-rose px-8 text-base font-medium text-midnight shadow-[0_0_32px_-6px_rgba(233,75,131,0.7)] transition-colors hover:bg-blush"
        >
          {button}
        </motion.button>
      </div>
    </section>
  );
}
