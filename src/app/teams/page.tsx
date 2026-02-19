"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TEAM_NAMES = ["Dog", "Horse", "Rabbit", "Mouse"] as const;

type TeamName = (typeof TEAM_NAMES)[number];

type Teams = Record<TeamName, string[]>;

function shuffle<T>(arr: T[]): T[] {
  // Fisher–Yates
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distributeEvenly(names: string[]): Teams {
  const shuffled = shuffle(names);
  const teams: Teams = {
    Dog: [],
    Horse: [],
    Rabbit: [],
    Mouse: [],
  };

  for (let i = 0; i < shuffled.length; i++) {
    const team = TEAM_NAMES[i % TEAM_NAMES.length];
    teams[team].push(shuffled[i]);
  }

  return teams;
}

export default function TeamsPage() {
  const [draftName, setDraftName] = useState("");
  const [people, setPeople] = useState<string[]>([]);
  const [teams, setTeams] = useState<Teams | null>(null);
  const [points, setPoints] = useState<Record<TeamName, number>>({
    Dog: 0,
    Horse: 0,
    Rabbit: 0,
    Mouse: 0,
  });

  const canAdd = useMemo(() => {
    const trimmed = draftName.trim();
    return trimmed.length > 0 && people.length < 30;
  }, [draftName, people.length]);

  function addPerson() {
    const name = draftName.trim();
    if (!name) return;
    if (people.length >= 30) return;

    setPeople((prev) => [...prev, name]);
    setDraftName("");
    setTeams(null);
  }

  function removePerson(idx: number) {
    setPeople((prev) => prev.filter((_, i) => i !== idx));
    setTeams(null);
  }

  function randomizeTeams() {
    if (people.length === 0) return;
    setTeams(distributeEvenly(people));
  }

  function resetAll() {
    setDraftName("");
    setPeople([]);
    setTeams(null);
  }

  function adjustPoints(team: TeamName, delta: number) {
    setPoints((prev) => ({ ...prev, [team]: (prev[team] ?? 0) + delta }));
  }

  function resetPoints() {
    setPoints({ Dog: 0, Horse: 0, Rabbit: 0, Mouse: 0 });
  }

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <header className="mb-8">
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">Team creation</h1>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              ← Back
            </Link>
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Add up to 30 people, then randomize into 4 balanced teams.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-red-900/20 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h2 className="text-lg font-semibold text-red-950">People</h2>

            <div className="mt-4 flex gap-2">
              <input
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                placeholder="Enter a name…"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addPerson();
                }}
              />
              <button
                className="shrink-0 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                onClick={addPerson}
                disabled={!canAdd}
              >
                Add
              </button>
            </div>

            <div className="mt-3 text-xs text-zinc-600">
              {people.length}/30 added
              {people.length >= 30 ? " (limit reached)" : ""}
            </div>

            <div className="mt-4">
              {people.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
                  No people yet.
                </div>
              ) : (
                <ul className="max-h-[420px] space-y-2 overflow-auto pr-1">
                  {people.map((p, idx) => (
                    <li
                      key={`${p}-${idx}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2"
                    >
                      <span className="truncate text-sm">{p}</span>
                      <button
                        className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
                        onClick={() => removePerson(idx)}
                        aria-label={`Remove ${p}`}
                        title="Remove"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                onClick={randomizeTeams}
                disabled={people.length === 0}
              >
                Randomize
              </button>
              <button
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                onClick={resetAll}
              >
                Reset names
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-red-950">Points</h3>
                <button
                  onClick={resetPoints}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-red-900 hover:bg-yellow-100"
                >
                  Reset points
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {TEAM_NAMES.map((team) => (
                  <div
                    key={`points-${team}`}
                    className="rounded-xl border border-red-900/10 bg-white px-3 py-3"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs font-semibold text-zinc-700">{team}</div>
                      <div className="text-lg font-semibold text-red-950">
                        {points[team] ?? 0}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => adjustPoints(team, -1)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                        aria-label={`Subtract 1 point from ${team}`}
                      >
                        −1
                      </button>
                      <button
                        onClick={() => adjustPoints(team, +1)}
                        className="w-full rounded-lg bg-red-700 px-2 py-2 text-sm font-semibold text-yellow-100 hover:bg-red-800"
                        aria-label={`Add 1 point to ${team}`}
                      >
                        +1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-red-900/20 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-red-950">Teams</h2>
              {teams ? (
                <span className="text-xs text-zinc-700">Even distribution</span>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TEAM_NAMES.map((team) => {
                const members = teams?.[team] ?? [];
                return (
                  <div
                    key={team}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-semibold">{team}</h3>
                      <span className="text-xs text-zinc-600">{members.length}</span>
                    </div>

                    {members.length === 0 ? (
                      <div className="mt-2 text-sm text-zinc-500">
                        {teams ? "—" : "Randomize to generate"}
                      </div>
                    ) : (
                      <ul className="mt-3 space-y-1">
                        {members.map((m, i) => (
                          <li
                            key={`${team}-${m}-${i}`}
                            className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm"
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-zinc-600">
              Tip: click Randomize again for a new shuffle.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
