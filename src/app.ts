//This file contains the App class which represents entire gateway and follows rules of Dependency Injection [DI]

//External packages
import { createServer, Server as HTTPServer } from "http";

//Internal and local imports
import SocketServer from "./websocket";
import "dotenv/config";

class App {
    protected httpServer: HTTPServer;
    protected socketServer: SocketServer;
    protected PORT = process.env.GATEWAY_PORT;

    constructor() {
        this.httpServer = createServer();
        this.socketServer = new SocketServer(this.httpServer);
    }

    listen(){
        this.socketServer.startListening();
        this.httpServer.listen(this.PORT, ()=>{
            console.log(`Gateway service is listening on : ${this.PORT}`);
        });
    }

    close(){
        this.socketServer.close();
    }
}

export default App;