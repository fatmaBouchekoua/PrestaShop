var CommonClient = require('../../../clients/common_client');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CheckoutOrderPage, CustomerAccount} = require('../../../selectors/FO/order_page');
const {accountPage} = require('../../../selectors/FO/add_account_page');
let promise = Promise.resolve();

scenario('Order history page', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the language of shop to "English"', () => client.changeLanguage());
  }, 'common_client');
  scenario('Go to the customer account', client => {
    test('should go to the customer account', () => client.waitForExistAndClick(CheckoutOrderPage.customer_name));
    test('should check that the customer  be able to access their account', () => client.isExisting(CustomerAccount.your_account_page));
  }, 'common_client');
  scenario('The customer already have addresses', client => {
    test('should display a list of addresses', () => client.waitForExistAndClick(CustomerAccount.addresses_button));
    test('check that the address number is more than "0"', () => {
      return promise
        .then(() => client.getNumber(CustomerAccount.address_content, 'article', 'customerAddressesNumber'))
        .then(() => expect(global.tab['customerAddressesNumber'], "does not more than 0").to.be.greaterThan(0));
    });
  }, 'common_client');
  scenario('Create a new address', client => {
    test('should allow customer to create a new address', () => client.waitForExistAndClick(accountPage.add_new_address_button));
    test('should set the "Address" input', () => client.waitAndSetValue(accountPage.adr_address, "40,street of Forges"));
    test('should set the "Postal code" input', () => client.waitAndSetValue(accountPage.adr_postcode, "12345"));
    test('should set the "City" input', () => client.waitAndSetValue(accountPage.adr_city, "Dijon"));
    test('should click on "SAVE" button', () => client.waitForExistAndClick(accountPage.adr_save));
    test('should verify the appearance of the green validation', () => client.checkTextValue(accountPage.success_alert, 'Address successfully added!'));
    test('check the number of available addresses', () => {
      return promise
        .then(() => client.refresh())
        .then(() => client.getNumber(CustomerAccount.address_content, 'article', 'customerAddressesNumberIncresed'))
        .then(() => expect(global.tab['customerAddressesNumberIncresed'], "the number is not increased").to.be.greaterThan(global.tab['customerAddressesNumber']));
    });
  }, 'common_client');
  scenario('Update the created address', client => {
    test('should allow customer to edit the created address', () => client.waitForExistAndClick(accountPage.last_button.replace("%W", "Update")));
    test('should update the postal code', () => client.clearElementAndSetValue(accountPage.adr_postcode, "54321"));
    test('should click on "SAVE" button', () => client.waitForExistAndClick(accountPage.adr_save));
    test('should verify the appearance of the green validation', () => client.checkTextValue(accountPage.success_alert, 'Address successfully updated!'));
    test('should check that the postal code has been updated', () => client.checkTextValue(CustomerAccount.last_address, "54321", 'contain'));
  }, 'common_client');
  scenario('Delete the created address', client => {
    test('should allow customer to delete an address', () => client.waitForExistAndClick(accountPage.last_button.replace("%W", "Delete")));
    test('should verify the appearance of the green validation', () => client.checkTextValue(accountPage.success_alert, 'Address successfully deleted!'));
    test('should check that the address has been deleted', () => client.checkTextValue(CustomerAccount.last_address, "Dijon", 'notcontain'));
  }, 'common_client');
}, 'common_client', true);
