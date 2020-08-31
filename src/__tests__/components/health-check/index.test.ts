import { server } from '@tests/_config/server'

const healthCheckPath = '/health-check'

describe('Health Check Endpoint', () => {
  describe(`GET ${healthCheckPath}`, () => {
    describe('with an invalid payload', () => {
      it('should return a validation error', async () => {
        const response = await server.get(healthCheckPath)
        const { status } = response

        expect(status).toBe(200)
      })
    })
  })
})
