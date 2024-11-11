import { Card, CardContent } from "@/components/ui/card"


type CardProps = {
  sno: number
  name: string
  points: number
  image?: string
}

export function LeaderboardCard({ sno, name, points, image }: CardProps) {
  console.log(sno, name, points, image);
  return (
    <Card className="w-full mb-2">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-muted-foreground">{sno}</span>
          {/* <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar> */}
          <div>
            <h1 className="text-sm font-medium leading-none">{name}</h1>
            <p className="text-sm text-muted-foreground">{points} points</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {sno === 1 && <span className="text-2xl">🥇</span>}
          {sno === 2 && <span className="text-2xl">🥈</span>}
          {sno === 3 && <span className="text-2xl">🥉</span>}
        </div>
      </CardContent>
    </Card>
  )
}