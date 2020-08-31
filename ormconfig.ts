import { ConnectionOptions } from 'typeorm'
import config from '@config'

const connectionOptions: ConnectionOptions = {
  cli: {
    entitiesDir: 'src/_db/models',
    migrationsDir: 'src/_db/migrations',
  },
  database: config.DB.NAME,
  entities: ['src/_db/models/*.ts'],
  host: config.DB.HOST,
  logging: false,
  migrations: ['src/_db/migrations/*.ts'],
  password: config.DB.PASSWORD,
  port: config.DB.PORT,
  // schema: config.DB.MAIN_SCHEMA,
  synchronize: false,
  type: 'postgres',
  username: config.DB.USER,
}

module.exports = connectionOptions
