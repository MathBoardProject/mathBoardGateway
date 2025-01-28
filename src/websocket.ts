import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import RedisClient from "./redisClient";

export default class WebSocketServer {
    private io: SocketIOServer;
    protected redisClient: RedisClient;

    constructor(httpServer: HTTPServer, redisClient: RedisClient, SocketIO_Options: Partial<SocketIOServer["opts"]> = {}) {
        //SocketIO definition
        this.io = new SocketIOServer(httpServer, SocketIO_Options);
        this.redisClient = redisClient;

        //Routing
        this.io.on("connection", (socket: Socket) => {
            socket.on("ping", () => {
                socket.emit("pong", `Pong!`);
            });

            socket.on("disconnect", () => {
                console.log(`Client SOCKET[${socket.id}] disconnected.`);
            });

            socket.onAny((event, request,...args) => {
                
            });
        });
    }

    public close() {
        this.io.close();
    }
}