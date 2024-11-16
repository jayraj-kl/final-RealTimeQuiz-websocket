import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotStarted from "./NotStarted";
import { Quiz } from "../Quiz";
import { LeaderBoard } from "../Leaderboard";
import Component from "@/components/thank-you-message";

const UserLoggedin = ({ name, code }: { name: any; code: any; }) => {
    const [socket, setSocket] = useState<null | any>(null);
    const roomId = code;
    const [currentState, setCurrentState] = useState("not_started");
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userId, setUserId] = useState("");
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL);
        console.log(socket);
        setSocket(socket)

        socket.on("connect", () => {
            socket.emit("join", {
                roomId,
                name
            })
        });

        socket.on("init", ({userId, state}) => {
            setUserId(userId);
            if (state.leaderboard) {
                setLeaderboard(state.leaderboard)
            }
            if (state.problem) {
                setCurrentQuestion(state.problem);
            }
            setCurrentState(state.type);
        });

        socket.on("leaderboard", (data) => {
            setCurrentState("leaderboard");
            setLeaderboard(data.leaderboard);
        });
        socket.on("problem", (data) => {
            setCurrentState("question");
            setCurrentQuestion(data.problem);
            setTotalQuestions(data.totalProblems);
            setCurrentProblemIndex(data.currentProblemIndex);
        });
        socket.on("QUIZ_END", () => {
            setCurrentState("ended");
        });
    }, []);

    if (currentState == "not_started") {
        return (
            <div>
                <NotStarted />
            </div>
        );
    }

    if (currentState == "question") {
        return (
            <div>
                <Quiz quizData={{
                title: currentQuestion.title,
                description: currentQuestion.description,
                image: currentQuestion.image,
                options: currentQuestion.options
                }} socket={socket}roomId={roomId} userId={userId}
                problemId={currentQuestion.id} totalProblems={totalQuestions} currentProblemIndex={currentProblemIndex} 
                 />
            </div>
        );
    }

    if (currentState == "leaderboard") {
        console.log(leaderboard);
        return (
            <div>
                <LeaderBoard leaderboardData={leaderboard} />
            </div>
        );
    }

    if (currentState == "ended") {
        return (
            <div>
                <Component />
            </div>
        );
    }
};


export default UserLoggedin;