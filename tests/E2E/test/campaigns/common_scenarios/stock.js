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

  checkSelectedProducts: function (client, Stock, j, text, productData, quantityValue) {
    test('should verify the ' + text + ' quantity to all the selected products', () => {
        return promise
          .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 1).replace('%P', j), (parseInt(productData[0]['quantity']) + quantityValue).toString(), 'contain'))
          .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 2).replace('%P', j), (parseInt(productData[1]['quantity']) + quantityValue).toString(), 'contain'))
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', 1).replace('%P', j), text + 'QuantityUpdatedProd2'))
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', 2).replace('%P', j), text + 'QuantityUpdatedProd1'));
      }
    );
  },

  checkQuantity: function (client, Stock, i, text) {
    test('should verify if the ' + text + ' quantity have been updated', () => {
        return promise
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', 1).replace('%P', i), tab["physicalQuantityUpdatedProd2"].split(' ')[1], 'contain'))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', 2).replace('%P', i), tab["physicalQuantityUpdatedProd1"].split(' ')[1], 'contain'));
      }
    );
  },

  checkQuantityIncreased: function (client, Stock, j, text) {
    test('should Verify if the ' + text + ' quantity  has been increase of +1 to all the selected products', () => {
      return promise
        .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 1).replace('%P', j), (parseInt(tab["physicalQuantityUpdatedProd2"].split(' ')[1]) + 1).toString(), 'contain'))
        .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 2).replace('%P', j), (parseInt(tab["physicalQuantityUpdatedProd1"].split(' ')[1]) + 1).toString(), 'contain'));
    });
  },

  checkQuantityDecreased: function (client, Stock, j, text) {
    test('should verify if the ' + text + ' quantity  has been decrease of -1 to all the selected products', () => {
      return promise
        .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 1).replace('%P', j), tab["availableQuantityUpdatedProd2"], 'contain'))
        .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', 2).replace('%P', j), tab["availableQuantityUpdatedProd1"], 'contain'));
    });
  }

};
