import { AgomoniPlayer } from "./components/AgomoniPlayer";
import { Clock } from "./components/Clock";
import { DhakButton } from "./components/DhakButton";
import { SocialLinks } from "./components/SocialLinks";
import { CreatorWatermark } from "./components/CreatorWatermark";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden text-white select-none">
      {/* ── Layer 0: Background artwork ────────────────────────── */}
      <div className="hero-bg fixed inset-0 -z-30 bg-cover bg-center bg-no-repeat opacity-100 transition-opacity duration-1000" />

      {/* ── Layer 1: Soft top and bottom gradients for legibility ─ */}
      <div className="pointer-events-none fixed inset-0 -z-[28] bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      {/* ── Layer 3: Film grain overlay ─────────────────────────── */}
      <div className="grain-overlay pointer-events-none fixed inset-0 -z-[24] opacity-[0.12] mix-blend-soft-light" />

      {/* ── Layer 4: Dust particles ─────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 -z-[22] overflow-hidden"
        aria-hidden="true"
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="dust-particle absolute rounded-full bg-amber-200/25"
            style={{
              width: `${1.5 + (i % 3) * 0.6}px`,
              height: `${1.5 + (i % 3) * 0.6}px`,
              left: `${8 + i * 12}%`,
              bottom: `-${5 + i * 4}%`,
              animationDuration: `${16 + i * 6}s`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── Header Dashboard (busdriver.wtf style) ─────────────── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 px-4 pt-4 sm:px-8 sm:pt-6">
        {/* Left: Agomoni Radio Brand Badge */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-amber-500/20 ring-1 ring-amber-400/30 backdrop-blur-md shadow-lg sm:size-11">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F26A36"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 drop-shadow-[0_2px_10px_rgba(242,106,54,0.5)]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
              <path d="M16 2v2" />
              <path d="M8 2v2" />
            </svg>
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-serif-bengali text-lg font-extrabold tracking-wide text-white sm:text-xl drop-shadow-[0_1px_10px_rgba(15,6,3,0.9)]">
              আগমনী
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-[10px]">
              আগমনী রেডিও · PUJA RADIO
            </span>
          </div>
        </div>

        {/* Center: Language / Quick Info Pill */}
        <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 backdrop-blur-xl md:flex">
          <span className="font-serif-bengali text-xs text-white/90">
            বাংলায় আগমনী গান
          </span>
          <span className="size-1 rounded-full bg-amber-400/60" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
            24x7 RETRO RADIO
          </span>
        </div>

        {/* Right: Realtime Clock & Live Listener Badge */}
        <div className="pointer-events-auto flex items-center gap-4">
          <Clock />
        </div>
      </header>

      {/* ── Main Hero Section (busdriver.wtf style) ─────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-4 pb-28 pt-24 text-center">
        {/* Soft background glow halo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[180%] w-[130%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(242,106,54,0.12) 0%, rgba(15,6,3,0) 100%)",
          }}
        />

        {/* Track counter tag */}
        <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/80 sm:text-xs drop-shadow-[0_1px_12px_rgba(15,6,3,0.85)]">
          52 TRACKS · NON-STOP MAHALAYA & PUJA RETRO
        </p>

        {/* Giant Bengali Display Headline */}
        <h1
          aria-label="আগমনী"
          className="mt-4 font-serif-bengali text-[clamp(3.5rem,13vw,10rem)] font-black leading-[0.88] tracking-wider text-white sm:mt-6 drop-shadow-[0_4px_50px_rgba(242,106,54,0.35)]"
        >
          আ গ ম নী
        </h1>

        {/* Subtitle with side lines */}
        <div className="mt-6 flex items-center gap-4 sm:mt-8">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/40" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/75 sm:text-xs">
            পুরোনো পুজোর গান · পুরোনো দিনের স্মৃতি
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/40" />
        </div>

        {/* Interactive Sound Action Button (Horn / Dhak Button) */}
        <div className="mt-7 sm:mt-9">
          <DhakButton />
        </div>
      </section>

      {/* ── Creator Watermark & Social Links (Bottom Left/Right) ── */}
      <div className="pointer-events-none fixed bottom-20 left-6 z-20 hidden items-center gap-4 md:flex">
        <SocialLinks />
      </div>

      <div className="pointer-events-none fixed bottom-20 right-6 z-20 hidden items-center gap-4 md:flex">
        <div className="pointer-events-auto">
          <CreatorWatermark />
        </div>
      </div>

      {/* ── Sticky Bottom Glassmorphic Music Player ────────────── */}
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <AgomoniPlayer />
      </div>
    </main>
  );
}
