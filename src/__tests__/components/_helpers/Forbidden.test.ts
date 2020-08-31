import Forbidden from '@components/_helpers/exceptions/Forbidden'

describe('APIException', () => {
  it('should generate an APIException', () => {
    const apiException = new Forbidden()

    expect(apiException.status).toBe(403)
    expect(apiException.message).toBe('Forbidden.')
    expect(apiException.errors).toEqual({})
  })
})
