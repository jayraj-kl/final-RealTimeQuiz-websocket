import { AllowedSubmissions, Quiz } from "../Quiz";
let globalProblemId = 0;

export class QuizManager {
    private quizes: Quiz[];
    constructor() {
        this.quizes = [];
    }

    public start(roomId: string) {
        this.getQuiz(roomId)?.start();
    }

    public addProblem(roomId: string, problem: {
        title: string;
        description: string;
        image?: string;
        options: {
            id: number;
            title: string;
        }[];
        answer: AllowedSubmissions;
    }) {
        this.getQuiz(roomId)?.addProblem({
            ...problem,
            id: (globalProblemId++).toString(),
            startTime: new Date().getTime(),
            submissions: []
        });
    }

    public removeQuiz(roomId: string) {
        const index = this.quizes.findIndex(x => x.roomId === roomId);
        if (index !== -1) {
            this.quizes.splice(index, 1);
            console.log(`Quiz room ${roomId} has been terminated`);
        }
    }

    public createDemoQuiz(roomId: string) {
        this.addQuiz(roomId);
        this.addProblem(roomId, {
            title: "What is the capital of France?",
            description: "Choose the correct answer",
            options: [
                { id: 0, title: "Paris" },
                { id: 1, title: "London" },
                { id: 2, title: "Berlin" },
                { id: 3, title: "Madrid" }
            ],
            answer: 0
        });
        this.addProblem(roomId, {
            title: "What is the capital of Germany?",
            description: "Choose the correct answer",
            options: [
                { id: 0, title: "Paris" },
                { id: 1, title: "London" },
                { id: 2, title: "Berlin" },
                { id: 3, title: "Madrid" }
            ],
            answer: 2
        });
        this.addProblem(roomId, {
            title: "What is the capital of Spain?",
            description: "Choose the correct answer",
            options: [
                { id: 0, title: "Paris" },
                { id: 1, title: "London" },
                { id: 2, title: "Berlin" },
                { id: 3, title: "Madrid" }
            ],
            answer: 3
        });
    }
    
    public next(roomId: string) {
        this.getQuiz(roomId)?.next();
    }

    public end(roomId: string) {
        const quiz = this.getQuiz(roomId);
        if (quiz) {
            quiz.end();
            this.removeQuiz(roomId);
        }
        
    }

    public leaderboard(roomId: string) {
        this.getQuiz(roomId)?.getLeaderboard()
    }

    addUser(roomId: string, name: string) {
        return this.getQuiz(roomId)?.addUser(name);
    }

    submit(userId: string, roomId: string, problemId: string, submission: 0 | 1 | 2 | 3) {
        this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);   
    }
    
    getQuiz(roomId: string) {
        return this.quizes.find(x => x.roomId === roomId) ?? null;
    }
    
    getCurrentState(roomId: string) {
        const quiz = this.quizes.find(x => x.roomId === roomId);
        if (!quiz) {
            return null;
        }
        return quiz.getCurrentState();
    }

    addQuiz(roomId: string) {
        if (this.getQuiz(roomId)) {
            return;
        }
        const quiz = new Quiz(roomId);
        this.quizes.push(quiz);
    }   
}