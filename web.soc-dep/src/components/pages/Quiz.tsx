'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const TIMER_DURATION = 20

export function Quiz({
  quizData,
  socket,
  userId,
  problemId,
  roomId,
  currentProblemIndex,
  totalProblems
}: {
  quizData: {
    title: string
    description: string
    image: string
    options: { title: string }[]
  }
  socket: any
  roomId: string
  userId: string
  problemId: string
  currentProblemIndex: number
  totalProblems: number
}) {
  const [submitted, setSubmitted] = useState(false)
  const [submission, setSubmission] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit()
    }
  }, [timeLeft, submitted])

  const handleSubmit = () => {
    if (submission === null) return
    setSubmitted(true)
    socket.emit("submit", {
      userId,
      problemId,
      submission: Number(submission),
      roomId,
    })
  }

  const circumference = 2 * Math.PI * 45 // 45 is the radius of the circle
  const strokeDashoffset = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * circumference

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Progress value={(currentProblemIndex / totalProblems) * 100} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentProblemIndex} of {totalProblems}
        </p>
      </div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">{quizData.title}</CardTitle>
            <p className="text-lg text-muted-foreground">{quizData.description}</p>
          </div>
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted-foreground"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{timeLeft}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="relative w-full h-64">
            <img src="src\assets\Image1.jpeg" alt="Question image" className="w-full h-full object-cover rounded-md" />
          </div> */}
          <RadioGroup onValueChange={(value) => setSubmission(Number(value))}>
            {quizData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">{option.title}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={submitted || submission === null}
            className="w-full"
          >
            {submitted ? 'Submitted' : 'Submit'}
          </Button>
          {timeLeft <= 5 && !submitted && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Time is running out!</AlertTitle>
              <AlertDescription>
                Please submit your answer quickly.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}