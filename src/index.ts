import "dotenv/config";
import App from "./app";
const { GATEWAY_PORT, SUB_CHANNEL, PUB_CHANNEL } = process.env;

const app = new App(
    Number(GATEWAY_PORT),
    String(SUB_CHANNEL),
    String(PUB_CHANNEL),
);