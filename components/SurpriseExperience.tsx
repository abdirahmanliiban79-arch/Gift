"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import FinalMessage from "@/components/FinalMessage";
import FlowerGarden from "@/components/FlowerGarden";
import MemoryGallery from "@/components/MemoryGallery";
import MusicToggle from "@/components/MusicToggle";
import { Petals } from "@/components/Petals";
import Rose from "@/components/Rose";
import { surpriseContent } from "@/data/surprise-content";

const SCENE_COUNT = 4;

function SecretScene({ onNext }: { onNext: () => void }) {
  const { text, button } = surpriseContent.opening;
  return (
    <section aria-label="The Secret" className="relative flex min-h-full flex-col items-center justify-center px-6 py-20 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
        <div className="slow-turn w-[150vmin] max-w-none opacity-[0.13]">
          <Rose tone="red" className="w-full" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(233,75,131,0.16), transparent)" }}
      />
      <Petals count={5} />

      <div className="relative flex max-w-md flex-col items-center gap-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="font-display text-4xl font-light italic leading-tight text-blush sm:text-5xl"
        >
          {text}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <span aria-hidden="true" className="cue-ring absolute inset-0 rounded-full border border-rose" />
          <motion.button
            type="button"
            onClick={onNext}
            whileTap={{ scale: 0.97 }}
            className="relative min-h-14 rounded-full bg-rose px-8 text-base font-medium text-midnight shadow-[0_0_32px_-6px_rgba(233,75,131,0.7)] transition-colors hover:bg-blush"
          >
            {button}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function SurpriseExperience() {
  const [scene, setScene] = useState(0);
  const [run, setRun] = useState(0);

  const next = useCallback(() => setScene((s) => Math.min(s + 1, SCENE_COUNT - 1)), []);
  const replay = useCallback(() => {
    setScene(0);
    setRun((r) => r + 1);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative h-dvh overflow-hidden bg-midnight">
        <MusicToggle />

        <ol
          aria-label={`Scene ${scene + 1} of ${SCENE_COUNT}`}
          className="absolute left-0 z-30 flex gap-2 px-5"
          style={{ top: "max(1.6rem, calc(env(safe-area-inset-top) + 0.6rem))" }}
        >
          {Array.from({ length: SCENE_COUNT }, (_, i) => (
            <li
              key={i}
              aria-hidden="true"
              className={`h-1 rounded-full transition-all duration-700 ${
                i === scene ? "w-6 bg-rose" : i < scene ? "w-2 bg-rose/60" : "w-2 bg-blush/20"
              }`}
            />
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${run}-${scene}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {scene === 0 && <SecretScene onNext={next} />}
            {scene === 1 && <FlowerGarden onNext={next} />}
            {scene === 2 && <MemoryGallery onNext={next} />}
            {scene === 3 && <FinalMessage onReplay={replay} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
