import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


export const QuizControls = ({ socket, roomId }: { socket: any; roomId: string }) => {
    const { toast } = useToast();
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Quiz Controls</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            socket.emit("next", {
                                roomId,
                            });
                            toast({
                                title: "Next Problem",
                                description: "Next problem has been started",
                            });
                        }}
                    >
                        Next Problem
                    </Button>
                </CardContent>
            </Card>
            <Card className="mt-4"> {/* Added margin-top here */}
                <CardHeader>
                    <CardTitle>Start the quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            socket.emit("startQuiz", {
                                roomId,
                            });
                            toast({
                                title: "Quiz Started",
                                description: "Quiz has been started",
                            });
                        }}
                    >
                        Start Quiz
                    </Button>
                </CardContent>
            </Card>
            <Card className="mt-4"> {/* Added margin-top here */}
                <CardHeader>
                    <CardTitle>End the quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            socket.emit("endQuiz", {
                                roomId,
                            });
                            toast({
                                title: "Quiz Ended",
                                description: "Quiz has been ended",
                            });
                        }}
                    >
                        Start Quiz
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};
