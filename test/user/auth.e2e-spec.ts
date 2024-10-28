import request from 'supertest'
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants'

describe('Auth Module', () => {
  const app = APP_URL
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
          expect(body.token).toMatch(
            /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
          )
          expect(body.refreshToken).toMatch(
            /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
          )
          expect(body.tokenExpires).toBeDefined()
          expect(body.user.email).toMatch(/^\S+@\S+\.\S+$/)
          expect(body.user.hash).not.toBeDefined()
          expect(body.user.password).not.toBeDefined()
        })
    })
    it('should fail with missing email: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })
    it('should fail with missing email and password: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          //email: TESTER_EMAIL,
          //password: TESTER_PASSWORD
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email cannot be empty'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Password cannot be empty'})
        })
    })
    it('should fail with email being in wrong format: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          email: 'joe.doejoedoe.com', // TESTER_EMAIL,
          password: TESTER_PASSWORD
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
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

    it('should fail with missing firstName: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
        })
    })
    it('should fail with firstName not being string: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 123,
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be a string'})
        })
    })

    it('should fail with missing lastName: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
        })
    })
    it('should fail with lastName not being string: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 123,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be a string'})
        })
    })

    it('should fail with missing email: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with email not being in proper format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joe.doejoedoe.com',
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with missing passowrd: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password must be a string'})
        })
    })

    it('should fail when password is too weak: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: '123!', //TESTER_PASSWORD
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
        })
    })

    it('should fail when password is too long: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: 'Password123!Password123!', //TESTER_PASSWORD
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
        })
    })

    it('should fail with firstName and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with firstName not being a string and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 123,
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with firstName not being a string and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.com', // TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 123,
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })
    

    it('should fail with lastName and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with lastName not being a string and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 123,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with lastName not being a string and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.com', // TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 123,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with lastName and firstName missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
        })
    })

    it('should fail with firstName not being a string and lastName missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 123,
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          
        })
    })

    it('should fail with lastName not being a string and firstName missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 123,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname must be a string'})
        })
    })

    it('should fail with firstName and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with firstName missing and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joedoe.com', //TESTER_EMAIL,
          password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with firstName not as a string and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joedoe.com', //TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 123,
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with firstName and password missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[8]).toMatchSnapshot({ message: 'Password must be a string'})
         
          
        })
    })


    it('should fail with firstName and weak password: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: '123!', //TESTER_PASSWORD,
          //firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          
          
        })
    })

    it('should fail with lastName and email missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Email cannot be empty'})
        })
    })

    it('should fail with lastName missing and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joedoe.com', //TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with lastName not as a string and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joedoe.com', //TESTER_EMAIL,
          password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 123,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email must be in proper format'})
        })
    })

    it('should fail with lastName and password missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[8]).toMatchSnapshot({ message: 'Password must be a string'})
        })
    })


    it('should fail with lastName missing and weak password: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: TESTER_EMAIL,
          password: '123!', //TESTER_PASSWORD,
          firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
        })
    })

    it('should fail with email and password missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Email cannot be empty'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Password must be a string'})
          
        })
    })

    it('should fail with email in wrong format and password missing: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joddoe.com', //TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Password must be a string'})
        })
    })

    it('should fail with email in wrong format and a weak password: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joedoe.joddoe.com', //TESTER_EMAIL,
          password: '123!', //TESTER_PASSWORD,
          firstName: 'Joe',
          lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
        })
    })

    it('should fail with missing firstName, lastName, email, passowrd: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          //firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[8]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[9]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[10]).toMatchSnapshot({ message: 'Email cannot be empty'})
          expect(body.errors[11]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[12]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[13]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[14]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[15]).toMatchSnapshot({ message: 'Password must be a string'})
        })
    })

    it('should fail with missing firstName, lastName, email and weak passowrd: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          //email: TESTER_EMAIL,
          password: '!123', // TESTER_PASSWORD,
          //firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[8]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[9]).toMatchSnapshot({ message: 'Email must be a string'})
          expect(body.errors[10]).toMatchSnapshot({ message: 'Email cannot be empty'})
          expect(body.errors[11]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[12]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          
        })
    })

    it('should fail with missing firstName, lastName, password and email in wrong format: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post(`${prefix}/auth/email/register`)
        .send({
          email: 'joe.doe.joedoe.com', // TESTER_EMAIL,
          //password: TESTER_PASSWORD,
          //firstName: 'Joe',
          //lastName: 'Doe',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.timestamp).toMatch(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)
          expect(body.path).toMatch('/auth/email/register')
          expect(body.title).toMatch('Bad Request')
          expect(body.status).toBe(400)
          expect(body.errors[0]).toMatchSnapshot({ message: 'Firstname has to be defined'})      
          expect(body.errors[1]).toMatchSnapshot({ message: 'Firstname must be longer than 1 char'})
          expect(body.errors[2]).toMatchSnapshot({ message: 'Firstname must be a string'})
          expect(body.errors[3]).toMatchSnapshot({ message: 'Firstname cannot be empty'})
          expect(body.errors[4]).toMatchSnapshot({ message: 'Lastname has to be defined'})
          expect(body.errors[5]).toMatchSnapshot({ message: 'Lastname must be longer than 1 char'})
          expect(body.errors[6]).toMatchSnapshot({ message: 'Lastname must be a string'})
          expect(body.errors[7]).toMatchSnapshot({ message: 'Lastname cannot be empty'})
          expect(body.errors[8]).toMatchSnapshot({ message: 'Email must be in proper format'})
          expect(body.errors[9]).toMatchSnapshot({ message: 'Password has to be defined'})
          expect(body.errors[10]).toMatchSnapshot({ message: 'Password is too weak'})
          expect(body.errors[11]).toMatchSnapshot({ message: 'Password can contain 20 characters at the most'})
          expect(body.errors[12]).toMatchSnapshot({ message: 'Password must contain at least 6 characters'})
          expect(body.errors[13]).toMatchSnapshot({ message: 'Password must be a string'})
        })
    })
  })
})
