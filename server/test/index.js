import http from 'http'
import assert from 'assert'

import app from '../index'

describe('API photos', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000/photos', res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})
