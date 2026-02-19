import Link from "next/link";

function HorseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Simple stylized horse head silhouette */}
      <path
        d="M40 10c-5 0-9 3-11 7l-5-4-4 5 6 6c-1 3-1 6 0 10l-6 7v9h8l3-4h14l4 6h7V37c0-6-3-10-8-13l2-6-7 3c-1-7-1-11-3-11Z"
        className="fill-current"
      />
      <circle cx="41" cy="24" r="1.6" fill="#111827" />
    </svg>
  );
}

function LanternIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 8c7 0 12 4 14 11 2 7 2 19 0 26-2 7-7 11-14 11s-12-4-14-11c-2-7-2-19 0-26C20 12 25 8 32 8Z"
        className="fill-current"
        opacity="0.92"
      />
      <path
        d="M20 22h24M19 32h26M20 42h24"
        stroke="#111827"
        strokeOpacity="0.28"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 4v6"
        stroke="#111827"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 56v4"
        stroke="#111827"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FestiveHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-red-900/20 bg-gradient-to-r from-red-950 via-red-900 to-red-950">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-yellow-400/40 blur" />
            <div className="relative flex items-center gap-2 rounded-2xl bg-red-900/60 px-3 py-2 ring-1 ring-yellow-300/40">
              <LanternIcon className="h-6 w-6 text-yellow-300" />
              <HorseIcon className="h-6 w-6 text-yellow-300" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-yellow-100">
              aboundcny
            </div>
            <div className="text-[11px] text-yellow-200/80">Year of the Horse</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/teams"
            className="rounded-xl px-3 py-2 font-medium text-yellow-100 hover:bg-white/10"
          >
            Teams
          </Link>
          <Link
            href="/games"
            className="rounded-xl px-3 py-2 font-medium text-yellow-100 hover:bg-white/10"
          >
            Games
          </Link>
        </nav>
      </div>
    </header>
  );
}
