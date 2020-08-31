import * as httpStatus from 'http-status'
import APIException from '@components/_helpers/exceptions/APIException'

export default class Forbidden extends APIException {
  constructor(errors?: any, message?: string) {
    super(errors, message || 'Forbidden.', httpStatus.FORBIDDEN)
  }
}
