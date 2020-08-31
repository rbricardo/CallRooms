import { Router, Request, Response, NextFunction } from 'express'
import * as httpStatus from 'http-status'

export default (app: Router): Router => {
  const API = Router()

  API.get(
    '/',
    async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
      try {
        return response.sendStatus(200)
      } catch (err) {
        return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
      }
    },
  )

  app.use('/health-check', API)

  return app
}
