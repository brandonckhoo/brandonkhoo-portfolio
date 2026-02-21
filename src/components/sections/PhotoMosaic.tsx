"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// Data — replace src values with your own images
// ─────────────────────────────────────────────
interface GalleryItem {
  src: string;       // REPLACE with your image path or URL
  alt: string;
  title: string;
  description: string;
  // Desktop 12-col explicit grid placement
  desktopColStart: number;
  desktopColSpan: number;
  desktopRowStart: number;
  desktopRowSpan: number;
  // Tablet 2-col layout: true = full width
  tabletFull?: boolean;
  // For object-position — adjust focal point per image
  objectPosition?: string;
}

const gallery: GalleryItem[] = [
  {
    // REPLACE: put your image at /gallery/twilio-signal-stage.png
    src: "/gallery/twilio-signal-stage.png",
    alt: "On stage at Twilio Signal presenting the Amplitude integration story",
    title: "Twilio Signal",
    description: "On stage presenting the Amplitude integration story at Twilio's developer conference.",
    desktopColStart: 1,
    desktopColSpan: 7,
    desktopRowStart: 1,
    desktopRowSpan: 2,
    tabletFull: true,
    objectPosition: "center top",
  },
  {
    // REPLACE: put your image at /gallery/twilio-signal-team.jpg
    src: "/gallery/twilio-signal-team.jpg",
    alt: "Team photo at Twilio Signal conference",
    title: "Signal Team",
    description: "With the partnerships team after a full day at Twilio Signal, San Francisco.",
    desktopColStart: 8,
    desktopColSpan: 5,
    desktopRowStart: 1,
    desktopRowSpan: 1,
    objectPosition: "center center",
  },
  {
    // REPLACE: put your image at /gallery/amplitude-saastr.png
    src: "/gallery/amplitude-saastr.png",
    alt: "Amplitude team group photo at SaaStr 2024 conference",
    title: "SaaStr 2024",
    description: "Representing Amplitude with the team at the world's largest SaaS conference.",
    desktopColStart: 8,
    desktopColSpan: 5,
    desktopRowStart: 2,
    desktopRowSpan: 1,
    objectPosition: "center 62%",
  },
  {
    // REPLACE: put your image at /gallery/inbound-team.png
    src: "/gallery/inbound-team.png",
    alt: "Team at HubSpot Inbound 2024 at the Amplitude x HubSpot booth",
    title: "HubSpot Inbound 2024",
    description: "Running the Amplitude × HubSpot partner booth at Inbound 2024, Boston.",
    desktopColStart: 1,
    desktopColSpan: 4,
    desktopRowStart: 3,
    desktopRowSpan: 1,
    objectPosition: "center 75%",
  },
  {
    // REPLACE: put your image at /gallery/inbound-partner-day.png
    src: "/gallery/inbound-partner-day.png",
    alt: "Inbound Partner Day photo booth strip",
    title: "Inbound Partner Day",
    description: "Partner Day photo booth — the best moments happen when the camera goes sideways.",
    desktopColStart: 5,
    desktopColSpan: 8,
    desktopRowStart: 3,
    desktopRowSpan: 1,
    objectPosition: "center 72%",
  },
];

// ─────────────────────────────────────────────
// Mosaic tile desktop class builder
// ─────────────────────────────────────────────
const COL_START: Record<number, string> = {
  1: "lg:col-start-1", 2: "lg:col-start-2", 3: "lg:col-start-3",
  4: "lg:col-start-4", 5: "lg:col-start-5", 6: "lg:col-start-6",
  7: "lg:col-start-7", 8: "lg:col-start-8", 9: "lg:col-start-9",
};
const COL_SPAN: Record<number, string> = {
  4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6",
  7: "lg:col-span-7", 8: "lg:col-span-8",
};
const ROW_START: Record<number, string> = {
  1: "lg:row-start-1", 2: "lg:row-start-2", 3: "lg:row-start-3",
};
const ROW_SPAN: Record<number, string> = {
  1: "lg:row-span-1", 2: "lg:row-span-2",
};

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function PhotoMosaic() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)), []);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length)), []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{ background: "#0a1628" }}
      className="section-py"
    >
      <div className="max-w-content mx-auto content-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            In the field
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed">
            Moments from building products with teams and customers.
          </p>
        </motion.div>

        {/* ── Mosaic Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
          className={[
            "grid gap-3",
            // Mobile: 1 col
            "grid-cols-1",
            // Tablet: 2 col, flow
            "md:grid-cols-2",
            // Desktop: 12 col explicit placement
            "lg:grid-cols-12",
            "lg:[grid-template-rows:240px_240px_240px]",
          ].join(" ")}
        >
          {gallery.map((item, i) => (
            <MosaicTile
              key={item.src}
              item={item}
              index={i}
              onClick={() => openLightbox(i)}
              tabletFull={item.tabletFull}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={gallery}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────
// Mosaic Tile
// ─────────────────────────────────────────────
function MosaicTile({
  item,
  index,
  onClick,
  tabletFull,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
  tabletFull?: boolean;
}) {
  const desktopClasses = [
    COL_START[item.desktopColStart] ?? "",
    COL_SPAN[item.desktopColSpan] ?? "",
    ROW_START[item.desktopRowStart] ?? "",
    ROW_SPAN[item.desktopRowSpan] ?? "",
    "lg:h-auto",
  ].join(" ");

  const tabletClass = tabletFull ? "md:col-span-2" : "md:col-span-1";

  return (
    <button
      onClick={onClick}
      aria-label={`Open photo: ${item.title}`}
      className={[
        "group relative overflow-hidden rounded-xl cursor-pointer text-left",
        "h-64 md:h-72",
        tabletClass,
        desktopClasses,
        // border
        "border border-white/10 hover:border-white/25 transition-colors duration-200",
      ].join(" ")}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ objectPosition: item.objectPosition ?? "center" }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col justify-end p-4 md:p-5">
        <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-semibold text-sm leading-snug mb-0.5">
            {item.title}
          </p>
          <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus();
  }, [index]);

  // Keyboard: ESC closes, ← / → navigates; focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      // Focus trap
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Card */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative flex flex-col max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
        style={{ background: "#0f1c35", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        {/* Image */}
        <div className="relative flex-1 min-h-0" style={{ minHeight: "320px", maxHeight: "70vh" }}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm">{item.title}</p>
            <p className="text-white/55 text-xs leading-relaxed mt-0.5">{item.description}</p>
          </div>
          <span className="text-white/30 text-xs flex-shrink-0">{index + 1} / {items.length}</span>
        </div>
      </motion.div>

      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        aria-label="Previous photo"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        aria-label="Next photo"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  );
}
