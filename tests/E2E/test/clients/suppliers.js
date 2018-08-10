let CommonClient = require('./common_client');

class Suppliers extends CommonClient {
  addMetaKeywords(selector) {
    return this.client
      .waitForVisible(selector, 90000)
      .setValue(selector, "key words")
      .keys('\uE007')
  }
}

module.exports = Suppliers;
