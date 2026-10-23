"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { surpriseContent } from "@/data/surprise-content";

const src = surpriseContent.music.src;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  // Browsers block sound until the visitor interacts, so try straight away and,
  // if that is refused, start on their first tap or key press (e.g. "Open your surprise").
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    const events = ["pointerdown", "keydown"] as const;
    const stopListening = () => events.forEach((e) => window.removeEventListener(e, onGesture));
    const attempt = () => audio.play().then(stopListening, () => {});
    function onGesture() {
      if (!userPaused.current) attempt();
    }

    events.forEach((e) => window.addEventListener(e, onGesture));
    attempt();

    return () => {
      stopListening();
      audio.pause();
    };
  }, []);

  if (!src) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    if (audio.paused) {
      userPaused.current = false;
      audio.play().catch(() => {});
    } else {
      userPaused.current = true;
      audio.pause();
    }
  };

  const label = missing ? "Music not added yet" : playing ? "Mute music" : "Play music";

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
        title={label}
        disabled={missing}
        className="glass absolute right-4 top-4 z-30 grid size-11 place-items-center rounded-full text-blush transition-colors hover:bg-blush/10 disabled:opacity-40"
        style={{
          top: "max(1rem, env(safe-area-inset-top))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        {playing ? <Volume2 size={18} aria-hidden /> : <VolumeX size={18} aria-hidden />}
      </button>
    </>
  );
}
