import request from 'supertest';
import { API_PREFIX, APP_URL, TESTER_EMAIL, TESTER_PASSWORD} from '../utils/constants';
import { HttpStatus } from '@nestjs/common';

describe('Auth Module', () => {
  const app = APP_URL;
  const prefix = API_PREFIX
  const newUserFirstName = `Tester${Date.now()}`
  const newUserLastName = `E2E`
  const newUserEmail = `User.${Date.now()}@example.com`
  const newUserPassword = 'Password123!'
  
  

  

  describe('Login', () => {
    it('should successfully return data for logged user: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/login`)
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
        .expect(200)
        .expect(({ body }) => {
          expect(body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,)
          expect(body.refreshToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,)
          expect(body.tokenExpires).toBeDefined()
          expect(body.user.email).toMatch(/^\S+@\S+\.\S+$/)
          expect(body.user.hash).not.toBeDefined()
          expect(body.user.password).not.toBeDefined()
        })
    })
  })
  describe('Registration', () => {
    it('should successfully return data for newly registered user: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
            email: newUserEmail,
            password: newUserPassword,
            firstName: newUserFirstName,
            lastName: newUserLastName,
          })
        .expect(204)
    })
    it('should fail with existing email: /api/v1/auth/email/register (POST)', () => {
        return request(app)
          .post(`${prefix}/auth/email/register`)
          .send({
            email: TESTER_EMAIL,
            password: TESTER_PASSWORD,
            firstName: 'Joe',
            lastName: 'Doe',
          })
          .expect(422)
          .expect(({ body }) => {
            expect(body.status.timestamp).toBeDefined()
            //expect(body.path).toBeDefined()
            //expect(body.status).toBeDefined()
            //expect(body.message).toBeDefined()
          })
      })
  })
})
