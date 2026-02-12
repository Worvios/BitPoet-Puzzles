import { FilterBar } from "@/components/filter-bar";
import { QuizCard } from "@/components/quiz-card";
import { getQuizzes } from "@/lib/content";

export const revalidate = 60;

export default async function QuizzesPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-h1 font-semibold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">
          Timed, shareable quiz packs designed for viral play.
        </p>
      </header>
      <FilterBar />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
