import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sampleEntries = [
  { rank: 1, name: "NebulaFox", score: 980, time: "00:52" },
  { rank: 2, name: "TempoMint", score: 940, time: "01:02" },
  { rank: 3, name: "AuroraSky", score: 920, time: "01:10" },
  { rank: 4, name: "PixelSage", score: 905, time: "01:24" },
  { rank: 5, name: "NovaPulse", score: 880, time: "01:32" },
];

export function LeaderboardTable() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleEntries.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-semibold">#{entry.rank}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.score}</TableCell>
              <TableCell>{entry.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
