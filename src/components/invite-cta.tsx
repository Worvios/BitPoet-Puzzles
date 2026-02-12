"use client";

import { ShareBar } from "@/components/share-bar";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function InviteCTA() {
  const handleInvite = () => {
    trackEvent("invite_click", { utm_source: "invite", utm_campaign: "share" });
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleInvite}>Invite now</Button>
      <ShareBar title="Join me on BitPoet Puzzles" url="https://bitpoet.app" />
    </div>
  );
}
