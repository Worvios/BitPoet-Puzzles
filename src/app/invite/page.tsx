import { InviteCTA } from "@/components/invite-cta";
import { Card } from "@/components/ui/card";

export default function InvitePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-h1 font-semibold tracking-tight">Invite friends</h1>
        <p className="text-muted-foreground">
          Challenge friends and unlock referral rewards (coming soon).
        </p>
      </header>

      <Card className="p-6 glass-card">
        <h2 className="text-lg font-semibold">Share BitPoet Puzzles</h2>
        <p className="text-sm text-muted-foreground">
          Your invite link boosts their first score and locks in your early adopter
          perks.
        </p>
        <div className="mt-4">
          <InviteCTA />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold">Referral rewards</h3>
        <p className="text-sm text-muted-foreground">
          Coming soon: streak shields, exclusive badges, and bonus points for
          every friend you bring in.
        </p>
      </Card>
    </div>
  );
}
