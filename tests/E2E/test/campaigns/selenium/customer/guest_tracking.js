const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {GuestOrderTracking} = require('../../../selectors/FO/order_page');
const {accountPage} = require('../../../selectors/FO/add_account_page');
let promise = Promise.resolve();
let order = {
  reference: 'KHWLILZLL',
};
let customer = {
  email: 'pub@prestashop.com',
}
scenario('Order tracking', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
    scenario('The Guest order tracking page', client => {
      test('should display the guest order tracking form', () => {
        return promise
          .then(() => client.guestTraking('guest-tracking'))
          .then(() => client.isExisting(GuestOrderTracking.guest_order_tracking_form));
      });
      test('should take you to the login form (order #5)', () => {
        return promise
          .then(() => client.waitAndSetValue(GuestOrderTracking.order_reference_input, order.reference))
          .then(() => client.waitAndSetValue(GuestOrderTracking.email_input, customer.email))
          .then(() => client.waitForExistAndClick(GuestOrderTracking.send_button))
          .then(() => client.isExisting(accountPage.login_form));
      });
    }, 'common_client');
  }, 'common_client');
}, 'common_client', true);
