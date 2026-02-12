import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { DailyChallenge } from "./src/payload/collections/daily-challenge";
import { LeaderboardEntries } from "./src/payload/collections/leaderboard-entries";
import { Media } from "./src/payload/collections/media";
import { Puzzles } from "./src/payload/collections/puzzles";
import { QuizPacks } from "./src/payload/collections/quiz-packs";
import { Tags } from "./src/payload/collections/tags";
import { Users } from "./src/payload/collections/users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"],
  admin: {
    user: "users",
    meta: {
      titleSuffix: "· BitPoet CMS",
    },
  },
  collections: [
    Users,
    Media,
    Tags,
    Puzzles,
    QuizPacks,
    DailyChallenge,
    LeaderboardEntries,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
});
