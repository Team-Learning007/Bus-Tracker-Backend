import { createLogger, format, transports } from 'winston';
import winston from 'winston/lib/winston/config/index.js';

const customLevels = {
  colors: {
    debug: 'blue',
    error: 'red',
    info: 'green',
    warn: 'yellow',
  },
  levels: {
    debug: 3,
    error: 0,
    info: 2,
    warn: 1,
  },
};

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => {
      const timestamp = String(info.timestamp);
      const level = String(info.level);
      const message = String(info.message);

      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: customLevels.levels,
  transports: [new transports.Console()],
});

winston.addColors(customLevels.colors);

export default logger;
