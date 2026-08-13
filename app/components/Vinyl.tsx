import type { Track } from "./types";

export function Vinyl({
  track,
  playing,
  mobile = false,
}: {
  track: Track;
  playing: boolean;
  mobile?: boolean;
}) {
  const size = mobile ? "h-16 w-16" : "h-20 w-20";

  return (
    <div
      className={`${size} vinyl-spin ${playing ? "is-playing" : ""} relative shrink-0 rounded-full bg-[#111] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,.14),0_8px_24px_rgba(0,0,0,.35)]`}
      aria-hidden="true"
    >
      {/* Vinyl grooves */}
      <div className="absolute inset-[6px] rounded-full border border-white/[.05]" />
      <div className="absolute inset-[9px] rounded-full border border-white/[.07]" />
      <div className="absolute inset-[12px] rounded-full border border-white/[.04]" />
      <div className="absolute inset-[15px] rounded-full border border-white/[.06]" />

      {/* Label area */}
      <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-[#8f2d26] via-[#d5a84a] to-[#3a1716]">
        <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-cream select-none">
          {track.title[0]}
        </span>
      </div>

      {/* Spindle */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
