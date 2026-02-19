import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-full rounded-3xl border border-red-900/25 bg-gradient-to-br from-red-950 via-red-900 to-red-950 p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-widest text-yellow-200/80">
            Chinese New Year Game
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-yellow-100">
            aboundcny
          </h1>
          {/* removed subtitle */}

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/teams"
              className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-red-950 hover:bg-yellow-300"
            >
              Team randomizer
            </Link>
            <Link
              href="/games"
              className="rounded-2xl border border-yellow-400/50 bg-white/10 px-6 py-3 text-sm font-semibold text-yellow-100 hover:bg-white/15"
            >
              Game wheel
            </Link>
          </div>

          {/* removed footer text */}
        </div>
      </div>
    </div>
  );
}
