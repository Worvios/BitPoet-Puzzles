import { LeaderboardTable } from "@/components/leaderboard-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-h1 font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track top scores across daily, weekly, and all-time challenges.
        </p>
      </header>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="all">All-time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <LeaderboardTable />
        </TabsContent>
        <TabsContent value="weekly">
          <LeaderboardTable />
        </TabsContent>
        <TabsContent value="all">
          <LeaderboardTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
