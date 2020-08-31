import * as http from 'http'
import config from '@config'
import { getConnection } from '@db'
import app from './app'

const startServer = async (): Promise<void> => {
  try {
    await getConnection()
    console.log(`Server running on port ${config.SERVER_PORT}`)
  } catch (err) {
    console.log(err)
  }
}

const server = http.createServer(app)
server.listen(config.SERVER_PORT, startServer)
