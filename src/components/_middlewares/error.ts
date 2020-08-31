import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import config from '@config'
import logger from '@components/_middlewares/logging'

import APIException from '@components/_helpers/exceptions/APIException'
import BadRequest from '@components/_helpers/exceptions/BadRequest'
import Forbidden from '@components/_helpers/exceptions/Forbidden'
import InvalidParameters from '@components/_helpers/exceptions/InvalidParameters'
import NotFound from '@components/_helpers/exceptions/NotFound'
import Unauthorized from '@components/_helpers/exceptions/Unauthorized'

interface ErrorResponse {
  code: number
  errors?: any
  message: string
  stack?: string
}

const convertToException = (
  err: any,
): APIException | BadRequest | Forbidden | InvalidParameters | NotFound | Unauthorized => {
  if (config.NODE_ENV === 'local') {
    logger.error(err)
  }

  if (err && err.joi) {
    return new InvalidParameters(undefined, err.joi.details[0].message)
  }

  if (!(err instanceof APIException)) {
    return new APIException()
  }

  return err
}

export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let response: ErrorResponse = {
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something bad happened.',
  }

  process.on('uncaughtException', (err) => {
    logger.error(err)
  })

  const { status, errors, stack, message } = convertToException(err)

  const responseStatus = errors.status || status

  response = {
    ...response,
    code: responseStatus,
    errors,
    message,
    stack,
  }

  if (config.NODE_ENV !== 'local') {
    delete response.stack
  }

  if (Object.entries(errors).length === 0 && errors.constructor === Object) {
    delete response.errors
  }

  if (config.NODE_ENV !== 'test') {
    logger.error(`${responseStatus} ${response.message}`, { url: req.originalUrl })
  }

  return res.status(response.code).json(response).end()
}
