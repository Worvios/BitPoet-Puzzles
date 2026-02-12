import type { CollectionConfig } from "payload";

export const QuizPacks: CollectionConfig = {
  slug: "quizPacks",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", required: true },
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
      name: "timedQuiz",
      type: "group",
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
