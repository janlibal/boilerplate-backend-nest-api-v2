import request from 'supertest'
import { API_PREFIX, APP_URL } from 'tests/utils/constants'
import { describe, it, expect } from 'vitest'


describe('App', () => {
  const app = APP_URL
  const prefix = API_PREFIX



  describe('App', () => {
    it('should return hello /api/v1/info (GET)', async () => {
      const response = await request(app).get(`${prefix}/app/info`).expect(200)
      //expect(response.body.message).toMatch('Hello World!')
      expect(response.body.status).toBe(true)
      expect(response.body.path).toMatch('/app/info')
      expect(response.body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
      expect(response.body.statusCode).toBe(200)
      expect(typeof response.body.result.name).toBe('string')
      expect(typeof response.body.result.version).toBe('string')
      expect(typeof response.body.result.description).toBe('string')
      expect(typeof response.body.result.env.hostName).toBe('string')
      expect(typeof response.body.result.env.platform).toBe('string')
    })
  })
})
