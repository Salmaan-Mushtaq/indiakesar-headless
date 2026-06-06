"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CinematicCarouselProps = {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
};

export function CinematicCarousel({
  images,
  autoplayDelay = 4000,
}: CinematicCarouselProps) {
  const N = images.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  // ─── Navigation ───────────────────────────────────────────────────────────
  const goTo = useCallback(
    (idx: number) => {
      setSelectedIndex(((idx % N) + N) % N);
      setElapsed(0);
      lastTsRef.current = null;
    },
    [N],
  );

  const prev = useCallback(
    () => goTo(selectedIndex - 1),
    [goTo, selectedIndex],
  );
  const next = useCallback(
    () => goTo(selectedIndex + 1),
    [goTo, selectedIndex],
  );

  // ─── rAF autoplay + progress ──────────────────────────────────────────────
  useEffect(() => {
    const tick = (ts: number) => {
      if (pausedRef.current) {
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (!lastTsRef.current) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setElapsed((e) => {
        const n = e + delta;
        if (n >= autoplayDelay) {
          lastTsRef.current = null;
          setSelectedIndex((i) => (i + 1) % N);
          return 0;
        }
        return n;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoplayDelay, N]);

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ─── Swipe ────────────────────────────────────────────────────────────────
  const swipeStartX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  /*
   * Layout (% of container width):
   *   Active card:  fills left side, large
   *   Inactive #1:  peeks in at right edge — full visible
   *   Inactive #2+: partially clipped, signals "more content"
   *
   *   [   ACTIVE (76%)   ] [ INACTIVE-1 (17%) ] [ INACTIVE-2 (clip) ]
   *                        ^--- gap 1.5% ---^
   *
   * Cards that are not active and not in the right-peek window
   * fly off to the right (left > 100%) or left (left < 0%) depending
   * on whether they are "before" or "after" the active index.
   */
  const ACTIVE_W = 76; // % width of active card
  const PEEK_W = 17; // % width of first inactive peek card
  const PEEK2_W = 10; // % width of second peek (partially clipped)
  const GAP = 1.5; // % gap between cards

  // active card always starts at 0
  const ACTIVE_LEFT = 0;
  const PEEK1_LEFT = ACTIVE_W + GAP; // ~77.5%
  const PEEK2_LEFT = PEEK1_LEFT + PEEK_W + GAP; // ~96%  (clips at 100%)

  /**
   * For each image, compute how many steps it is ahead of active (mod N),
   * using the shortest forward path so loop works cleanly.
   * 0 = active, 1 = next, 2 = two ahead, N-1 = one behind (= previous)
   */
  function stepsAhead(i: number): number {
    return (((i - selectedIndex) % N) + N) % N;
  }

  return (
    <section
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2b1a12] via-[#6e1f1f] to-[#2b1a12] px-4 py-8 md:px-8 md:py-12"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      aria-label="Image carousel"
    >
      {/* ── Header ── */}
      <div className="mb-8 flex items-end justify-between">
        <div className="flex items-end gap-4">
          <p
            className="font-serif text-6xl leading-none text-[#f8e8c8]/10 transition-all duration-500 md:text-8xl"
            aria-hidden="true"
          >
            {String(selectedIndex + 1).padStart(2, "0")}
          </p>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#f8e8c8]/55">
              Showcase
            </p>
            <h3 className="font-serif text-3xl font-light italic text-[#fff7e8] md:text-4xl">
              Saffron Visual Stories
            </h3>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous slide"
            className="rounded-full border border-[#f8e8c8]/30 bg-[#fff7e8]/[0.08] p-2 text-[#fff7e8] transition hover:bg-[#fff7e8]/20 cursor-pointer"
            onClick={prev}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="rounded-full border border-[#f8e8c8]/30 bg-[#fff7e8]/[0.08] p-2 text-[#fff7e8] transition hover:bg-[#fff7e8]/20 cursor-pointer"
            onClick={next}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Track ── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: 520 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {images.map((image, i) => {
          const steps = stepsAhead(i);
          const isActive = steps === 0;

          // Determine slot: 0=active, 1=peek1, 2=peek2, "behind"=was previously active
          // Slides that are "behind" (steps close to N) exit left; all others queue right
          const isBehind = steps > Math.floor(N / 2); // e.g. N=6: steps 4,5 are "behind"

          let left: number;
          let width: number;
          let opacity: number;
          let scale: number;
          let zIndex: number;
          let pointerEvents: "auto" | "none";
          let blur = false;

          if (isActive) {
            left = ACTIVE_LEFT;
            width = ACTIVE_W;
            opacity = 1;
            scale = 1;
            zIndex = 10;
            pointerEvents = "auto";
          } else if (steps === 1) {
            // First peek — fully visible on the right
            left = PEEK1_LEFT;
            width = PEEK_W;
            opacity = 0.6;
            scale = 0.96;
            zIndex = 8;
            pointerEvents = "auto";
          } else if (steps === 2) {
            // Second peek — mostly clipped
            left = PEEK2_LEFT;
            width = PEEK2_W;
            opacity = 0.35;
            scale = 0.92;
            zIndex = 6;
            pointerEvents = "auto";
            blur = true;
          } else if (isBehind) {
            // Exiting left — fly off-screen to the left
            left = -(ACTIVE_W + 10);
            width = ACTIVE_W;
            opacity = 0;
            scale = 0.92;
            zIndex = 4;
            pointerEvents = "none";
          } else {
            // Waiting right — queued off-screen to the right
            left = 110;
            width = PEEK_W;
            opacity = 0;
            scale = 0.92;
            zIndex = 4;
            pointerEvents = "none";
          }

          return (
            <article
              key={image.src}
              onClick={() => !isActive && steps <= 2 && goTo(i)}
              aria-label={image.alt}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${left}%`,
                width: `${width}%`,
                opacity,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                zIndex,
                pointerEvents,
                cursor: !isActive && steps <= 2 ? "pointer" : "default",
                borderRadius: 16,
                overflow: "hidden",
                transition: [
                  "left 0.85s cubic-bezier(0.16,1,0.3,1)",
                  "width 0.85s cubic-bezier(0.16,1,0.3,1)",
                  "opacity 0.7s ease",
                  "transform 0.85s cubic-bezier(0.16,1,0.3,1)",
                ].join(", "),
              }}
            >
              {/* Inset border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  border: isActive
                    ? "1px solid rgba(248,232,200,0.22)"
                    : "1px solid rgba(255,255,255,0.08)",
                  zIndex: 20,
                  pointerEvents: "none",
                  transition: "border-color 0.7s ease",
                }}
              />

              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  transform: isActive ? "scale(1)" : "scale(1.06)",
                  filter: isActive
                    ? "none"
                    : `brightness(0.5) saturate(0.35)${blur ? " blur(1px)" : ""}`,
                  transition: [
                    "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
                    "filter 0.85s ease",
                  ].join(", "),
                }}
                sizes="(max-width: 768px) 76vw, 76vw"
                unoptimized
                priority={i === 0}
              />

              {/* Gradient — lighter on active so more image shows */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 100%)",
                  transition: "background 0.75s ease",
                }}
              />

              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontWeight: 500,
                  background: isActive
                    ? "rgba(248,232,200,0.15)"
                    : "rgba(0,0,0,0.45)",
                  color: isActive ? "#fff7e8" : "rgba(255,255,255,0.28)",
                  border: isActive
                    ? "1px solid rgba(248,232,200,0.35)"
                    : "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.6s ease",
                  zIndex: 15,
                }}
              >
                {isActive ? "Gallery" : "News"}
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 2,
                borderRadius: 1,
                border: "none",
                padding: 0,
                cursor: "pointer",
                width: selectedIndex === i ? 32 : 14,
                background:
                  selectedIndex === i
                    ? "rgba(248,232,200,0.85)"
                    : "rgba(248,232,200,0.25)",
                transition:
                  "width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease",
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.28em",
            color: "rgba(248,232,200,0.5)",
          }}
        >
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(N).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
