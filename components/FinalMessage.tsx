"use client";

import { motion } from "motion/react";
import Rose from "@/components/Rose";
import { Petals } from "@/components/Petals";
import { surpriseContent } from "@/data/surprise-content";

export default function FinalMessage({ onReplay }: { onReplay: () => void }) {
  const { message, secondary, replay } = surpriseContent.final;

  return (
    <section
      aria-label="Just for You"
      className="relative flex min-h-full flex-col items-center justify-center gap-8 px-6 py-20 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[34%] size-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(233,75,131,0.2), transparent)" }}
      />
      <Petals count={5} />

      <div className="relative" style={{ filter: "drop-shadow(0 0 36px rgba(233,75,131,0.35))" }}>
        <Rose tone="pink" delay={1.6} className="absolute -left-14 top-12 w-24 opacity-90" />
        <Rose tone="pink" delay={2} className="absolute -right-14 top-4 w-20 opacity-90" />
        <Rose tone="red" delay={0.2} breathe className="relative w-[min(64vw,15rem)] max-h-[34dvh]" />
      </div>

      <div className="relative flex max-w-md flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="font-display text-3xl italic leading-snug text-blush sm:text-4xl"
        >
          {message}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.4 }}
          className="text-sm tracking-wide text-blush/75 sm:text-base"
        >
          {secondary}
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={onReplay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        whileTap={{ scale: 0.97 }}
        className="glass relative min-h-14 rounded-full px-8 text-base text-blush transition-colors hover:bg-blush/10"
      >
        {replay}
      </motion.button>
    </section>
  );
}
