import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

import express from "express";
import Redis from "ioredis";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

import router from "./proxy";
import logger from "./logger";

const app = express();

app.use(express.json());
app.use(router);

interface boardEvent { //Move that to git-submodule after it's initialization
    strokes: [],
    id?: string[]
    svg?: string[],
    x?: number[],
    y?: number[],
}

const redis = new Redis();
const channel = "mathBoard";

function sendMessage(message: any) {
    redis.publish(channel, message);
}

sendMessage("Hello Backend !!!");
logger.error("message sent");

const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Gateway is listening on port : ${PORT}`);
});