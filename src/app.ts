import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import { errors } from 'celebrate'
import config from '@config'
import { handleErrors } from '@components/_middlewares/error'
import router from '@components'

const app = express()

if (config.NODE_ENV !== 'test') {
  app.use(
    morgan(config.LOGGING.TYPE, {
      stream: process.stdout,
    }),
  )
}

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errors())

router(app)

app.use(handleErrors)

export default app
