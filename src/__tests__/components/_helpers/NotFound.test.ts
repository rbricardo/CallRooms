import NotFound from '@components/_helpers/exceptions/NotFound'

describe('APIException', () => {
  it('should generate an APIException', () => {
    const apiException = new NotFound()

    expect(apiException.status).toBe(404)
    expect(apiException.message).toBe('Not Found.')
    expect(apiException.errors).toEqual({})
  })
})
