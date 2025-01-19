import { Server } from "http";
import { AddressInfo } from "net";
import logger from "../src/logger";
// import request from "supertest"; // Delete if it will seem useless

import App from "../src/app";
import { io, Socket } from "socket.io-client";

describe("Socket Server Communication", () => {
   let app: App;
   let socketClient: Socket;
   const PORT = process.env.GATEWAY_PORT;

   beforeAll(() => {
      app = new App();
      app.listen();

      jest.useRealTimers();
   });

   beforeEach(() => {
      socketClient = io(`http://localhost:${PORT}`, { reconnection: false });
   });

   afterAll(() => {
      app.close();
   })

   afterEach(() => {
      socketClient.close();
   });

   test("Websocket connection is available to establish", (done) => {
      // Time measurement
      const timeStart = Date.now();

      socketClient.emit("ping");
      console.log("Ping!");

      socketClient.on("pong", (data) => {
         const latency = Date.now() - timeStart;
         console.log(`${data} [Latency: ${latency}ms]`);
         
         // Warn if latency is over 1 second
         if(latency > 1000){
            logger.warn(`Latency is greater than ${latency}ms!`);
         }

         done();
      });
   });
   
});