/**
 * Everything personal lives here. Edit freely — no other file needs to change.
 */

export type Memory = {
  /** Path inside /public. Drop your photo at public/images/image-N.jpeg. */
  src: string;
  /** Describe the photo for screen readers — personalize these. */
  alt: string;
  /** True width / height of the photo (used by the full-size lightbox). */
  aspect: string;
};

export const surpriseContent = {
  opening: {
    text: "There’s a little something I made just for you...",
    button: "Open your little surprise ♡",
  },

  garden: {
    text: "Some people make ordinary days feel special.",
    button: "Continue the story →",
  },

  gallery: {
    heading: "A Few Little Moments",
    subheading: "A few moments, a lot of memories.",
    next: "Next →",
    previous: "Back",
    button: "One last thing →",
  },

  final: {
    message: "Just a little reminder that you’re appreciated. ♡",
    secondary: "Never forget how special you are.",
    replay: "Experience it again ↻",
  },

  /** File lives in public/audio. Set src to "" to hide the music button entirely. */
  music: {
    src: "/audio/sow-sow.m4a",
  },

  /** Exactly seven photographs, shown two per page. Replace the files, or edit the paths/alt text. */
  memories: [
    { src: "/images/image-1.jpeg", alt: "Memory 1 — describe this photo", aspect: "1046 / 1280" },
    { src: "/images/image-2.jpeg", alt: "Memory 2 — describe this photo", aspect: "734 / 1280" },
    { src: "/images/image-3.jpeg", alt: "Memory 3 — describe this photo", aspect: "720 / 1280" },
    { src: "/images/image-4.jpeg", alt: "Memory 4 — describe this photo", aspect: "1020 / 1280" },
    { src: "/images/image-5.jpeg", alt: "Memory 5 — describe this photo", aspect: "1006 / 1280" },
    { src: "/images/image-6.jpeg", alt: "Memory 6 — describe this photo", aspect: "1034 / 1280" },
    { src: "/images/image-7.jpeg", alt: "Memory 7 — describe this photo", aspect: "720 / 1280" },
  ] satisfies Memory[],
};
