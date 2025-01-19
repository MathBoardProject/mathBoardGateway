import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

class SocketServer {
    private io: SocketIOServer;

    constructor(httpServer: HTTPServer, options: Partial<SocketIOServer["opts"]> = {}) {
        this.io = new SocketIOServer(httpServer, options);
    }

    public startListening(): void {
        this.io.on("connection", (socket: Socket) => {
            socket.on("ping", () => {
                socket.emit("pong", `Pong!`);
            });

            socket.on("disconnect", () => {
                console.log(`Client ID[${socket.id}] disconnected.`);
            });

            socket.on("pushStrokes", (data)=>{ // data (userId, boardID) is type containing user data and stroke list

            });

            socket.on("deleteStrokes", (data)=>{

            });

            socket.on("editStrokes", (data)=>{

            });
        });
    }

    public close() {
        this.io.close();
    }
}

export default SocketServer;