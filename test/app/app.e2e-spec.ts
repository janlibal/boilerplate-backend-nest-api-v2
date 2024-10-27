import request from 'supertest'
import { API_PREFIX, APP_URL } from '../utils/constants'

describe('App', () => {
  const app = APP_URL
  const prefix = API_PREFIX

  describe('App', () => {
    it('should return app info /api/v1/app/info (GET)', () => {
      return request(app)
        .get(`${prefix}/app/info`)
        .expect(200)
        .expect(({ body }) => {
          expect(typeof body.name).toBe('string')
          expect(typeof body.version).toBe('string')
          expect(typeof body.description).toBe('string')
          expect(typeof body.env.hostName).toBe('string')
          expect(typeof body.env.platform).toBe('string')
        })
    })
  })
})
