import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Chinese New Year Game
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">aboundcny</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            Make 4 fair teams fast. Add up to 30 names, then randomize into: Dog,
            Horse, Rabbit, Mouse.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/teams"
              className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Team randomizer
            </Link>
            <Link
              href="/games"
              className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Game wheel
            </Link>
            <Link
              href="/teams"
              className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Create teams
            </Link>
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            Local-only. No sign-in. Just vibes.
          </div>
        </div>
      </div>
    </div>
  );
}
