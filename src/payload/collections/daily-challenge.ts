import type { CollectionConfig } from "payload";

export const DailyChallenge: CollectionConfig = {
  slug: "dailyChallenge",
  admin: {
    useAsTitle: "date",
  },
  fields: [
    { name: "date", type: "date", required: true },
    {
      name: "puzzle",
      type: "relationship",
      relationTo: "puzzles",
      required: true,
    },
    { name: "headline", type: "text" },
  ],
};
