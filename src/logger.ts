import winston from "winston";

const { combine, timestamp, json, simple, printf, errors, colorize } = winston.format;

const errorStamp = printf(({ level, message, timestamp, stack }) => {
    const logMessage = stack || message;
    return `[${level}]: ${logMessage} \n Timestamp: ${timestamp}`;
});

const logger = winston.createLogger({
    level: "info",
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errorStamp,
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                timestamp(),
                colorize(),
                errorStamp,
            ),
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logs/info.log',
            format: combine(
                timestamp(),
                json(),
            ),
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logs/warns.log',
            format: combine(
                timestamp(),
                json(),
            ),
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/errors.log',
            format: combine(
                timestamp(),
                errorStamp,
            ),
        }),
    ],
});

export default logger;