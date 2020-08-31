import * as httpStatus from 'http-status'
import APIException from '@components/_helpers/exceptions/APIException'

export default class InvalidParameters extends APIException {
  constructor(errors?: any, message?: string) {
    super(errors, message || 'Invalid Request.', httpStatus.BAD_REQUEST)
  }
}
