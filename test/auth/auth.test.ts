import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import request from 'supertest'
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants'
import { PrismaClient } from '@prisma/client'
import crypto from '../../src/utils/crypto'

const prisma = new PrismaClient()

describe('Auth', () => {
  const app = APP_URL
  const prefix = API_PREFIX

  beforeEach(async () => {
    await prisma.$transaction([prisma.session.deleteMany()])
    await prisma.$transaction([prisma.user.deleteMany()])

    const usr = {
      firstName: 'Joe',
      lastName: 'Doe',
      password: await crypto.hashPassword('Password123!'),
      email: 'joe.doe@joedoe.com',
    }
    await prisma.$transaction([prisma.user.create({ data: usr })])
  })

  /*describe('Logged in user', () => {
        let newUserApiToken: any
        let bareToken: any
    
        beforeAll(async () => {
          await request(app)
            .post(`${prefix}/auth/email/login`)
            .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
            .expect(200)
            .expect(({ body }) => {
              expect(body.result.token).toMatch(
                /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
              )
            })
            .then(({ body }) => {
              bareToken = body.result.token
              newUserApiToken = 'jwt ' + bareToken
            })
        })
    
        it('should retrieve your own profile: /api/v1/auth/me (GET)', async () => {
          await request(app)
            .get(`${prefix}/auth/me`)
            .set('Authorization', newUserApiToken)
            .send()
            .expect(200)
            .expect(({ body }) => {
              expect(body.status).toBe(true)
              expect(body.path).toMatch('/auth/me')
              expect(body.statusCode).toBe(200)
              expect(body.timestamp).toMatch(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
              )
              expect(typeof body.result.firstName).toBe('string')
              expect(typeof body.result.lastName).toBe('string')
              expect(typeof body.result.email).toBe('string') //toMatch(/^\S+@\S+\.\S+$/)
              expect(typeof body.result.provider).toBe('string')
              expect(typeof body.result.role.id).toBe('number')
              expect(typeof body.result.status.id).toBe('number')
            })
        })
    
        it('should fail with no token: /api/v1/auth/me (GET)', async () => {
          await request(app)
            .get(`${prefix}/auth/me`)
            //.set('Authorization', newUserApiToken)
            .send()
            .expect(401)
            .expect(({ body }) => {
              expect(body.status).toBe(false)
              expect(body.path).toMatch('/auth/me')
              expect(body.statusCode).toBe(401)
              expect(body.timestamp).toMatch(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
              )
              expect(body.result.title).toMatch('Unauthorized')
              expect(body.result.detail).toMatch('Invalid Headers')
            })
        })
    
        it('should fail with with missing jwt prefix: /api/v1/auth/me (GET)', async () => {
          await request(app)
            .get(`${prefix}/auth/me`)
            .set('Authorization', bareToken)
            .send()
            .expect(401)
            .expect(({ body }) => {
              expect(body.status).toBe(false)
              expect(body.path).toMatch('/auth/me')
              expect(body.statusCode).toBe(401)
              expect(body.timestamp).toMatch(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
              )
              expect(body.result.title).toMatch('Unauthorized')
              expect(body.result.detail).toMatch('No jwt')
            })
        })
    
        it('should fail with wrong token: /api/v1/auth/me (GET)', async () => {
          await request(app)
            .get(`${prefix}/auth/me`)
            .set('Authorization', 'jwt wrongToken')
            .send()
            .expect(401)
            .expect(({ body }) => {
              expect(body.status).toBe(false)
              expect(body.path).toMatch('/auth/me')
              expect(body.statusCode).toBe(401)
              expect(body.timestamp).toMatch(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
              )
              expect(body.result.title).toMatch('Unauthorized')
              expect(body.result.detail).toMatch('Wrong token')
            })
        })
    
        it('should logout user: /api/v1/auth/logout (POST)', async () => {
          await request(app)
            .post(`${prefix}/auth/logout`)
            .set('Authorization', newUserApiToken)
            .send()
            .expect(204)
        })
      })*/

  describe('Login', () => {
    /*it('should successfully return data for logged user: /api/v1/auth/email/login (POST)', async () => {
            return await request(app)
              .post(`${prefix}/auth/email/login`)
              .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
              .expect(200)
              .expect(({ body }) => {
                expect(body.status).toBe(true)
                expect(body.path).toMatch('/auth/email/login')
                expect(body.timestamp).toMatch(
                  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
                )
                expect(body.statusCode).toBe(200)
                expect(body.result.token).toMatch(
                  /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
                )
                expect(body.result.refreshToken).toMatch(
                  /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
                )
                expect(body.result.tokenExpires).toBeDefined()
                expect(body.result.user.email).toMatch(/^\S+@\S+\.\S+$/)
                expect(body.result.user.hash).not.toBeDefined()
                expect(body.result.user.password).not.toBeDefined()
                expect(body.result.user.status.id).toBeDefined()
                expect(body.result.user.role.id).toBeDefined()
                expect(body.result.user.id).not.toBeDefined()
              })
          })*/
    it('should fail with missing email: /api/v1/auth/email/login (POST)', async () => {
      return await request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          //email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.status).toBe(false)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.statusCode).toBe(400)
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.result.title).toMatch('Bad Request')
          expect(body.result.detail).toMatch('Something went wrong')
          expect(body.result.errors[0]).toMatchSnapshot({
            message: 'Email must be in proper format',
          })
          expect(body.result.errors[1]).toMatchSnapshot({
            message: 'Email must be a string',
          })
          expect(body.result.errors[2]).toMatchSnapshot({
            message: 'Email cannot be empty',
          })
          expect(body.stack).toMatch(/BadRequestError: Bad Request Error/i)
        })
    })
    it('should fail with missing email and password: /api/v1/auth/email/login (POST)', async () => {
      return await request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          //email: TESTER_EMAIL,
          //password: TESTER_PASSWORD
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.status).toBe(false)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.statusCode).toBe(400)
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.result.title).toMatch('Bad Request')
          expect(body.result.detail).toMatch('Something went wrong')
          expect(body.result.errors[0]).toMatchSnapshot({
            message: 'Email must be in proper format',
          })
          expect(body.result.errors[1]).toMatchSnapshot({
            message: 'Email must be a string',
          })
          expect(body.result.errors[2]).toMatchSnapshot({
            message: 'Email cannot be empty',
          })
          expect(body.result.errors[3]).toMatchSnapshot({
            message: 'Password cannot be empty',
          })
          expect(body.stack).toMatch(/BadRequestError: Bad Request Error/i)
        })
    })
    it('should fail with email being in wrong format: /api/v1/auth/email/login (POST)', async () => {
      return await request(app)
        .post(`${prefix}/auth/email/login`)
        .send({
          email: 'joe.doejoedoe.com', // TESTER_EMAIL,
          password: TESTER_PASSWORD,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.status).toBe(false)
          expect(body.path).toMatch('/auth/email/login')
          expect(body.statusCode).toBe(400)
          expect(body.result.detail).toMatch('Something went wrong')
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.result.title).toMatch('Bad Request')
          expect(body.result.detail).toMatch('Something went wrong')
          expect(body.result.errors[0]).toMatchSnapshot({
            message: 'Email must be in proper format',
          })
          expect(body.stack).toMatch(/BadRequestError: Bad Request Error/i)
        })
    })
  })
})
