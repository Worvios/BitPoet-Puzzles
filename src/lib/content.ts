import { cache } from "react";
import type { PuzzleContent, QuizPack } from "@/types/puzzle";

const payloadApi = process.env.PAYLOAD_API_URL ||
  process.env.NEXT_PUBLIC_SITE_URL;

const shouldUsePayload = Boolean(payloadApi);

type PayloadDoc<T> = {
  docs: T[];
};

const mapPuzzle = (doc: any): PuzzleContent => {
  const base = {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    type: doc.type,
    difficulty: doc.difficulty,
    estimatedTimeSec: doc.estimatedTimeSec,
    heroImage: doc.heroImage?.url,
    tags: (doc.tags || []).map((tag: any) => tag.slug || tag),
  };

  if (doc.type === "memory") {
    return {
      ...base,
      type: "memory",
      memory: {
        pairs: (doc.memory?.pairs || []).map((pair: any) => ({
          id: pair.id,
          frontImage: pair.frontImage?.url,
          label: pair.label,
        })),
      },
    };
  }

  return {
    ...base,
    type: "timedQuiz",
    timedQuiz: {
      timeLimitSec: doc.timedQuiz?.timeLimitSec || 60,
      questions: (doc.timedQuiz?.questions || []).map((question: any) => ({
        prompt: question.prompt,
        options: (question.options || []).map((option: any) => option.value),
        correctIndex: question.correctIndex,
        explanation: question.explanation,
      })),
    },
  };
};

const mapQuiz = (doc: any): QuizPack => ({
  id: doc.id,
  slug: doc.slug,
  title: doc.title,
  description: doc.description,
  difficulty: doc.difficulty,
  estimatedTimeSec: doc.estimatedTimeSec,
  heroImage: doc.heroImage?.url,
  tags: (doc.tags || []).map((tag: any) => tag.slug || tag),
  timedQuiz: {
    timeLimitSec: doc.timedQuiz?.timeLimitSec || 60,
    questions: (doc.timedQuiz?.questions || []).map((question: any) => ({
      prompt: question.prompt,
      options: (question.options || []).map((option: any) => option.value),
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    })),
  },
});

const puzzles: PuzzleContent[] = [
  {
    id: "p1",
    slug: "aurora-memory",
    title: "Aurora Memory",
    description: "Match luminous aurora cards before time runs out.",
    type: "memory",
    difficulty: 2,
    estimatedTimeSec: 90,
    heroImage: "/images/placeholder.svg",
    tags: ["memory", "visual", "relaxing"],
    memory: {
      pairs: [
        { id: "a1", frontImage: "/images/card-placeholder.svg", label: "Aurora" },
        { id: "a2", frontImage: "/images/card-placeholder.svg", label: "Arctic" },
        { id: "a3", frontImage: "/images/card-placeholder.svg", label: "Nebula" },
        { id: "a4", frontImage: "/images/card-placeholder.svg", label: "Comet" },
        { id: "a5", frontImage: "/images/card-placeholder.svg", label: "Polaris" },
        { id: "a6", frontImage: "/images/card-placeholder.svg", label: "Aurora Wave" },
      ],
    },
  },
  {
    id: "p2",
    slug: "tempo-trivia",
    title: "Tempo Trivia",
    description: "Answer music, rhythm, and tempo questions on the clock.",
    type: "timedQuiz",
    difficulty: 3,
    estimatedTimeSec: 120,
    heroImage: "/images/placeholder.svg",
    tags: ["quiz", "music", "timed"],
    timedQuiz: {
      timeLimitSec: 60,
      questions: [
        {
          prompt: "What does BPM stand for?",
          options: ["Beats Per Minute", "Bars Per Measure", "Bass Pitch Modulation", "Beat Pulse Mode"],
          correctIndex: 0,
        },
        {
          prompt: "Which tempo marking is typically the fastest?",
          options: ["Lento", "Moderato", "Presto", "Adagio"],
          correctIndex: 2,
        },
        {
          prompt: "A 4/4 time signature means:",
          options: ["Four beats per measure", "Four measures per beat", "Four beats in a bar of eight", "A half-time rhythm"],
          correctIndex: 0,
        },
        {
          prompt: "Which instrument often sets tempo in orchestras?",
          options: ["Conductor", "Violin", "Timpani", "Flute"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "p3",
    slug: "solar-flip",
    title: "Solar Flip",
    description: "A high-intensity memory flip with solar icons.",
    type: "memory",
    difficulty: 4,
    estimatedTimeSec: 75,
    heroImage: "/images/placeholder.svg",
    tags: ["memory", "hard", "fast"],
    memory: {
      pairs: [
        { id: "s1", frontImage: "/images/card-placeholder.svg", label: "Corona" },
        { id: "s2", frontImage: "/images/card-placeholder.svg", label: "Flare" },
        { id: "s3", frontImage: "/images/card-placeholder.svg", label: "Orbit" },
        { id: "s4", frontImage: "/images/card-placeholder.svg", label: "Zenith" },
        { id: "s5", frontImage: "/images/card-placeholder.svg", label: "Helios" },
        { id: "s6", frontImage: "/images/card-placeholder.svg", label: "Eclipse" },
      ],
    },
  },
  {
    id: "p4",
    slug: "velocity-vault",
    title: "Velocity Vault",
    description: "Physics meets speed in this timed knowledge sprint.",
    type: "timedQuiz",
    difficulty: 5,
    estimatedTimeSec: 150,
    heroImage: "/images/placeholder.svg",
    tags: ["quiz", "science", "hard"],
    timedQuiz: {
      timeLimitSec: 75,
      questions: [
        {
          prompt: "Which unit measures acceleration?",
          options: ["m/s", "m/s²", "kg·m/s", "N·m"],
          correctIndex: 1,
        },
        {
          prompt: "What is the speed of light (approx)?",
          options: ["300,000 km/s", "150,000 km/s", "30,000 km/s", "3,000 km/s"],
          correctIndex: 0,
        },
        {
          prompt: "A change in velocity over time is:",
          options: ["Momentum", "Acceleration", "Force", "Mass"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "p5",
    slug: "nebula-pairs",
    title: "Nebula Pairs",
    description: "Glassy nebula tiles with a gentle rhythm.",
    type: "memory",
    difficulty: 1,
    estimatedTimeSec: 60,
    heroImage: "/images/placeholder.svg",
    tags: ["memory", "daily", "calm"],
    memory: {
      pairs: [
        { id: "n1", frontImage: "/images/card-placeholder.svg", label: "Nebula" },
        { id: "n2", frontImage: "/images/card-placeholder.svg", label: "Stellar" },
        { id: "n3", frontImage: "/images/card-placeholder.svg", label: "Cosmos" },
        { id: "n4", frontImage: "/images/card-placeholder.svg", label: "Orbit" },
      ],
    },
  },
];

const quizPacks: QuizPack[] = [
  {
    id: "q1",
    slug: "modern-myths",
    title: "Modern Myths",
    description: "A fast quiz on internet legends and viral lore.",
    difficulty: 2,
    estimatedTimeSec: 120,
    heroImage: "/images/placeholder.svg",
    tags: ["viral", "fun"],
    timedQuiz: {
      timeLimitSec: 80,
      questions: [
        {
          prompt: "Which platform popularized short-form looping videos?",
          options: ["Vine", "TikTok", "Instagram", "Snapchat"],
          correctIndex: 0,
        },
        {
          prompt: "What does " +
            "OG" +
            " typically stand for online?",
          options: ["Original", "Outstanding Gamer", "Open Guild", "Outer Galaxy"],
          correctIndex: 0,
        },
        {
          prompt: "A " +
            "meme" +
            " is best described as:",
          options: ["A single post", "A shared cultural idea", "A private message", "A news article"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: "q2",
    slug: "speedy-cities",
    title: "Speedy Cities",
    description: "Timed geography quiz on fastest-growing cities.",
    difficulty: 3,
    estimatedTimeSec: 140,
    heroImage: "/images/placeholder.svg",
    tags: ["geography", "timed"],
    timedQuiz: {
      timeLimitSec: 90,
      questions: [
        {
          prompt: "Which city is known as the City of a Thousand Minarets?",
          options: ["Cairo", "Istanbul", "Delhi", "Marrakesh"],
          correctIndex: 0,
        },
        {
          prompt: "Which city has the longest metro system by route length?",
          options: ["Shanghai", "London", "New York", "Tokyo"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "q3",
    slug: "pixel-prodigy",
    title: "Pixel Prodigy",
    description: "A snappy quiz on retro gaming and pixel art.",
    difficulty: 1,
    estimatedTimeSec: 90,
    heroImage: "/images/placeholder.svg",
    tags: ["gaming", "retro"],
    timedQuiz: {
      timeLimitSec: 60,
      questions: [
        {
          prompt: "Which console popularized the D-pad?",
          options: ["Nintendo Entertainment System", "Atari 2600", "Sega Genesis", "PlayStation"],
          correctIndex: 0,
        },
        {
          prompt: "Pixels are arranged in:",
          options: ["Vectors", "Grids", "Layers", "Channels"],
          correctIndex: 1,
        },
      ],
    },
  },
];

export const getPuzzles = cache(async () => {
  if (!shouldUsePayload) return puzzles;
  const response = await fetch(`${payloadApi}/api/puzzles?depth=2`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return puzzles;
  const data = (await response.json()) as PayloadDoc<any>;
  return data.docs.map(mapPuzzle);
});

export const getPuzzleBySlug = cache(async (slug: string) => {
  if (!shouldUsePayload) return puzzles.find((puzzle) => puzzle.slug === slug);
  const response = await fetch(
    `${payloadApi}/api/puzzles?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) return puzzles.find((puzzle) => puzzle.slug === slug);
  const data = (await response.json()) as PayloadDoc<any>;
  return data.docs[0] ? mapPuzzle(data.docs[0]) : undefined;
});

export const getQuizzes = cache(async () => {
  if (!shouldUsePayload) return quizPacks;
  const response = await fetch(`${payloadApi}/api/quizPacks?depth=2`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return quizPacks;
  const data = (await response.json()) as PayloadDoc<any>;
  return data.docs.map(mapQuiz);
});

export const getQuizBySlug = cache(async (slug: string) => {
  if (!shouldUsePayload) return quizPacks.find((quiz) => quiz.slug === slug);
  const response = await fetch(
    `${payloadApi}/api/quizPacks?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) return quizPacks.find((quiz) => quiz.slug === slug);
  const data = (await response.json()) as PayloadDoc<any>;
  return data.docs[0] ? mapQuiz(data.docs[0]) : undefined;
});

export const getDailyChallenge = cache(async () => {
  if (!shouldUsePayload) return puzzles[0];
  const response = await fetch(`${payloadApi}/api/dailyChallenge?depth=2`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return puzzles[0];
  const data = (await response.json()) as PayloadDoc<any>;
  const doc = data.docs[0];
  if (!doc?.puzzle) return puzzles[0];
  return mapPuzzle(doc.puzzle);
});
