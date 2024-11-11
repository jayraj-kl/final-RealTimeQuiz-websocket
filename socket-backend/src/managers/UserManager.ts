import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";
import Uploader from 'socket.io-file';
import path from 'path';
import fs from 'fs'; // Correctly import the fs module

const ADMIN_PASSWORD = "ADMIN_PASSWORD";

export class UserManager {
    private quizManager: QuizManager;

    constructor() {
        this.quizManager = new QuizManager();
    }

    addUser(socket: Socket) {
        this.createHandlers(socket);
        this.createFileUploader(socket);
    }

    private createHandlers(socket: Socket) {
        socket.on("join", (data) => {
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.join(data.roomId);
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId),
            });
        });

        socket.on("joinAdmin", (data) => {
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            console.log("Admin has joined");

            socket.on("createQuiz", (data) => {
                this.quizManager.addQuiz(data.roomId);
                console.log("createQuiz event called with data:", data);
            });
        
            socket.on("createProblem", data => {
                this.quizManager.addProblem(data.roomId, data.problem);
                console.log("createProblem event called with data:", data);
            });

            socket.on("createDemoQuiz", data => {
                this.quizManager.createDemoQuiz(data.roomId);
                console.log("createDemoQuiz event called with data:", data);
            });

            socket.on("startQuiz", (data) => {
                this.quizManager.start(data.roomId);
                console.log("Quiz started:", data);
            });

            socket.on("next", (data) => {
                this.quizManager.next(data.roomId);
                console.log("Next problem for quiz:", data);
            });

            socket.on("endQuiz", (data) => {
                this.quizManager.end(data.roomId);
                console.log("Quiz ended:", data);
            });

            socket.on("getLeaderboard", (data) => {
                const leaderboard = this.quizManager.leaderboard(data.roomId);
                socket.emit("leaderboardData", { roomId: data.roomId, leaderboard });
                console.log("Leaderboard fetched for room:", data.roomId);
            });
        });

        socket.on("submit", (data) => {
            const { userId, problemId, submission, roomId } = data;
            if (![0, 1, 2, 3].includes(submission)) {
                console.error("Invalid submission:", submission);
                return;
            }
            console.log("Submission received for room:", roomId);
            this.quizManager.submit(userId, roomId, problemId, submission);
        });

        socket.on("uploadImage", (data) => {
            const { roomId, image, imageName, problem } = data;
            console.log("Image received for room:", roomId);
            console.log("Image data:", image);
            console.log("Image name:", imageName);
            console.log("Problem data:", problem);
            if (!problem) {
                console.error("Problem data is missing");
                return;
            }
            const imagePath = path.join(__dirname, "../uploads", imageName);
            console.log(imagePath);
            // this.saveImage(roomId, imagePath, image, imageName, problem);
            fs.writeFile(imagePath, Buffer.from(image), (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error("Error saving image:", err);
                    return;
                }
                console.log("Image saved:", imageName);
                // Associate the image with the problem
                this.quizManager.addProblem(roomId, problem);
            });
        });
    }

    private createFileUploader(socket: Socket) {
        const uploader = new Uploader(socket, {
            maxFileSize: 10000000, // 10 MB
            uploadDir: path.join(__dirname, "../uploads"), // Set upload directory
            acceptTypes: ['image/*'], // Accept only image types
        });
        uploader.dir = path.join(__dirname, '../uploads');
        // uploader.listen(socket);
        uploader.on("saved", (event) => {
            console.log("File saved:", event.file);
        });
    }
}