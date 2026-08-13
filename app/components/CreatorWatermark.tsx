export function CreatorWatermark() {
  return (
    <footer className="flex flex-col items-center gap-1.5 py-4 text-center">
      <p className="text-[10px] tracking-[.15em] text-white/30">
        <span className="text-white/20">*</span>
        <span className="mx-2">Made by Subhadeep Maity</span>
        <span className="text-white/20">*</span>
      </p>
      <nav
        aria-label="Creator links"
        className="flex items-center gap-3 text-[10px] text-white/25"
      >
        <a
          href="https://github.com/Subhadeep23j"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-cream/60"
        >
          GitHub
        </a>
        <span className="text-white/15">·</span>
        <a
          href="https://www.instagram.com/maitysubhadeep_official/"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-cream/60"
        >
          Instagram
        </a>
      </nav>
    </footer>
  );
}
