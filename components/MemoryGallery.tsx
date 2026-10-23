"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Rose, { Leaves } from "@/components/Rose";
import { surpriseContent, type Memory } from "@/data/surprise-content";

const { heading, subheading, button, next: nextLabel, previous: previousLabel } = surpriseContent.gallery;
const PER_PAGE = 2;
const CARD_ASPECT = "4 / 5";
const memories: Memory[] = surpriseContent.memories;

/** Photo that falls back to a soft placeholder when the file hasn't been added yet. */
function Photo({ memory, sizes, priority }: { memory: Memory; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-burgundy/70 to-midnight">
        <div className="flex flex-col items-center gap-2 px-4 text-center text-blush/60">
          <ImageIcon size={22} aria-hidden />
          <span className="font-display text-lg italic">Photo goes here</span>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={memory.src}
      alt={memory.alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-cover"
    />
  );
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (i: number) => void }) {
  const memory = memories[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const prev = useCallback(() => onChange((index + memories.length - 1) % memories.length), [index, onChange]);
  const next = useCallback(() => onChange((index + 1) % memories.length), [index, onChange]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const navBtn =
    "glass absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full text-blush hover:bg-blush/15";

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${memories.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 grid place-items-center bg-midnight/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="glass absolute right-4 z-10 grid size-11 place-items-center rounded-full text-blush hover:bg-blush/15"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <X size={20} aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous photo"
        className={`${navBtn} left-3`}
      >
        <ChevronLeft size={22} aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next photo"
        className={`${navBtn} right-3`}
      >
        <ChevronRight size={22} aria-hidden />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(86vw,70dvh*0.8,40rem)] overflow-hidden rounded-2xl border border-blush/30 shadow-[0_0_80px_-20px_rgba(233,75,131,0.5)]"
        style={{ aspectRatio: memory.aspect }}
      >
        <Photo memory={memory} sizes="(min-width: 768px) 640px, 86vw" />
      </motion.div>
    </motion.div>
  );
}

const BOW_OUTLINE =
  "0 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1.5px 1.5px 0 #fff, -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 0 6px 12px rgba(0,0,0,0.45)";

// Roses ringing the frame: position, size and tone. Corners are bigger, mid-edges are small.
const WREATH = [
  { pos: "-left-[13%] -top-[6%] w-[34%]", tone: "red", delay: 0.2 },
  { pos: "-right-[13%] -top-[5%] w-[30%]", tone: "pink", delay: 0.4 },
  { pos: "-left-[11%] top-[42%] w-[22%]", tone: "pink", delay: 0.7 },
  { pos: "-right-[11%] top-[46%] w-[24%]", tone: "red", delay: 0.6 },
  { pos: "-left-[14%] -bottom-[5%] w-[32%]", tone: "red", delay: 0.5 },
  { pos: "-right-[14%] -bottom-[6%] w-[35%]", tone: "red", delay: 0.3 },
  { pos: "left-[34%] -bottom-[6%] w-[22%]", tone: "pink", delay: 0.8 },
] as const;

function RoseFrame({ memory, index, onOpen }: { memory: Memory; index: number; onOpen: () => void }) {
  return (
    <div className="relative w-[min(58vw,16rem)] sm:w-[min(36vw,19rem)]">
      {/* leaves tucked behind the roses */}
      <Leaves className="pointer-events-none absolute -left-[22%] -top-[12%] w-[60%] opacity-90" />
      <Leaves className="pointer-events-none absolute -bottom-[12%] -right-[24%] w-[62%] rotate-[150deg] opacity-90" />

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo ${index + 1}: ${memory.alt}`}
        className="group relative block w-full rounded-2xl border border-blush/40 bg-midnight p-1.5 shadow-[0_0_50px_-14px_rgba(233,75,131,0.65)] transition duration-500 hover:border-blush/70 active:scale-[0.98] md:hover:-translate-y-1"
      >
        <span className="relative block w-full overflow-hidden rounded-xl" style={{ aspectRatio: CARD_ASPECT }}>
          <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Photo memory={memory} sizes="(min-width: 640px) 304px, 58vw" />
          </span>
        </span>
      </button>

      {WREATH.map((r, i) => (
        <Rose
          key={i}
          tone={r.tone}
          delay={r.delay}
          className={`pointer-events-none absolute ${r.pos} drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]`}
        />
      ))}

      {/* pink bow sticker */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: index % 2 ? 8 : -8 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 160, damping: 12 }}
        className="pointer-events-none absolute -top-9 left-1/2 z-10 -ml-7 select-none text-5xl leading-none"
        style={{ textShadow: BOW_OUTLINE }}
      >
        🎀
      </motion.span>
    </div>
  );
}

const pageCount = Math.ceil(memories.length / PER_PAGE);

export default function MemoryGallery({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(null), []);

  const go = (p: number) => {
    setPage(p);
    headerRef.current?.scrollIntoView({ block: "start" });
  };

  const first = page * PER_PAGE;
  const items = memories.slice(first, first + PER_PAGE);
  const isLast = page === pageCount - 1;

  return (
    <section aria-labelledby="gallery-heading" className="relative px-6 pb-20 pt-16 sm:px-8">
      <div className="relative mx-auto max-w-4xl">
        <header ref={headerRef} className="mb-14 scroll-mt-16 text-center">
          <h2 id="gallery-heading" className="font-display text-4xl italic text-blush sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm tracking-wide text-blush/70 sm:text-base">{subheading}</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.ul
            key={page}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-16 sm:flex-row sm:items-start sm:justify-center sm:gap-20"
          >
            {items.map((m, i) => (
              <li key={m.src} className={i % 2 ? "sm:mt-16" : ""}>
                <RoseFrame memory={m} index={first + i} onOpen={() => setOpen(first + i)} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <nav aria-label="Gallery pages" className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="glass grid size-11 place-items-center rounded-full text-blush transition-opacity hover:bg-blush/10 disabled:opacity-30"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <p className="min-w-16 text-center text-sm tabular-nums text-blush/70" aria-live="polite">
              {page + 1} / {pageCount}
            </p>
            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={isLast}
              aria-label="Next page"
              className="glass grid size-11 place-items-center rounded-full text-blush transition-opacity hover:bg-blush/10 disabled:opacity-30"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={isLast ? onNext : () => go(page + 1)}
            className="min-h-14 rounded-full bg-rose px-8 text-base font-medium text-midnight shadow-[0_0_32px_-6px_rgba(233,75,131,0.7)] transition-colors hover:bg-blush active:scale-[0.97]"
          >
            {isLast ? button : nextLabel}
          </button>
          {page > 0 && (
            <button type="button" onClick={() => go(page - 1)} className="text-sm text-blush/70 underline-offset-4 hover:underline">
              {previousLabel}
            </button>
          )}
        </nav>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={close} onChange={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
