module.exports = {
  '@tags': ['example'],
  'Example vue': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .assert.containsText('#app', 'ue-build')
      .end()
  }
}
