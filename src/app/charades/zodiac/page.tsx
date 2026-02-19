"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const ZODIAC = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
] as const;

type Zodiac = (typeof ZODIAC)[number];

function pickRandom<T>(arr: T[]): { item: T; index: number } {
  const index = Math.floor(Math.random() * arr.length);
  return { item: arr[index], index };
}

export default function ZodiacCharadesPage() {
  const [remaining, setRemaining] = useState<Zodiac[]>([...ZODIAC]);
  const [picked, setPicked] = useState<Zodiac | null>(null);

  const progress = useMemo(() => `${12 - remaining.length}/12 used`, [remaining.length]);

  function reset() {
    setRemaining([...ZODIAC]);
    setPicked(null);
  }

  function generate() {
    if (remaining.length === 0) return;
    const { item } = pickRandom(remaining);
    setPicked(item);
    setRemaining((prev) => prev.filter((z) => z !== item));
  }

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <header className="mb-8">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-red-950/70">
                Game
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-red-950">
                Zodiac Charades
              </h1>
              <p className="mt-2 text-sm text-red-950/70">
                Generate a zodiac animal at random. No repeats until you reset.
              </p>
            </div>
            <Link
              href="/games"
              className="text-sm font-medium text-red-950/80 hover:text-red-950"
            >
              ← Back to Games
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-5 rounded-2xl border border-red-900/20 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-red-950">Controls</h2>
              <span className="text-xs text-red-950/70">{progress}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={generate}
                disabled={remaining.length === 0}
                className="rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-yellow-100 hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate
              </button>
              <button
                onClick={reset}
                className="rounded-xl border border-yellow-400/50 bg-white/10 px-4 py-2 text-sm font-semibold text-red-950 hover:bg-white/15"
              >
                Reset
              </button>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-red-950/70">
                Current
              </div>
              <div className="mt-2 rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 p-6 text-center">
                <div className="text-3xl font-semibold tracking-tight text-red-950">
                  {picked ?? "—"}
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-7 rounded-2xl border border-red-900/20 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-red-950">Remaining</h2>
              <span className="text-xs text-red-950/70">{remaining.length}/12</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {remaining.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-red-900/30 bg-white/50 p-4 text-sm text-red-950/70">
                  No animals left. Hit Reset.
                </div>
              ) : (
                remaining.map((z) => (
                  <div
                    key={z}
                    className="rounded-xl border border-red-900/15 bg-white px-3 py-2 text-sm font-medium text-red-950"
                  >
                    {z}
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 text-xs text-red-950/70">
              Tip: if you want a faster game, set a timer and act it out.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
