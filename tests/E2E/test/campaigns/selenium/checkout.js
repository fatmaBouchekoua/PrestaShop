const {AccessPageFO} = require('../../selectors/FO/access_page');
const {accountPage} = require('../../selectors/FO/add_account_page');
const order = require('../common_scenarios/order');
var faker = require('faker');
let promise = Promise.resolve();
let guestScenario = {
  name: "Guest Checkout",
  customerDoesntHaveAnAccount: true,
  customerOrdersAsGuest: true,
  deliveryAddressIsInvoiceAddress: true,
  customerHasAnAddress: false
};
let registrationScenario = Object.assign({}, guestScenario, {
  name: "Registration Checkout",
  customerOrdersAsGuest: false
});
let guestScenarioDifferentAddresses = Object.assign({}, guestScenario, {
  name: "Guest Checkout With Different Invoice Address",
  deliveryAddressIsInvoiceAddress: false
});
let existingCustomerScenario = Object.assign({}, guestScenario, {
  name: "Checkout by Existing Customer Not Logged-In Yet",
  customerDoesntHaveAnAccount: false,
  customerOrdersAsGuest: false,
  customerHasAnAddress: true,
  deliveryAddressIsInvoiceAddress: true
});
let scenarios = [
  existingCustomerScenario,
  guestScenario,
  guestScenarioDifferentAddresses,
  registrationScenario
];
let user = {
  name: {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  },
  email: faker.internet.email(),
  location: {
    street: faker.address.streetAddress(),
    city: faker.address.city()
  }
};
let customer = {
  email: 'pub@prestashop.com',
  password: '123456789'
}

scenario('The Checkout Process', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'common_client');
  scenarios.forEach(runScenario);
}, 'common_client', true);

function runScenario(Scenario) {
  scenario(Scenario.name, function () {
    scenario('Add product to cart', client => {
      order.initCheckout();
    }, 'order');
    scenario('The Steps Of The Order Process', client => {
      test('should show the personal information step as reachable', () => client.isExisting(accountPage.checkout_personal_information_step));
      test('should show the account creation form', () => client.isExisting(accountPage.customer_form));
      test('should show a link to the login form', () => client.isExisting(accountPage.sign_tab));
      scenario('The personal information step', client => {
        if (Scenario.customerOrdersAsGuest || Scenario.customerDoesntHaveAnAccount) {
          let infoFormTestText = 'should allow filling the personal info form';
          if (Scenario.customerOrdersAsGuest) {
            infoFormTestText += ' without password';
          }
          test(infoFormTestText, () => {
            return promise
              .then(() => client.waitAndSetValue(accountPage.firstname_input, user.name.first))
              .then(() => client.waitAndSetValue(accountPage.lastname_input, user.name.last))
              .then(() => client.waitAndSetValue(accountPage.email_input, user.email))
              .then(() => {
                if (!Scenario.customerOrdersAsGuest) {
                  return promise
                    .then(() => client.waitAndSetValue(accountPage.password_input, '123456789'));
                }
              })
              .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
              .then(() => client.checkTextValue(accountPage.checkout_step, " PERSONAL INFORMATION", 'contain'));
          });
        }
        else {
          test('should let the user login instead of registering', () => {
            return promise
              .then(() => client.waitForExistAndClick(accountPage.sign_tab))
              .then(() => client.isExisting(accountPage.signin_email_input))
              .then(() => client.waitAndSetValue(accountPage.signin_email_input, customer.email))
              .then(() => client.waitAndSetValue(accountPage.signin_password_input, customer.password))
              .then(() => client.waitForExistAndClick(accountPage.continue_button));
          });
        }
      }, 'common_client');
      scenario('The addresses step', client => {
        test('should show the addresses step as reachable', () => client.isExisting(accountPage.checkout_addresses_step));
        if (!Scenario.customerHasAnAddress) {
          test('should show the delivery address form', () => client.isNotExisting(accountPage.delivery_addresses));
          test('the delivery address form should have the customer firstname and lastname pre-filled', () => {
            return promise
              .then(() => client.getAttributeInVar(accountPage.adr_first_name, 'value', 'firstName'))
              .then(() => client.getAttributeInVar(accountPage.adr_last_name, 'value', 'lastName'))
              .then(() => client.checkAttributeValue(accountPage.adr_first_name, 'value', tab['firstName']))
              .then(() => client.checkAttributeValue(accountPage.adr_last_name, 'value', tab['lastName']));
          });
          test('should fill the address form and go to delivery step', () => {
            return promise
              .then(() => client.waitAndSetValue(accountPage.adr_address, user.location.street))
              .then(() => client.waitAndSetValue(accountPage.adr_postcode, '00000'))
              .then(() => client.waitAndSetValue(accountPage.adr_city, user.location.city))
              .then(() => client.waitForExistAndClick(accountPage.delivery_address_continue));
          });
        }
        else {
          test('should have an existing address pre-selected', () => {
            return promise
              .then(() => client.isExisting(accountPage.delivery_addresses))
              .then(() => client.checkAttributeValue(accountPage.first_address, 'class', 'selected', 'contain'));
          });
          test('should go to the next step once the customer clicks continue', () => client.waitForExistAndClick(accountPage.confirm_address_button));
        }
        if (!Scenario.deliveryAddressIsInvoiceAddress) {
          test('should open another address form for the invoice address', () => {
            return promise
              .then(() => client.waitForExistAndClick(accountPage.checkout_addresses_step))
              .then(() => client.waitForExistAndClick(accountPage.different_address))
              .then(() => client.isExisting(accountPage.invoice_address_form));
          });
          test('should still show the delivery address', () => client.isExisting(accountPage.delivery_addresses));
          test('but without edit button', () => client.isNotExisting(accountPage.adr_update));
          test('should fill the invoice address form', () => {
            return promise
              .then(() => client.waitAndSetValue(accountPage.adr_address, user.location.street))
              .then(() => client.waitAndSetValue(accountPage.adr_postcode, '11111'))
              .then(() => client.waitAndSetValue(accountPage.adr_city, user.location.city))
              .then(() => client.waitForExistAndClick(accountPage.invoice_address_continue));
          });
          test('should have gone to the next step after clicking on the button in the invoice address form', () => client.isExisting(accountPage.delivery_form));
        }
        test('should show the addresses step as "done"', () => client.isExisting(accountPage.checkout_addresses_step));
      }, 'common_client');
      scenario('The delivery step', client => {
        test('should show delivery options', () => client.isExisting(accountPage.delivery_option_list));
        test('the delivery options have an impact on cart summary display', () => {
          return promise
            .then(() => client.getTextInVar(accountPage.summary_cart, 'summaryCart'))
            .then(() => client.waitForExistAndClick(accountPage.delivery_option.replace('%NUMBER', 2)))
            .then(() => client.checkTextValue(accountPage.summary_cart, tab['summaryCart']));
        });
        test('should be marked as complete after user has clicked continue', () => {
          return promise
            .then(() => client.waitForExistAndClick(accountPage.confirm_delivery_option))
            .then(() => client.isExisting(accountPage.delivery_step));
        });
      }, 'common_client');
      scenario('The payment step', client => {
        test('should show a checkbox to accept the terms and conditions', () => client.isExisting(accountPage.conditons_form));
        test('should have a disabled order button', () => client.isDisabled(accountPage.payment_confirmation_button));
        test('should check the terms-and-conditions', () => client.waitForExistAndClick(accountPage.terms_and_conditions));
        test('should choose a payment option', () => client.waitForExistAndClick(accountPage.payment_option.replace("%NUMBER", 2)));
        test('should confirm the payment', () => {
          return promise
            .then(() => client.waitForExistAndClick(accountPage.payment_confirmation_button))
            .then(() => client.isExisting(accountPage.order_confirmation))
            .then(() => client.waitForExistAndClick(AccessPageFO.logo_home_page))
            .then(() => client.changeLanguage());
        });
      }, 'common_client');
    }, 'common_client');
    if (!Scenario.customerOrdersAsGuest) {
      scenario('After the order, when the customer did create an account', client => {
        test('the customer should be logged in', () => {
          return promise
            .then(() => client.isExisting(AccessPageFO.sign_out_button))
            .then(() => client.isExisting(AccessPageFO.account_button));
        });
      }, 'common_client');
    }
  }, 'common_client');
  scenario('Delete cookie', client => {
    test('should delete cookie', () => client.deleteCookie());
  }, 'common_client');
}
