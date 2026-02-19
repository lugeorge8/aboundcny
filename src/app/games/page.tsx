"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const ALL_GAMES = [
  "M&M Mayhem",
  "Star(burst) Tower",
  "Spoon Walk",
  "Zodiac Charades",
  "Balloon Cup Push",
  "Rock Paper Scissors Snake",
  "Mystery Phone Game",
  "Split or Steal",
] as const;

type Game = (typeof ALL_GAMES)[number];

function pickRandom<T>(arr: T[]): { item: T; index: number } {
  const index = Math.floor(Math.random() * arr.length);
  return { item: arr[index], index };
}

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngleRad: number,
  endAngleRad: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngleRad);
  const end = polarToCartesian(cx, cy, r, startAngleRad);
  const largeArcFlag = endAngleRad - startAngleRad <= Math.PI ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export default function GamesPage() {
  const [remaining, setRemaining] = useState<Game[]>([...ALL_GAMES]);
  const [selected, setSelected] = useState<Game | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  const total = remaining.length;

  const slices = useMemo(() => {
    const n = Math.max(total, 1);
    const colors = [
      "#111827",
      "#0f766e",
      "#7c3aed",
      "#b91c1c",
      "#1d4ed8",
      "#92400e",
      "#047857",
      "#6b7280",
    ];

    return Array.from({ length: n }, (_, i) => {
      const start = (i / n) * Math.PI * 2;
      const end = ((i + 1) / n) * Math.PI * 2;
      return {
        i,
        start,
        end,
        color: colors[i % colors.length],
      };
    });
  }, [total]);

  function resetGames() {
    setRemaining([...ALL_GAMES]);
    setSelected(null);
    setRotationDeg(0);
    setSpinning(false);
  }

  function spin() {
    if (spinning) return;
    if (remaining.length === 0) return;

    setSpinning(true);

    const { item, index } = pickRandom(remaining);

    // Wheel math: pointer is at 12 o'clock. We rotate wheel so that the selected
    // slice center aligns with -90deg.
    const n = remaining.length;
    const sliceSizeDeg = 360 / n;
    const sliceCenterDeg = index * sliceSizeDeg + sliceSizeDeg / 2;

    const extraSpins = 4 + Math.floor(Math.random() * 3); // 4–6 spins
    const targetDeg = extraSpins * 360 + (360 - sliceCenterDeg);

    // add to current rotation so consecutive spins still feel natural
    const nextRotation = rotationDeg + targetDeg;
    setRotationDeg(nextRotation);

    window.setTimeout(() => {
      setSelected(item);
      setRemaining((prev) => prev.filter((g) => g !== item));
      setSpinning(false);
    }, 2400);
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mb-8">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Chinese New Year Game
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Games</h1>
              <p className="mt-2 text-sm text-zinc-600">
                Spin to pick a game. Picked games are removed from the list.
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              ← Home
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Remaining</h2>
              <span className="text-xs text-zinc-600">{remaining.length}/8</span>
            </div>

            <ul className="mt-4 space-y-2">
              {remaining.length === 0 ? (
                <li className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
                  No games left.
                </li>
              ) : (
                remaining.map((g) => (
                  <li
                    key={g}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm"
                  >
                    {g}
                  </li>
                ))
              )}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={spin}
                disabled={spinning || remaining.length === 0}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {spinning ? "Spinning…" : "Spin"}
              </button>
              <button
                onClick={resetGames}
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 text-sm">
              <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Selected
              </div>
              <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-base font-semibold">
                  {selected ?? "—"}
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Wheel</h2>
              <span className="text-xs text-zinc-600">
                {remaining.length ? "" : "Reset to spin again"}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <div className="relative">
                {/* Pointer */}
                <div className="pointer-events-none absolute left-1/2 top-[-10px] z-10 h-0 w-0 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-zinc-900" />

                <svg
                  width={360}
                  height={360}
                  viewBox="0 0 360 360"
                  className="rounded-full"
                  style={{
                    transform: `rotate(${rotationDeg}deg)`,
                    transition: spinning
                      ? "transform 2400ms cubic-bezier(0.12, 0.78, 0.13, 0.99)"
                      : "transform 0ms",
                  }}
                >
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="4"
                        floodOpacity="0.25"
                      />
                    </filter>
                  </defs>

                  <g filter="url(#shadow)">
                    {slices.map((s) => (
                      <path
                        key={s.i}
                        d={describeArc(180, 180, 170, s.start - Math.PI / 2, s.end - Math.PI / 2)}
                        fill={s.color}
                      />
                    ))}

                    {/* Labels */}
                    {remaining.length > 0
                      ? remaining.map((g, i) => {
                          const n = remaining.length;
                          const angle = (i / n) * Math.PI * 2 + Math.PI / n - Math.PI / 2;
                          const pos = polarToCartesian(180, 180, 110, angle);
                          const rotate = (angle * 180) / Math.PI;
                          return (
                            <text
                              key={g}
                              x={pos.x}
                              y={pos.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight={600}
                              transform={`rotate(${rotate}, ${pos.x}, ${pos.y})`}
                            >
                              {g.length > 18 ? `${g.slice(0, 18)}…` : g}
                            </text>
                          );
                        })
                      : null}
                  </g>

                  {/* Center cap */}
                  <circle cx="180" cy="180" r="44" fill="#ffffff" stroke="#e4e4e7" />
                  <text
                    x="180"
                    y="180"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#111827"
                    fontSize="12"
                    fontWeight={700}
                  >
                    SPIN
                  </text>
                </svg>
              </div>
            </div>

            <div className="mt-5 text-xs text-zinc-600">
              Note: wheel labels truncate long game names.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
