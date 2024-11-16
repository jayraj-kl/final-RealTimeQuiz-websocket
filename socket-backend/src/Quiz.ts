import { IoManager } from "./managers/IoManager";
const fs = require('fs');

export type AllowedSubmissions = 0 | 1 | 2 | 3;

const PROBLEM_TIME_S = 20;

interface User {
    name: string;
    id: string;
    points: number;
}

interface Submission {
    problemId: string;
    userId: string;
    isCorrect: boolean;
    optionSelected: AllowedSubmissions
}

interface Problem {
    id: string;
    title: string;
    description: string;
    image?: string;
    startTime: number;
    answer: AllowedSubmissions; // 0, 1, 2, 3
    options: {
        id: number;
        title: string;
    }[]
    submissions: Submission[]
}

export class Quiz {
    public roomId: string;

    private hasStarted: boolean;
    private problems: Problem[];
    private activeProblem: number;
    private users: User[];
    private currentState: "leaderboard" | "question" | "not_started" | "ended";
    
    constructor(roomId: string) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = []
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
        console.log("room created -- Quiz.ts(constructor)");
        setInterval(() => { this.debug() }, 5 * 1000)
    }

    debug() {
        console.log("----debug--- -- Quiz.ts")
        console.log(this.roomId)
        console.log(this.hasStarted)

        console.log(JSON.stringify(this.problems))
        console.log(this.problems.length)

        console.log(this.activeProblem)
        console.log(this.users)
        console.log(this.currentState)
        console.log("----debug--- -- Quiz.ts")
    }

    addProblem(problem: Problem) {
        this.problems.push(problem);
        console.log(this.problems + " -- Quiz.ts(addProblem)");
    }

    start() {
        this.hasStarted = true;
        this.setActiveProblem(this.problems[0]);
    }

    setActiveProblem(problem: Problem) {
        console.log("set active problem -- Quiz.ts(setActiveProblem)");
        this.currentState = "question";
        problem.startTime = new Date().getTime();
        problem.submissions = [];
        const currentProblemIndex = this.problems.indexOf(problem) + 1;

        console.log(currentProblemIndex);
        console.log("currentProblemIndex -- Quiz.ts(setActiveProblem)");
        
        IoManager.getIo().to(this.roomId).emit("problem", { problem, totalProblems: this.problems.length, currentProblemIndex });
    
        setTimeout(() => { this.sendLeaderboard() }, PROBLEM_TIME_S * 1000);
    }  

    sendLeaderboard() {
        this.currentState = "leaderboard"
        const leaderboard = this.getLeaderboard();

        IoManager.getIo().emit("leaderboard", { leaderboard })
    }

    next() {
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        if (problem) {
            this.setActiveProblem(problem);
        } else {
            this.currentState = "ended"; 
            const finalLeaderboard = this.getLeaderboard(); 
            
            IoManager.getIo().to(this.roomId).emit("QUIZ_END", { message: "The quiz has ended!", finalLeaderboard }); 
            console.log("Quiz ended. Final leaderboard:", finalLeaderboard + " -- Quiz.ts(next)");
        }
    }

    end() {
        this.currentState = "ended";
        const finalLeaderboard = this.getLeaderboard();
        IoManager.getIo().to(this.roomId).emit("QUIZ_END", { message: "The quiz has ended!", finalLeaderboard });
        const leaderboard = this.getLeaderboard();
            console.log("Generating leaderboard CSV...");
            console.log(leaderboard);
            const csvContent = "name,score\n" + leaderboard.map(user => `${user.name},${user.points}`).join("\n");
            console.log(csvContent);
            try {
                fs.writeFileSync(`leaderboard_${this.roomId}.csv`, csvContent);
                console.log(`CSV file written successfully: leaderboard_${this.roomId}.csv`);
            } catch (error) {
                console.error("Error writing CSV file:", error);
            }
            IoManager.getIo().emit("ROOM_TERMINATED", { roomId: this.roomId });
    }

    genRandonString(length: number) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < length; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }

    addUser(name: string) {
        const existingUser = this.users.find(user => user.name === name);
        if (existingUser) {
        return existingUser.id; // Return existing user's ID if found
        }
        const id = this.genRandonString(7);
        this.users.push({
            id,
            name,
            points: 0
        })
        return id;
    }

    submit(userId: string, roomId: string, problemId: string, submission: AllowedSubmissions) {
        console.log("userId -- Quiz.ts(submit)");
        console.log(userId + " -- Quiz.ts(submit)");
        const problem = this.problems.find(x => x.id == problemId);
        const user = this.users.find(x => x.id === userId);
        if (!problem || !user) {
            console.log("problem or user not found -- Quiz.ts(submit)");
            return;
        }
        const existingSubmission = problem.submissions.find(x => x.userId === userId);
        if (existingSubmission) {
            console.log("existing submissions -- Quiz.ts(submit)");
            return;
        }
        const  isCorrect = problem.answer === submission;    
        problem.submissions.push({
            problemId,
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission
        });
        if(isCorrect) {
            user.points += (1000 - (500 * (new Date().getTime() - problem.startTime) / (PROBLEM_TIME_S * 1000)));
        }
    }

    getLeaderboard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).slice(0, 20);
    }
    
    getCurrentState() {
        if (this.currentState === "not_started") {
            return {
            type: "not_started"
            }
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderboard()
            }
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderboard()
            }
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem
            }
        }
    }
}