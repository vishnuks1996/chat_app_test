import {createLogger, format, transports} from "winston"

 const logger = createLogger({
  format : format.combine(format.timestamp(),format.colorize(),format.simple()),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.Console({
      level: 'error'
    }),
    new transports.Console({
      level: 'warn'
    })
  ]
});

export default logger;