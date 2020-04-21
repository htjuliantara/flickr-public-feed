import http from 'http'
import assert from 'assert'

import server from '../index'

describe('API photos', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:8000/photos', res => {
      assert.equal(200, res.statusCode)
      server.close()
      done()
    })
  })
})
