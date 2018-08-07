const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const commonProductScenarios = require('../../common_scenarios/product');
const commonStockScenarios = require('../../common_scenarios/stock');
let promise = Promise.resolve();
let dateFormat = require('dateformat');

let productData = [{
  name: 'FirstProduct',
  reference: 'firstProduct',
  quantity: "100",
  price: '5',
  image_name: 'image_test.jpg'
}, {
  name: 'SecondProduct',
  reference: 'secondProduct',
  quantity: "100",
  price: '5',
  image_name: 'image_test.jpg'
}];
let quantityValue = 5;
scenario('Update quantity in bulk', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  for (let m = 0; m < productData.length; m++) {
    commonProductScenarios.createProduct(AddProductPage, productData[m]);
  }
  scenario('Test1', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
    test('should click on "Sort by Product" icon', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon));
    });
    test('should select different products by ticking the checkboxes', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.select_product.replace("%O", 1), 1000))
        .then(() => client.waitForExistAndClick(Stock.select_product.replace("%O", 2)));
    });
    test('should enter a positive quantity "with keyboard" in the bulk field', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitAndSetValue(Stock.bulk_edit_quantity_input, quantityValue))
        .then(() => client.keys('\uE007'));
    });
    commonStockScenarios.checkSelectedProducts(client, Stock, 5, 'physical', productData, quantityValue);
    commonStockScenarios.checkSelectedProducts(client, Stock, 7, 'available', productData, quantityValue);
    test('should click on the "arrow up"', () => client.waitForExistAndClick(Stock.arrow_up));
    commonStockScenarios.checkQuantityIncreased(client, Stock, 5, 'physical');
    commonStockScenarios.checkQuantityIncreased(client, Stock, 7, 'available');
    test('should click on the "arrow down"', () => client.waitForExistAndClick(Stock.arrow_down));
    commonStockScenarios.checkQuantityDecreased(client, Stock, 5, 'physical');
    commonStockScenarios.checkQuantityDecreased(client, Stock, 7, 'available');
    test('should click on the "Apply new quantity button"', () => client.waitForExistAndClick(Stock.group_apply_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Stock.success_panel, 'Stock successfully updated'));
    commonStockScenarios.checkQuantity(client, Stock, 5, 'physical');
    commonStockScenarios.checkQuantity(client, Stock, 7, 'available');
    test('should click on "Movements" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.movement_tab));
    test('should click on "Sort by Product" icon', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon));
    });
    test('should verify if there is a line corresponding to this change in the movements tab', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => expect(global.numbersOfProducts).to.be.greaterThan(0))
        .then(() => client.getTextInVar(Movement.quantity_value.replace('%P', 1), 'quantityProduct'));
    });
    test('should check the following information: produit, reference, type, quantity, date&time and employee', () => {
      return promise
        .then(() => client.checkTextValue(Movement.product_value.replace('%P', 1), productData[1]['name'] + date_time))
        .then(() => client.checkTextValue(Movement.reference_value.replace('%P', 1), productData[1]['reference']))
        .then(() => client.checkTextValue(Movement.type_value.replace('%P', 1), 'Employee Edition'))
        .then(() => client.checkTextValue(Movement.quantity_value.replace('%P', 1), tab['quantityProduct']))
        .then(() => client.checkTextValue(Movement.time_movement.replace('%P', 1), dateFormat(global.date_time, "yyyy-mm-dd hh:MM:ss").split(" ")[0], 'contain'))
        .then(() => client.checkTextValue(Movement.employee_value.replace('%P', 1), 'Demo Prestashop'));
    });
  }, 'stocks');
  scenario('Test2', client => {
    test('should click on "Stock" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.stock_tab));
    test('should tick the checkbox', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitForExistAndClick(Stock.checkbox_bulk_quantity));
    });
    test('should verify if all  the checkboxes are checked', () => {
      return promise
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => {
          for (let i = 1; i <= global.numbersOfProducts; i++) {
            promise
              .then(() => client.isSelected(Stock.select_product_input.replace('%O', i)));
          }
          return promise.then(() => client.pause(1000));
        })
    });
    test('should enter a negative quantity "with keyboard" in the bulk field', () => {
      return promise
        .then(() => client.waitAndSetValue(Stock.bulk_edit_quantity_input, '-' + quantityValue))
        .then(() => client.keys('\uE007'));
    });
    test('should verify the physical quantity to all the selected products', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 5), 'physicalQuantitySubtract'))
          .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', j).replace('%P', 5), parseInt(global.tab['physicalQuantitySubtract'].split(" ")[0]) - quantityValue, 'contain'));
      }
      return promise.then(() => client.pause(2000));
    });
    test('should verify the available quantity to all the selected products', () => {
      for (let k = 1; k <= global.numbersOfProducts; k++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_reserved_and_available_quantity.replace('%O', k).replace('%P', 7), 'availableQuantitySubtract'))
          .then(() => client.checkTextValue(Stock.physical_and_available_quantity_updated.replace('%O', k).replace('%P', 7), parseInt(global.tab['availableQuantitySubtract'].split(" ")[0]) - quantityValue, 'contain'));
      }
      return promise.then(() => client.pause(5000));
    });
    test('should click on the "arrow up"', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.arrow_up))
        .then(() => client.getAttributeInVar(Stock.bulk_edit_quantity_input, 'value', 'bulkQuantityIncreased'));
    });
    test('should Verify if the physical  quantity  has been increase of +1 to all the selected products', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', j).replace('%P', 5), 'physicalQuantityIncreased'))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 5), parseInt(global.tab['physicalQuantityIncreased'].split(" ")[1]) - parseInt(tab['bulkQuantityIncreased']), 'contain'));
      }
      return promise.then(() => client.pause(5000));
    });
    test('should Verify if the available  quantity  has been increase of +1 to all the selected products', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', j).replace('%P', 7), 'availableQuantityIncreased'))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 7), parseInt(global.tab['availableQuantityIncreased'].split(" ")[1]) - parseInt(tab['bulkQuantityIncreased']), 'contain'));
      }
      return promise.then(() => client.pause(5000));
    });
    test('should click on the "arrow down"', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.arrow_down))
        .then(() => client.getAttributeInVar(Stock.bulk_edit_quantity_input, 'value', 'bulkQuantityDecreased'));
    });
    test('should Verify if the physical  quantity  has been decrease of -1 to all the selected products', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', j).replace('%P', 5), 'physicalQuantityDecreased'))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 5), parseInt(global.tab['physicalQuantityDecreased'].split(" ")[1]) - parseInt(tab['bulkQuantityDecreased']), 'contain'));
      }
      return promise.then(() => client.pause(4000));
    });
    test('should Verify if the available  quantity  has been decrease of -1 to all the selected products', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getTextInVar(Stock.physical_and_available_quantity_updated.replace('%O', j).replace('%P', 7), 'availableQuantityDecreased'))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 7), parseInt(global.tab['availableQuantityDecreased'].split(" ")[1]) - parseInt(tab['bulkQuantityDecreased']), 'contain'));
      }
      return promise.then(() => client.pause(4000));
    });
    test('should click on the "Apply new quantity button"', () => client.waitForExistAndClick(Stock.group_apply_button));
    test('should verify the appearance of the green validation', () => {
      return promise
        .then(() => client.waitForVisible(Stock.success_panel))
        .then(() => client.checkTextValue(Stock.success_panel, 'Stock successfully updated'));
    });
    test('should verify if the physical  quantity  have been updated', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getReservedQuantities(Stock.physical_reserved_and_available_quantity, j))
          .then(() => client.getAvailableQuantities(Stock.physical_reserved_and_available_quantity, j))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 5), (parseInt(global.reservedQuantity[j]) + parseInt(global.availableQuantity[j])).toString()));
      }
      return promise.then(() => client.pause(5000))
    });
    test('should verify if the available  quantity  have been updated', () => {
      for (let j = 1; j <= global.numbersOfProducts; j++) {
        promise
          .then(() => client.getPhysicalQuantities(Stock.physical_reserved_and_available_quantity, j))
          .then(() => client.checkTextValue(Stock.physical_reserved_and_available_quantity.replace('%O', j).replace('%P', 7), (parseInt(global.physicalQuantity[j]) - parseInt(global.reservedQuantity[j])).toString()));
      }
      return promise.then(() => client.pause(5000));
    });
    test('should click on "Movements" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.movement_tab));
    test('should verify if there is a line corresponding to this change in the movements tab', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => expect(global.numbersOfProducts).to.be.greaterThan(0))
        .then(() => client.getTextInVar(Movement.product_value.replace('%P', 1), 'product'))
        .then(() => client.getTextInVar(Movement.reference_value.replace('%P', 1), 'reference'))
        .then(() => client.getTextInVar(Movement.quantity_value.replace('%P', 1), 'quantity'))
        .then(() => client.getTextInVar(Movement.time_movement.replace('%P', 1), 'time'));
    });
    test('should check the following information: produit, reference, type, quantity, date&time and employee', () => {
      return promise
        .then(() => client.checkTextValue(Movement.product_value.replace('%P', 1), tab['product']))
        .then(() => client.checkTextValue(Movement.reference_value.replace('%P', 1), tab['reference']))
        .then(() => client.checkTextValue(Movement.type_value.replace('%P', 1), 'Employee Edition'))
        .then(() => client.checkTextValue(Movement.quantity_value.replace('%P', 1), tab['quantity']))
        .then(() => client.checkTextValue(Movement.time_movement.replace('%P', 1), tab['time'].split(" ")[0], 'contain'))
        .then(() => client.checkTextValue(Movement.employee_value.replace('%P', 1), 'Demo Prestashop'));
    });
  }, 'stocks');
}, 'common_client');
