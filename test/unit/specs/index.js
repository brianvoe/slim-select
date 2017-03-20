import Vue from 'vue'
import app from 'src/app.vue'
/* global TEST_API */

describe('Simple assertion test', function () {
  it('Make sure test runs', function () {
    const vm = new Vue(app).$mount()

    // set property `message`
    vm.message = 'foo'

    // assert that computed property `contextMessage` updates as intended
    return assert.equal(
      vm.contextMessage,
      'foo Now go build something!', 'message doesnt equal foo')
  })

  it('Make server request', function () {
    return fetch(TEST_API + '/ok')
    .then(function (response) {
      return response.text()
    }).then(function (text) {
      assert.equal(text, 'ok', 'response from server does not match')
    }).catch(function (err) {
      throw new Error(err.message)
    })
  })
})
