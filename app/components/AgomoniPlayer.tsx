"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playlists } from "./tracks";
import { YouTubePlayer, type YTPlayer } from "./YouTubePlayer";
import type { PlaybackState } from "./types";

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_BUFFERING = 3;
const YT_ENDED = 0;

function formatTime(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const s = Math.floor(n);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function AgomoniPlayer() {
  const [pid, setPid] = useState(playlists[0].id);
  const [idx, setIdx] = useState(0);
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPlaying = playback === "playing";

  const list = useMemo(
    () => playlists.find((p) => p.id === pid) ?? playlists[0],
    [pid]
  );
  const track = list.tracks[idx] ?? list.tracks[0];

  const setPlayer = useCallback((p: YTPlayer | null) => {
    playerRef.current = p;
    if (p) {
      const d = p.getDuration?.() || 0;
      if (d > 0) setDur(d);
    }
  }, []);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  }, [isPlaying]);

  // Keyboard Spacebar & 'k' key listener for toggling playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.code === "Space" || e.key === " " || e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % list.tracks.length);
    setPlayback("idle");
    setCur(0);
    setDur(0);
  }, [list.tracks.length]);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + list.tracks.length) % list.tracks.length);
    setPlayback("idle");
    setCur(0);
    setDur(0);
  }, [list.tracks.length]);

  const handleStateChange = useCallback(
    (state: number) => {
      if (state === YT_PLAYING) {
        setPlayback("playing");
        const d = playerRef.current?.getDuration?.() || 0;
        if (d > 0) setDur(d);
      } else if (state === YT_PAUSED) {
        setPlayback("paused");
      } else if (state === YT_BUFFERING) {
        setPlayback("buffering");
      } else if (state === YT_ENDED) {
        next();
      }
    },
    [next]
  );

  const handleError = useCallback(() => {
    setPlayback("error");
    setTimeout(() => next(), 1200);
  }, [next]);

  useEffect(() => {
    if (isPlaying) {
      progressTimer.current = setInterval(() => {
        const p = playerRef.current;
        if (p) {
          setCur(p.getCurrentTime?.() || 0);
          const d = p.getDuration?.() || 0;
          if (d > 0) setDur(d);
        }
      }, 400);
    } else if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }

    return () => {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    };
  }, [isPlaying]);



  const seek = useCallback((time: number) => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(time, true);
    setCur(time);
  }, []);

  const handlePlaylistSelect = (id: string) => {
    setPid(id);
    setIdx(0);
    setPlayback("idle");
    setCur(0);
    setDur(0);
  };

  const handleTrackSelect = (i: number) => {
    setIdx(i);
    setPlayback("idle");
    setCur(0);
    setDur(0);
    setTimeout(() => playerRef.current?.playVideo(), 300);
  };

  const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;
  const thumbnailUrl = track.videoId
    ? `https://i.ytimg.com/vi/${track.videoId}/hqdefault.jpg`
    : "/bg/scene-wide.png";

  return (
    <div className="relative w-full max-w-2xl px-3 sm:px-0">
      {/* ── Expandable Playlist Drawer ────────────────────────── */}
      <div
        className={`absolute inset-x-3 bottom-full mb-3 overflow-hidden rounded-3xl border border-white/12 bg-black/85 shadow-[0_24px_60px_-24px_rgba(10,4,1,0.95)] backdrop-blur-3xl transition-all duration-300 ease-out sm:inset-x-0 ${
          isDrawerOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Drawer Header & Playlist Category Tabs */}
        <div className="flex flex-col gap-2 px-4 pb-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {playlists.map((pl) => {
              const active = pl.id === pid;
              return (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() => handlePlaylistSelect(pl.id)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "bg-ember text-white shadow-sm"
                      : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {pl.name}
                </button>
              );
            })}
          </nav>
          <span className="text-[11px] font-medium text-white/40">
            {list.tracks.length} tracks · {list.subtitle}
          </span>
        </div>

        {/* Scrolling Tracklist */}
        <ul className="max-h-[320px] overflow-y-auto px-2 pb-3">
          {list.tracks.map((t, i) => {
            const isCurrent = i === idx;
            const tThumb = t.videoId
              ? `https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`
              : "/bg/scene-wide.png";

            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => handleTrackSelect(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors ${
                    isCurrent
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  <span className="grid w-6 shrink-0 place-items-center">
                    {isCurrent && isPlaying ? (
                      <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
                        <span className="w-0.5 rounded-full bg-ember animate-eq-1" />
                        <span className="w-0.5 rounded-full bg-ember animate-eq-2" />
                        <span className="w-0.5 rounded-full bg-ember animate-eq-3" />
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-white/40">{i + 1}</span>
                    )}
                  </span>

                  {/* Track Thumbnail */}
                  <img
                    src={tThumb}
                    alt=""
                    className="size-10 shrink-0 rounded-xl object-cover ring-1 ring-white/15"
                  />

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-xs font-semibold ${
                        isCurrent ? "text-ember-soft" : "text-white/90"
                      }`}
                    >
                      {t.title}
                    </span>
                    <span className="block truncate text-[11px] text-white/50">
                      {t.artist}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Main Floating Glass Bottom Player Bar ─────────────── */}
      <div className="relative overflow-hidden rounded-full border border-white/15 bg-black/75 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:p-2.5">
        <div className="flex items-center gap-3">
          {/* Cover Art Thumbnail */}
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 sm:size-12">
            <img
              src={thumbnailUrl}
              alt={track.title}
              className={`size-full object-cover transition-transform duration-700 ${
                isPlaying ? "scale-110" : "scale-100"
              }`}
            />
            {isPlaying && (
              <span className="absolute inset-0 bg-ember/15 animate-pulse" />
            )}
          </div>

          {/* Track Meta & Seekbar */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold leading-tight text-white sm:text-sm">
                  {track.title}
                </p>
                <p className="truncate text-[11px] text-white/60 sm:text-xs">
                  {track.artist}
                </p>
              </div>
              <span className="tabular-nums shrink-0 text-[10px] text-white/50 sm:text-[11px]">
                {formatTime(cur)} / {formatTime(dur)}
              </span>
            </div>

            {/* Interactive Seek Bar */}
            <div
              className="group relative mt-1.5 flex h-2 w-full cursor-pointer items-center"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.min(
                  1,
                  Math.max(0, (e.clientX - rect.left) / rect.width)
                );
                seek(ratio * dur);
              }}
            >
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-ember transition-all duration-150"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Player Transport Controls */}
          <div className="flex items-center gap-1 shrink-0 sm:gap-2">
            {/* Prev Track */}
            <button
              type="button"
              onClick={prev}
              className="grid size-8 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Main Circular Play / Pause Button */}
            <button
              type="button"
              onClick={toggle}
              className="grid size-10 place-items-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 active:scale-95 sm:size-11"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5">
                  <path d="M8 5.14v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              type="button"
              onClick={next}
              className="grid size-8 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M6 18l8.5-6L6 6zm8.5 0h2V6h-2z" />
              </svg>
            </button>

            {/* Playlist Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen((open) => !open)}
              className={`grid size-8 place-items-center rounded-full transition-colors ${
                isDrawerOpen
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Toggle playlist drawer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden YouTube Iframe Engine */}
      <div className="absolute -left-[9999px] top-0 size-1 overflow-hidden opacity-0 pointer-events-none">
        <YouTubePlayer
          track={track}
          onPlayer={setPlayer}
          onStateChange={handleStateChange}
          onError={handleError}
        />
      </div>
    </div>
  );
}
