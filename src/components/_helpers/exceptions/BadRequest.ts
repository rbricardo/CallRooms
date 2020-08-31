import * as httpStatus from 'http-status'
import APIException from '@components/_helpers/exceptions/APIException'

export default class BadRequest extends APIException {
  constructor(errors?: any, message?: string) {
    super(errors, message || 'Ops! Something went wrong.', httpStatus.BAD_REQUEST)
  }
}
