import logger from "./logger";

const GATEWAY_PORT = process.env.GATEWAY_PORT;

if (!GATEWAY_PORT) {
    const error = new Error("No GATEWAY_PORT specified in .env file");
    logger.error(error.stack);
    logger.on("finish", () => { // Waits for logger to done all operations
        console.log("Logger finished the work, killing process.");
    });
    logger.end(); // Kills logger to stop the process
    process.exit(1);
}

import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/*", async (req, res) => {
    try {
        const route = req.originalUrl;

        const response = await axios.post(`http://localhost:${GATEWAY_PORT}${route}`, req.body, {
            headers: { "Content-Type": req.headers["content-type"] }
        });
        res.json(response.data);

    } catch (error) {
        const err = (error as Error);

        logger.error(err.stack);

        if (axios.isAxiosError(err)) {
            res.status(err.response?.status || 500)
                .json({
                    error: "Request blocked on gateway",
                    details: err.message,
                    serverResponse: err.response?.data || "No response from the server",
                });
        } else {
            res.status(500)
                .json({
                    error: "Unknown error occured",
                    details: err.message,
                });
        }
    }
});

export default router;