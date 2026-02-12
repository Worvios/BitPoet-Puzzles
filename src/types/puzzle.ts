export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type PuzzleType = "memory" | "timedQuiz";

export type BasePuzzle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PuzzleType;
  difficulty: Difficulty;
  estimatedTimeSec: number;
  heroImage?: string;
  tags: string[];
};

export type MemoryPair = {
  id: string;
  frontImage: string;
  label: string;
};

export type MemoryConfig = {
  pairs: MemoryPair[];
};

export type TimedQuizQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type TimedQuizConfig = {
  questions: TimedQuizQuestion[];
  timeLimitSec: number;
};

export type MemoryPuzzle = BasePuzzle & {
  type: "memory";
  memory: MemoryConfig;
};

export type TimedQuizPuzzle = BasePuzzle & {
  type: "timedQuiz";
  timedQuiz: TimedQuizConfig;
};

export type PuzzleContent = MemoryPuzzle | TimedQuizPuzzle;

export type QuizPack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTimeSec: number;
  heroImage?: string;
  tags: string[];
  timedQuiz: TimedQuizConfig;
};

export type CompletionPayload = {
  puzzleId: string;
  puzzleSlug: string;
  type: PuzzleType;
  difficulty: Difficulty;
  durationMs: number;
  score: number;
  resultLabel: string;
};
