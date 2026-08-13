"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [hours, setHours] = useState("--");
  const [minutes, setMinutes] = useState("--");
  const [seconds, setSeconds] = useState("--");
  const [listeners, setListeners] = useState(384);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const parts = new Intl.DateTimeFormat("en-IN", options).formatToParts(now);
      const h = parts.find((p) => p.type === "hour")?.value || "--";
      const m = parts.find((p) => p.type === "minute")?.value || "--";
      const s = parts.find((p) => p.type === "second")?.value || "--";
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Subtle natural fluctuation in listener count for realistic liveliness
    const listenerInterval = setInterval(() => {
      setListeners((prev) => prev + (Math.floor(Math.random() * 5) - 2));
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(listenerInterval);
    };
  }, []);

  return (
    <div className="flex shrink-0 flex-col items-end gap-1 text-right">
      <p className="flex items-baseline font-mono text-base font-semibold tracking-tight text-white/90 sm:text-lg">
        <span>{hours}</span>
        <span className="blink-colon px-0.5 text-ember-soft">:</span>
        <span>{minutes}</span>
        <span className="ml-1 text-[10px] text-white/45 sm:text-[11px]">{seconds}</span>
      </p>

      <p className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 sm:text-[11px]">
        <span className="relative flex size-2 shrink-0">
          <span className="animate-beacon absolute inset-0 rounded-full bg-ember" />
          <span className="relative size-2 rounded-full bg-ember" />
        </span>
        <span className="tabular-nums text-white/90 font-bold">{listeners}</span>
        <span className="text-white/45 tracking-widest sm:inline">ABOARD · শ্রুতা</span>
      </p>
    </div>
  );
}
