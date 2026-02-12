import { Badge } from "@/components/ui/badge";

export function TimePill({ seconds }: { seconds: number }) {
  return (
    <Badge variant="ghost" className="rounded-full">
      {Math.ceil(seconds / 60)} min
    </Badge>
  );
}
