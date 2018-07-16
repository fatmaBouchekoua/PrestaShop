const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CheckoutOrderPage, CustomerAccount} = require('../../../selectors/FO/order_page');
scenario('My account page', client => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the language of shop to "English"', () => client.changeLanguage());
  }, 'common_client');
  scenario('The customer account has basic feature', client => {
    test('should go to the customer account', () => client.waitForExistAndClick(CheckoutOrderPage.customer_name));
    test('should display addresses link', () => client.isExisting(AccessPageFO.address_information_link));
    test('should display identity link', () => client.isExisting(CustomerAccount.identity_link));
    test('should display history link', () => client.isExisting(CustomerAccount.order_history_button));
    test('should display credit splips link', () => client.isExisting(CustomerAccount.order_slips_link));
    test('should display vouchers link', () => client.isExisting(CustomerAccount.discount_link));
    test('should display returns link', () => client.isExisting(CustomerAccount.returns_link));
  }, 'common_client');
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
  }, 'common_client');
}, 'common_client', true);
