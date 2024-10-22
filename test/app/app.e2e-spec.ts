import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants'

describe('Auth', () => {
  const app = APP_URL

  describe('Admin', () => {
    it('should return app environment /api/v1/app/info (GET)', () => {
      return request(app)
        .get('/api/v1/app/info')
        //.send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(200)
        /*.expect(({ body }) => {
          expect(body.token).toBeDefined()
          expect(body.user.email).toBeDefined()
          expect(body.user.role).toBeDefined()
        })*/
    })
  })
})