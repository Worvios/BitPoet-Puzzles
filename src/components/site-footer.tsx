import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/90">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8 md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground">BitPoet Puzzles</h3>
          <p>Viral puzzles crafted for daily streaks and shareable wins.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Explore</h4>
          <ul className="space-y-1">
            <li>
              <Link className="hover:text-foreground" href="/puzzles">
                Puzzles
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/quizzes">
                Quizzes
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/daily">
                Daily Challenge
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Community</h4>
          <ul className="space-y-1">
            <li>
              <Link className="hover:text-foreground" href="/leaderboard">
                Leaderboard
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/invite">
                Invite friends
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3 text-xs text-muted-foreground">
          © 2026 BitPoet Puzzles. Crafted for delight.
        </div>
      </div>
    </footer>
  );
}
