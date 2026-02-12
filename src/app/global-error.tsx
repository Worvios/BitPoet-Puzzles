"use client";

import * as Sentry from "@sentry/nextjs";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Sentry.captureException(error);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="max-w-md space-y-4 rounded-3xl border bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              We logged the issue. Try reloading or return to the homepage.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Go home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
