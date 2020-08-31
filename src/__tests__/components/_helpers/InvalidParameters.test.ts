import InvalidParameters from '@components/_helpers/exceptions/InvalidParameters'

describe('APIException', () => {
  it('should generate an APIException', () => {
    const apiException = new InvalidParameters()

    expect(apiException.status).toBe(400)
    expect(apiException.message).toBe('Invalid Request.')
    expect(apiException.errors).toEqual({})
  })
})
