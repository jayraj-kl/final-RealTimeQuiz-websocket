import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export const CreateProblem = ({ socket, roomId }: { socket: any; roomId: string }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [answer, setAnswer] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [options, setOptions] = useState([
    { id: 0, title: "" },
    { id: 1, title: "" },
    { id: 2, title: "" },
    { id: 3, title: "" }
  ])
  const [, setLeaderboard] = useState<any[]>([])
  const [fileKey, setFileKey] = useState(Date.now())

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Problem Created",
      description: `Title: ${title}, Answer: ${options[answer].title}`,
    })

    if (!image) {
      socket.emit("createProblem", {
        roomId,
        problem: {
          title,
          description,
          options,
          answer
        }
      })
    } else if (image) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const buffer = e.target?.result
        socket.emit("uploadImage", {
          roomId,
          problem: {
            title,
            description,
            image: image.name,
            options,
            answer
          },
          image: buffer,
          imageName: image.name,
        })
      }
      reader.readAsArrayBuffer(image)
    }

    // Clear all form fields after submission
    setTitle("")
    setDescription("")
    setAnswer(0)
    setImage(null)
    setOptions([
      { id: 0, title: "" },
      { id: 1, title: "" },
      { id: 2, title: "" },
      { id: 3, title: "" }
    ])
    setFileKey(Date.now())
  }

  socket.on("leaderboardData", (data: { roomId: string, leaderboard: any[] }) => {
    if (data.roomId === roomId) {
      setLeaderboard(data.leaderboard)
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Problem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">
            Image <span className="text-red-500 text-xs">please don't try this papa i am looking at you</span>
          </Label>
          <Input
            key={fileKey}
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <RadioGroup value={answer.toString()} onValueChange={(value) => setAnswer(parseInt(value))}>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id.toString()} id={`option${option.id}`} />
              <Label htmlFor={`option${option.id}`} className="w-20">Option {option.id + 1}</Label>
              <Input
                value={option.title}
                onChange={(e) => {
                  setOptions(options.map(x =>
                    x.id === option.id ? { ...x, title: e.target.value } : x
                  ))
                }}
              />
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleSubmit}>Add Problem</Button>
      </CardContent>
    </Card>
  )
}