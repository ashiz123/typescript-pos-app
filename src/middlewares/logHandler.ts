import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint } = format

export const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new transports.File({
            filename: 'logs/all.log',
        }),
    ],
})

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new transports.Console())
// }
