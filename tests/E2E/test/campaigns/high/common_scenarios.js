let promise = Promise.resolve();
const {OnBoarding} = require('../../selectors/BO/onboarding.js');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {AccessPageFO} = require('../../selectors/FO/access_page');


module.exports = {
  signInBO: function () {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'common_client');
  },

  signOutBO: function () {
    scenario('Logout from the Back Office', client => {
      test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'common_client');
  },

  signInFO: function () {
    scenario('Login in the Front office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Front office', () => client.signInFO(AccessPageFO));
    }, 'common_client');
  },

  signOutFO: function () {
    scenario('Logout from the Front office', client => {
      test('should logout successfully from the Front office', () => client.signOutFO(AccessPageFO));
    }, 'common_client');
  },

  closeOnboarding: function () {
    scenario('Close the onboarding modal if exist ', client => {
      test('should close the onboarding modal if exist', () => {
        return promise
          .then(() => client.isVisible(OnBoarding.welcome_modal))
          .then(() => client.closeBoarding(OnBoarding.popup_close_button))
      });
    }, 'common_client');
  }
};
