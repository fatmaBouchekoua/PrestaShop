var CommonClient = require('../../clients/common_client');
const {AccessPageFO} = require('../../selectors/FO/access_page');

scenario('The shopping cart', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'common_client');
  scenario('The home page', client => {
    test('check that the logo is well displayed', () => client.isVisible(AccessPageFO.logo_home_page));
  }, 'common_client');
}, 'common_client', true);
