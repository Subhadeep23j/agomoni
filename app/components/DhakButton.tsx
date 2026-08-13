"use client";

import { useState, useRef, useEffect } from "react";

export function DhakButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Load YouTube Iframe API if not present
    if (typeof window !== "undefined" && !window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const playDhakSong = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    try {
      if (!playerRef.current && window.YT && containerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          height: "1",
          width: "1",
          videoId: "lS26hqJ0Z6Y",
          playerVars: {
            autoplay: 1,
            controls: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            },
          },
        });
      } else if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
      }
    } catch {
      // Fallback
    }

    // Automatically stop after exactly 10 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (playerRef.current && playerRef.current.pauseVideo) {
        try {
          playerRef.current.pauseVideo();
        } catch {}
      }
      setIsPlaying(false);
    }, 10000);
  };

  return (
    <div className="relative inline-block">
      {/* Hidden YouTube Player for Dhak Short Video (10 seconds) */}
      <div
        className="absolute -left-[9999px] top-0 size-1 overflow-hidden opacity-0 pointer-events-none"
        ref={containerRef}
      />

      <button
        type="button"
        onClick={playDhakSong}
        disabled={isPlaying}
        className={`group relative shrink-0 touch-manipulation select-none rounded-full transition-all duration-200 active:scale-95 ${
          isPlaying ? "scale-105" : ""
        }`}
      >
        <span className="flex items-center gap-2.5 rounded-full border border-white/20 bg-black/75 py-2 pl-2 pr-4 shadow-[0_10px_35px_-8px_rgba(15,6,3,0.9)] backdrop-blur-2xl transition-all duration-300 group-hover:border-ember/60 group-hover:bg-black/90 sm:py-2.5 sm:pl-2.5 sm:pr-5">
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200 sm:size-10 ${
              isPlaying
                ? "bg-ember text-white animate-bounce"
                : "bg-white/15 text-white group-hover:bg-ember group-hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </span>
          <span className="flex flex-col text-left leading-none">
            <span className="font-serif-bengali text-sm font-bold text-white/95 sm:text-base">
              {isPlaying ? "ঢাক বাজছে (10s)..." : "ঢাক বাজান!"}
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-300/80">
              {isPlaying ? "PLAYING 10-SEC DHAK BEAT" : "PUJA DHAK BEAT (10S)"}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
