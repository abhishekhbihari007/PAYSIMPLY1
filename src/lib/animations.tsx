import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── 1. Letter Reveal 3D (Hero) ─────────────────────────────────────
const letter3DContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const letter3DChild: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 50 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export const LetterReveal3D = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={letter3DContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text} style={{ perspective: 400 }}>
    {text.split("").map((char, i) => (
      <motion.span key={i} variants={letter3DChild} className="inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 2. Word Slide Up (Services) ────────────────────────────────────
const wordSlideContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const wordSlideChild: Variants = {
  hidden: { opacity: 0, y: "100%", filter: "blur(4px)" },
  visible: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export const WordSlideUp = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={wordSlideContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={`${className} overflow-hidden`} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={wordSlideChild} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 3. Blur Fade In (How It Works) ─────────────────────────────────
const blurContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const blurChild: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", scale: 0.9 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export const BlurFadeIn = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={blurContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={blurChild} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 4. Clip Reveal (Comparison) ─────────────────────────────────────
export const ClipReveal = ({ text, className }: { text: string; className?: string }) => (
  <motion.span
    initial={{ clipPath: "inset(0 100% 0 0)" }}
    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
    className={`inline-block ${className}`}
    aria-label={text}
  >
    {text}
  </motion.span>
);

// ─── 5. Scale Bounce (Pricing) ───────────────────────────────────────
const scaleContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const scaleChild: Variants = {
  hidden: { opacity: 0, scale: 0.3, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 15 } },
};

export const ScaleBounce = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={scaleContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={scaleChild} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 6. Slide From Left (FAQ) ────────────────────────────────────────
const slideLeftContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const slideLeftChild: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export const SlideFromLeft = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={slideLeftContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={slideLeftChild} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 7. Rotate Reveal (Trust) ────────────────────────────────────────
const rotateContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const rotateChild: Variants = {
  hidden: { opacity: 0, rotateZ: -8, y: 30 },
  visible: { opacity: 1, rotateZ: 0, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export const RotateReveal = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={rotateContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text} style={{ transformOrigin: "left bottom" }}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={rotateChild} className="inline-block mr-[0.3em]" style={{ transformOrigin: "left bottom" }}>
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 8. Stagger Fade (Testimonials) ──────────────────────────────────
const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const StaggerFade = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={staggerChild} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// ─── 9. Glow Fade (CTA) ─────────────────────────────────────────────
const glowContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const glowChild: Variants = {
  hidden: { opacity: 0, textShadow: "0 0 0px transparent" },
  visible: { opacity: 1, textShadow: "0 0 20px rgba(212, 255, 0, 0.3)", transition: { duration: 0.5, ease: "easeOut" as const } },
};

export const GlowFade = ({ text, className }: { text: string; className?: string }) => (
  <motion.span variants={glowContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={className} aria-label={text}>
    {text.split("").map((char, i) => (
      <motion.span key={i} variants={glowChild} className="inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);
