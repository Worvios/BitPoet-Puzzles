import type { CollectionConfig } from "payload";

export const LeaderboardEntries: CollectionConfig = {
  slug: "leaderboardEntries",
  admin: {
    useAsTitle: "puzzleSlug",
  },
  fields: [
    { name: "puzzleSlug", type: "text", required: true },
    { name: "userId", type: "text" },
    { name: "score", type: "number", required: true },
    { name: "timeMs", type: "number" },
    { name: "createdAt", type: "date", required: true },
  ],
};
