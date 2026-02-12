"use client";

import { useState } from "react";
import {
  Copy,
  Facebook,
  Link as LinkIcon,
  Share2,
  Twitter,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { trackEvent } from "@/lib/analytics";

export function ShareBar({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const utmUrl = `${url}${url.includes("?") ? "&" : "?"}utm_source=challenge&utm_campaign=share`;

  const share = (type: string, shareUrl: string) => {
    trackEvent("share_click", { utm_source: type, utm_campaign: "share" });
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: "Link copied", description: "Share it with a friend!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Share on WhatsApp"
        onClick={() =>
          share(
            "whatsapp",
            `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
          )
        }
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Share on X"
        onClick={() =>
          share(
            "x",
            `https://x.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(url)}`
          )
        }
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Share on Facebook"
        onClick={() =>
          share(
            "facebook",
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`
          )
        }
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Copy link"
        onClick={handleCopy}
      >
        {copied ? <Copy className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() => share("challenge", utmUrl)}
      >
        <Share2 className="h-4 w-4" />
        Challenge a friend
      </Button>
    </div>
  );
}
