//This file contains the App class which represents entire gateway and follows rules of Dependency Injection [DI]
import "dotenv/config";

//External packages
import { createServer, Server as HTTPServer } from "http";

//Internal and local imports
import logger from "./logger";
import WebSocketServer from "./websocket";
import RedisClient from "./redisClient";

class App {
    //webSocket
    protected httpServer: HTTPServer;
    protected socketServer: WebSocketServer;
    //Redis
    public redisClient: RedisClient | undefined;

    constructor(
        // environment variables declaration 
        private GATEWAY_PORT: number = Number(process.env.GATEWAY_PORT) || 3002,
        private SUB_CHANNEL: string,
        private PUB_CHANNEL: string,
    ) {

        //Redis subService
        this.redisClient = new RedisClient(this.SUB_CHANNEL, this.PUB_CHANNEL);

        //Websocket subService
        this.httpServer = createServer();
        this.socketServer = new WebSocketServer(this.httpServer, this.redisClient, {});

        //Init
        this.httpServer.listen(this.GATEWAY_PORT, () => {
            logger.info(`Gateway app is running on PORT[${this.GATEWAY_PORT}]`);
        });
    }

    close() {
        this.socketServer.close();
        this.httpServer.close();
    }
}

export default App;