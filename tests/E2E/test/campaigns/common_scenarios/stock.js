let promise = Promise.resolve();
module.exports = {
  changeStockProductQuantity: function (client, Stock, orderProduct, itemNumber, option = "add") {
    test('should change the product quantity', () => {
      promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', orderProduct), "productQuantity"))
        .then(() => client.moveToObject(Stock.product_quantity_input.replace('%O', orderProduct)));
      if (option === "add") {
        for (let i = 1; i < itemNumber; i++) {
          promise = client.waitForExistAndClick(Stock.add_quantity_button);
        }
      } else {
        for (let i = 1; i < itemNumber; i++) {
          promise = client.waitForExistAndClick(Stock.remove_quantity_button);
        }
      }
      return promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', orderProduct), "productQuantity"))
        .then(() => client.checkTextValue(Stock.product_quantity_modified.replace('%O', orderProduct), global.tab["productQuantity"].substring(18), "contain"));
    });
    test('should click on "Check" button of the third product quantity', () => client.waitForExistAndClick(Stock.save_product_quantity_button));
  },

  checkMovementHistory: function (client, Menu, Movement, movementIndex, itemNumber, option, type) {
    test('should go to "Movements" tab', () => {
      return promise
        .then(() => client.goToStockMovements(Menu, Movement))
        .then(() => client.pause(5000));
    });
    test('should check movement history', () => client.checkMovement(Movement, movementIndex, itemNumber, option, type));
  },

  verifyPoductsResults: function (client, Stock, value) {
    test('should verify products results', () => {
      for (let j = 0; j < global.numbersOfProducts; j++) {
        promise = client.checkTextValue(Stock.product_status.replace('%P', j + 1), value);
      }
      return promise
        .then(() => client.pause(1000));
    });
  }
};
