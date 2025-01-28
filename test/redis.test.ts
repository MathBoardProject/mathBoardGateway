import Redis from "ioredis"
import RedisClient from "../src/redisClient";

describe("Redis communication", () => {

    let appRedisClient: RedisClient; //Import only redisComm file instead of entire app.
    let client: Redis | undefined;
    const pubChannel = "TEST_BACKEND_GATEWAY";
    const subChannel = "TEST_GATEWAY_BACKEND";

    beforeAll(() => {
        appRedisClient = new RedisClient(pubChannel, subChannel);
        jest.useRealTimers();
    });

    beforeEach(() => {
    });


    afterAll(() => {
        appRedisClient.disconnect();
    });

    test("Data published on redis channel is avaliable to read after subscription", (done) => {
        client = new Redis();
        console.log("Publishing on : ", pubChannel);
        client?.publish(pubChannel, "Ping");
    });
});