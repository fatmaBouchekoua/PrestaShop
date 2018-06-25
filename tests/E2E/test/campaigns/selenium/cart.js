var CommonClient = require('../../clients/common_client');
const {AccessPageFO} = require('../../selectors/FO/access_page');
const {productPage} = require('../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../selectors/FO/order_page');

scenario('The shopping cart', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'common_client');
  scenario('Add product to cart as a guest', client => {
    scenario('Add product to cart', client => {
      test('should click on clothes category', () => client.waitForExistAndClick(productPage.cloths_category));
      test('should click on the first product', () => client.waitForExistAndClick(productPage.second_product_clothes_category));
      test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    }, 'common_client');
    scenario('The shopping cart UI', client => {
      test('should check that the modal appears', () => client.waitForVisible(CheckoutOrderPage.block_cart));
      test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
      test('should display the cart', () => client.waitForVisible(CheckoutOrderPage.cart_container));
      test('should check the product quantity', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input, 'value', '1'));
    }, 'common_client');
    scenario('The quantity input spinner', client => {
      test('should increase the product quantity', () => client.waitForExistAndClick(CheckoutOrderPage.quantity_button.replace("%WORD", 'increase')));
      test('should check the product quantity', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input, 'value', '2'));
      test('should decrease the product quantity', () => client.waitForExistAndClick(CheckoutOrderPage.quantity_button.replace("%WORD", 'decrease')));
      test('should check the product quantity', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input, 'value', '1'));
    }, 'common_client');
    scenario('The remove from cart button', client => {
      test('should remove a product from the cart', () => client.waitForExistAndClick(CheckoutOrderPage.remove_button));
      test('should check that the cart item is not visible', () => client.isNotExisting(CheckoutOrderPage.cart_item, 2000));
    }, 'common_client');
  }, 'common_client');
}, 'common_client', true);
