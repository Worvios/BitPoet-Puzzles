import type { CollectionConfig } from "payload";

export const Puzzles: CollectionConfig = {
  slug: "puzzles",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Memory", value: "memory" },
        { label: "Timed Quiz", value: "timedQuiz" },
      ],
      required: true,
    },
    {
      name: "difficulty",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    { name: "estimatedTimeSec", type: "number", required: true },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "memory",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "memory",
      },
      fields: [
        {
          name: "pairs",
          type: "array",
          fields: [
            { name: "id", type: "text", required: true },
            { name: "frontImage", type: "upload", relationTo: "media" },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "timedQuiz",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "timedQuiz",
      },
      fields: [
        { name: "timeLimitSec", type: "number", required: true },
        {
          name: "questions",
          type: "array",
          fields: [
            { name: "prompt", type: "textarea", required: true },
            {
              name: "options",
              type: "array",
              fields: [{ name: "value", type: "text", required: true }],
              minRows: 2,
            },
            { name: "correctIndex", type: "number", required: true },
            { name: "explanation", type: "textarea" },
          ],
        },
      ],
    },
  ],
};
