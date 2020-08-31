import { TransformableInfo } from 'logform'
import { createLogger, format, LoggerOptions, transports } from 'winston'
import config from '@config'

const formatParams = (info: TransformableInfo): string => {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')
  const more = Object.keys(args).length ? JSON.stringify(args) : ''
  return `${ts} - ${level}: ${message} ${more}`
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
)

const productionFormat = format.combine(format.timestamp(), format.align(), format.printf(formatParams))

let loggerOptions: LoggerOptions

if (config.NODE_ENV === 'production') {
  loggerOptions = {
    format: productionFormat,
    level: config.LOGGING.LEVEL,
    transports: [new transports.Console()],
  }
} else {
  loggerOptions = {
    format: developmentFormat,
    level: config.LOGGING.LEVEL,
    transports: [new transports.Console()],
  }
  if (config.NODE_ENV === 'local') {
    loggerOptions.transports = [
      ...loggerOptions.transports,
      new transports.File({ filename: config.LOGGING.ERROR_FILE, level: 'error' }),
      new transports.File({ filename: config.LOGGING.COMBINED_FILE }),
    ]
  }
}

export default createLogger(loggerOptions)
