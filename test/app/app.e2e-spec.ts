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
          expect(body.status).toBe(true)
          expect(body.path).toMatch('/app/info')
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.statusCode).toBe(200)
          expect(typeof body.result.name).toBe('string')
          expect(typeof body.result.version).toBe('string')
          expect(typeof body.result.description).toBe('string')
          expect(typeof body.result.env.hostName).toBe('string')
          expect(typeof body.result.env.platform).toBe('string')
        })
    })
    it('should fail with non-existant url (GET)', () => {
      return request(app)
        .get(`${prefix}/wrong`)
        .expect(404)
        .expect(({ body }) => {
          expect(body.status).toBe(false)
          expect(body.statusCode).toBe(404)
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.path).toMatch('/api/v1/wrong')
        })
    })
    it('should fail with non-existant url (POST)', () => {
      return request(app)
        .post(`${prefix}/wrong`)
        .send()
        .expect(404)
        .expect(({ body }) => {
          expect(body.status).toBe(false)
          expect(body.statusCode).toBe(404)
          expect(body.timestamp).toMatch(
            /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
          )
          expect(body.path).toMatch('/api/v1/wrong')
        })
    })
  })
  it('should fail with non-existant url (PATCH)', () => {
    return request(app)
      .patch(`${prefix}/wrong`)
      .send()
      .expect(404)
      .expect(({ body }) => {
        expect(body.status).toBe(false)
        expect(body.statusCode).toBe(404)
        expect(body.timestamp).toMatch(
          /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
        )
        expect(body.path).toMatch('/api/v1/wrong')
      })
  })
  it('should fail with non-existant url (DELETE)', () => {
    return request(app)
      .delete(`${prefix}/wrong`)
      .send()
      .expect(404)
      .expect(({ body }) => {
        expect(body.status).toBe(false)
        expect(body.statusCode).toBe(404)
        expect(body.timestamp).toMatch(
          /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
        )
        expect(body.path).toMatch('/api/v1/wrong')
      })
  })
})
