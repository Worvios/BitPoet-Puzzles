import config from "../payload.config";
import { getPayload } from "payload";

async function seed() {
  const payload = await getPayload({ config });

  const tags = await Promise.all(
    ["memory", "timed", "viral", "daily", "hard"].map((name) =>
      payload.create({
        collection: "tags",
        data: { name, slug: name },
      })
    )
  );

  const aurora = await payload.create({
    collection: "puzzles",
    data: {
      title: "Aurora Memory",
      slug: "aurora-memory",
      description: "Match luminous aurora cards before time runs out.",
      type: "memory",
      difficulty: 2,
      estimatedTimeSec: 90,
      tags: [tags[0].id, tags[3].id],
      memory: {
        pairs: [
          { id: "a1", label: "Aurora" },
          { id: "a2", label: "Arctic" },
          { id: "a3", label: "Nebula" },
          { id: "a4", label: "Comet" },
        ],
      },
    },
  });

  await payload.create({
    collection: "puzzles",
    data: {
      title: "Solar Flip",
      slug: "solar-flip",
      description: "A high-intensity memory flip with solar icons.",
      type: "memory",
      difficulty: 4,
      estimatedTimeSec: 75,
      tags: [tags[0].id, tags[4].id],
      memory: {
        pairs: [
          { id: "s1", label: "Corona" },
          { id: "s2", label: "Flare" },
          { id: "s3", label: "Orbit" },
          { id: "s4", label: "Zenith" },
        ],
      },
    },
  });

  await payload.create({
    collection: "puzzles",
    data: {
      title: "Nebula Pairs",
      slug: "nebula-pairs",
      description: "Glassy nebula tiles with a gentle rhythm.",
      type: "memory",
      difficulty: 1,
      estimatedTimeSec: 60,
      tags: [tags[0].id, tags[3].id],
      memory: {
        pairs: [
          { id: "n1", label: "Nebula" },
          { id: "n2", label: "Stellar" },
          { id: "n3", label: "Cosmos" },
          { id: "n4", label: "Orbit" },
        ],
      },
    },
  });

  await payload.create({
    collection: "puzzles",
    data: {
      title: "Tempo Trivia",
      slug: "tempo-trivia",
      description: "Answer music, rhythm, and tempo questions on the clock.",
      type: "timedQuiz",
      difficulty: 3,
      estimatedTimeSec: 120,
      tags: [tags[1].id, tags[2].id],
      timedQuiz: {
        timeLimitSec: 60,
        questions: [
          {
            prompt: "What does BPM stand for?",
            options: [
              { value: "Beats Per Minute" },
              { value: "Bars Per Measure" },
              { value: "Bass Pitch Modulation" },
              { value: "Beat Pulse Mode" },
            ],
            correctIndex: 0,
          },
          {
            prompt: "Which tempo marking is typically the fastest?",
            options: [
              { value: "Lento" },
              { value: "Moderato" },
              { value: "Presto" },
              { value: "Adagio" },
            ],
            correctIndex: 2,
          },
        ],
      },
    },
  });

  await payload.create({
    collection: "puzzles",
    data: {
      title: "Velocity Vault",
      slug: "velocity-vault",
      description: "Physics meets speed in this timed knowledge sprint.",
      type: "timedQuiz",
      difficulty: 5,
      estimatedTimeSec: 150,
      tags: [tags[1].id, tags[4].id],
      timedQuiz: {
        timeLimitSec: 75,
        questions: [
          {
            prompt: "Which unit measures acceleration?",
            options: [
              { value: "m/s" },
              { value: "m/s²" },
              { value: "kg·m/s" },
              { value: "N·m" },
            ],
            correctIndex: 1,
          },
        ],
      },
    },
  });

  await payload.create({
    collection: "quizPacks",
    data: {
      title: "Modern Myths",
      slug: "modern-myths",
      description: "A fast quiz on internet legends and viral lore.",
      difficulty: 2,
      estimatedTimeSec: 120,
      tags: [tags[2].id],
      timedQuiz: {
        timeLimitSec: 80,
        questions: [
          {
            prompt: "Which platform popularized short-form looping videos?",
            options: [
              { value: "Vine" },
              { value: "TikTok" },
              { value: "Instagram" },
              { value: "Snapchat" },
            ],
            correctIndex: 0,
          },
        ],
      },
    },
  });

  await payload.create({
    collection: "quizPacks",
    data: {
      title: "Speedy Cities",
      slug: "speedy-cities",
      description: "Timed geography quiz on fastest-growing cities.",
      difficulty: 3,
      estimatedTimeSec: 140,
      tags: [tags[1].id],
      timedQuiz: {
        timeLimitSec: 90,
        questions: [
          {
            prompt: "Which city is known as the City of a Thousand Minarets?",
            options: [
              { value: "Cairo" },
              { value: "Istanbul" },
              { value: "Delhi" },
              { value: "Marrakesh" },
            ],
            correctIndex: 0,
          },
        ],
      },
    },
  });

  await payload.create({
    collection: "quizPacks",
    data: {
      title: "Pixel Prodigy",
      slug: "pixel-prodigy",
      description: "A snappy quiz on retro gaming and pixel art.",
      difficulty: 1,
      estimatedTimeSec: 90,
      tags: [tags[2].id],
      timedQuiz: {
        timeLimitSec: 60,
        questions: [
          {
            prompt: "Which console popularized the D-pad?",
            options: [
              { value: "Nintendo Entertainment System" },
              { value: "Atari 2600" },
              { value: "Sega Genesis" },
              { value: "PlayStation" },
            ],
            correctIndex: 0,
          },
        ],
      },
    },
  });

  await payload.create({
    collection: "dailyChallenge",
    data: {
      date: new Date().toISOString(),
      puzzle: aurora.id,
      headline: "New streak ready",
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
