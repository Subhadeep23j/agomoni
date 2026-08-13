"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Track } from "./types";

/* ── YouTube Player type ──────────────────────────────────────── */
export type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

/* ── Extend Window for YT API ─────────────────────────────────── */
declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: Record<string, unknown>
      ) => YTPlayer;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/* ── API loading singleton ────────────────────────────────────── */
let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.();
      resolve();
    };

    // Prevent duplicate script injection
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiLoadPromise;
}

/* ── Props ────────────────────────────────────────────────────── */
type YouTubePlayerProps = {
  track: Track;
  onPlayer: (p: YTPlayer | null) => void;
  onStateChange: (state: number) => void;
  onError: (code: number) => void;
};

/* ── Component ────────────────────────────────────────────────── */
export function YouTubePlayer({
  track,
  onPlayer,
  onStateChange,
  onError,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  // Keep callbacks in a ref so the effect doesn't re-run on callback identity changes
  const callbacks = useRef({ onStateChange, onError, onPlayer });
  callbacks.current = { onStateChange, onError, onPlayer };

  const destroyPlayer = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // Player might already be destroyed
      }
      playerRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!track.videoId) {
      destroyPlayer();
      callbacks.current.onPlayer(null);
      return;
    }

    async function init() {
      await loadYouTubeAPI();
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      // Clean up any existing player
      destroyPlayer();

      // Clear container innerHTML for fresh embed
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      const player = new window.YT.Player(containerRef.current!, {
        videoId: track.videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            playerRef.current = player;
            callbacks.current.onPlayer(player);
            try {
              player.playVideo();
            } catch {
              // Ignore autoplay restriction errors
            }
          },
          onStateChange: (e: { data: number }) => {
            if (!cancelled) callbacks.current.onStateChange(e.data);
          },
          onError: (e: { data: number }) => {
            if (!cancelled) callbacks.current.onError(e.data);
          },
        },
      });
    }

    init();

    return () => {
      cancelled = true;
      destroyPlayer();
      callbacks.current.onPlayer(null);
    };
  }, [track.videoId, destroyPlayer]);

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="aspect-video w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/35">
      {track.videoId ? (
        <div ref={containerRef} className="h-full w-full" />
      ) : (
        <div className="flex h-full items-center justify-center p-6 text-center">
          <div>
            <p className="font-serif-bengali text-lg text-cream">
              ভিডিও এখনও যোগ করা হয়নি
            </p>
            <p className="mt-1.5 text-xs leading-5 text-white/55">
              Add an approved embeddable videoId in{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/70">
                app/components/tracks.ts
              </code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
