import * as dotEnvSafe from 'dotenv-safe'
import * as path from 'path'

try {
  if (process.env.NODE_ENV !== 'production') {
    let envPath = '.env'

    if (process.env.NODE_ENV) {
      envPath = `${envPath}.${process.env.NODE_ENV}`
    }

    dotEnvSafe.config({
      allowEmptyValues: true,
      example: path.resolve(process.cwd(), '.env.example'),
      path: path.resolve(process.cwd(), envPath),
    })
  }
} catch (err) {
  console.log(err)
  throw err
}

interface Config {
  readonly DB: {
    readonly AUDIT_SCHEMA?: string
    readonly HOST?: string
    readonly MAIN_SCHEMA?: string
    readonly NAME?: string
    readonly PASSWORD?: string
    readonly PORT?: number
    readonly USER?: string
  }
  readonly LOGGING: {
    readonly COMBINED_FILE?: string
    readonly ERROR_FILE?: string
    readonly LEVEL?: string
    readonly TYPE?: string
  }
  readonly NODE_ENV?: string
  readonly SERVER_PORT?: number
  readonly TWILLIO: {
    readonly FROM_NUMBER?: string
    readonly SID?: string
    readonly TOKEN?: string
  }
}

const {
  DB_HOST,
  DB_AUDIT_SCHEMA,
  DB_MAIN_SCHEMA,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  LOGGING_COMBINED_FILE,
  LOGGING_ERROR_FILE,
  LOGGING_LEVEL,
  LOGGING_TYPE,
  NODE_ENV,
  SERVER_PORT,
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILLIO_FROM_NUMBER,
} = process.env

const config: Config = {
  DB: {
    AUDIT_SCHEMA: DB_AUDIT_SCHEMA,
    HOST: DB_HOST,
    MAIN_SCHEMA: DB_MAIN_SCHEMA,
    NAME: DB_NAME,
    PASSWORD: DB_PASSWORD,
    PORT: DB_PORT ? parseInt(DB_PORT, 10) : 0,
    USER: DB_USERNAME,
  },
  LOGGING: {
    COMBINED_FILE: LOGGING_COMBINED_FILE,
    ERROR_FILE: LOGGING_ERROR_FILE,
    LEVEL: LOGGING_LEVEL,
    TYPE: LOGGING_TYPE,
  },
  NODE_ENV,
  SERVER_PORT: SERVER_PORT ? parseInt(SERVER_PORT, 10) : 0,
  TWILLIO: {
    SID: TWILIO_SID,
    TOKEN: TWILIO_TOKEN,
    FROM_NUMBER: TWILLIO_FROM_NUMBER,
  },
}

export default config
