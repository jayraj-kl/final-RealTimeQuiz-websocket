// IoManager.ts
import http from 'http';
import { Server } from "socket.io";

const server = http.createServer();

export class IoManager {
    private static io: Server;
    
    public static getIo() {
        if (!this.io) {
            const io = new Server(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST", 'PUT']
                }
            });
            this.io = io;
        }
        return this.io;
    }

    public static listen(port: number) {
        server.listen(port, '0.0.0.0', () => {
            console.log(`Socket.IO server running on http://0.0.0.0:${port}`);
        });
    }
}