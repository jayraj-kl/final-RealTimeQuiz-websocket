import { LeaderboardCard } from "./leaderboard-components/leader-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type LeaderboardData = Array<{
  points: number
  name: string
  profilePicture: string
}>

export function LeaderBoard({ leaderboardData }: { leaderboardData: LeaderboardData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Leaderboard Results 🚀
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {leaderboardData.map((el, index) => (
              <LeaderboardCard
                key={index}
                sno={index + 1}
                name={el.name}
                points={el.points}
                image={el.profilePicture}
              />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}