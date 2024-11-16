"use client"

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { CreateProblem } from "./admin-components/CreateProblem";
import { QuizControls } from "./admin-components/QuizControls";
import { LeaderBoard } from "./Leaderboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"

export const Admin = () => {
  const [socket, setSocket] = useState<null | any>(null);
  const [quizId, setQuizId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    console.log(newSocket);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("joinAdmin", {
        password: "ADMIN_PASSWORD"
      });
    });

    newSocket.on("leaderboard", (data) => {
      setLeaderboard(data.leaderboard);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    console.log("handleCreateRoom called");
    console.log("Socket state:", socket);
    console.log("Room ID:", roomId);

    toast({
      title: "Room Created",
      description: `Room ID: ${roomId}`,
    });

    if (socket) {
      socket.emit("createQuiz", { roomId });
      setQuizId(roomId);
    } else {
      console.error("Socket is not initialized");
      toast({
        title: "Error",
        description: "Socket is not initialized",
        variant: "destructive",
      });
    }
  };

  if (!quizId) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Create Quiz Room</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Enter Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleCreateRoom}>
            Create Room
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Problem</TabsTrigger>
          <TabsTrigger value="controls">Quiz Controls</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateProblem roomId={quizId} socket={socket} />
        </TabsContent>
        <TabsContent value="controls">
          <QuizControls socket={socket} roomId={roomId} />
        </TabsContent>
        <TabsContent value="leaderboard">
          <LeaderBoard leaderboardData={leaderboard} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
};