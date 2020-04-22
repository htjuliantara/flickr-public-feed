import http from 'http'
import assert from 'assert'
import server from '../src/index'
import dotenv from 'dotenv'

dotenv.config();

describe('API photos', () => {
  it('should return 200', done => {
    http.get(`${process.env.BASE_URL}:${process.env.PORT}/photos`, res => {
      assert.equal(200, res.statusCode)
      server.close()
      done()
    })
  })
})
