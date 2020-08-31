import Unauthorized from '@components/_helpers/exceptions/Unauthorized'

describe('APIException', () => {
  it('should generate an APIException', () => {
    const apiException = new Unauthorized()

    expect(apiException.status).toBe(401)
    expect(apiException.message).toBe('Unauthorized.')
    expect(apiException.errors).toEqual({})
  })
})
