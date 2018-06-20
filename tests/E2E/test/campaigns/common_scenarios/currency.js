const {Menu} = require('../../selectors/BO/menu.js');
const {CurrencyPage} = require('../../selectors/BO/international/currency');

module.exports = {
  addNewCurrency: function (Currency) {
    scenario('Add a new currency"', client => {
      test('should go to the "Localization" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu));
      test('should go to the "Currencies" page', () => client.waitForExistAndClick(Menu.Improve.International.currencies_tab));
      test('should click on "Add new currency" button', () => client.waitForExistAndClick(CurrencyPage.add_new_currency_button));
      test('should choose the "Britsh Pound Sterling" currency', () => client.waitAndSelectByValue(CurrencyPage.currency_select, "GBP"));
      test('should click on "Save" button', () => client.waitForExistAndClick(CurrencyPage.save_button));
      test('should enable  the currency', () => client.waitForExistAndClick(CurrencyPage.enable_currency));
      test('should click on "Update exchange rates" button', () => client.waitForExistAndClick(CurrencyPage.update_exchange_rates_button));
      test('should get the exchange rate', () => client.getTextInVar(CurrencyPage.exchange_rate_GBP, "exchangeRate"));
    }, 'common_client');
  },
};
