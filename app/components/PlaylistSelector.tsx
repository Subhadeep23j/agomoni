import type { Playlist } from "./types";

export function PlaylistSelector({
  items,
  active,
  onSelect,
}: {
  items: Playlist[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="flex max-w-full flex-col gap-0.5 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 backdrop-blur-xl"
      role="radiogroup"
      aria-label="Select playlist"
    >
      {items.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            role="radio"
            aria-checked={isActive}
            className={`group flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-left transition-all ${
              isActive
                ? "text-cream"
                : "text-white/45 hover:bg-white/5 hover:text-white/70"
            }`}
          >
            {/* Radio indicator */}
            <span
              className={`relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full border ${
                isActive
                  ? "border-sindoor bg-sindoor/20"
                  : "border-white/25 bg-transparent"
              }`}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-cream shadow-[0_0_8px_rgba(241,215,165,.6)]" />
              )}
            </span>

            {/* Text */}
            <span className="flex flex-col">
              <span
                className={`font-serif-bengali text-[13px] leading-tight ${
                  isActive ? "font-semibold" : "font-normal"
                }`}
              >
                {p.name}
              </span>
              <span
                className={`text-[9px] tracking-[.1em] ${
                  isActive ? "text-white/50" : "text-white/30"
                }`}
              >
                {p.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
