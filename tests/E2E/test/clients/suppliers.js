let CommonClient = require('./common_client');
const {Supplier} = require('../selectors/BO/catalogpage/Suppliers/suppliers');

class Suppliers extends CommonClient {
  addMetaKeywords(selector) {
    return this.client
      .waitForVisible(selector, 90000)
      .setValue(selector, "key words")
      .keys('\uE007')
  }

  searchByValue(search_input, search_button, value) {
    if (global.isVisible) {
      return this.client
        .waitAndSetValue(search_input, value)
        .waitForExistAndClick(search_button);
    }
  }

  resetButton(selector, pause = 0, timeout = 90000) {
    if (global.isVisible) {
      return this.client
        .pause(pause)
        .waitForExistAndClick(selector, timeout);
    }
  }
}

module.exports = Suppliers;
