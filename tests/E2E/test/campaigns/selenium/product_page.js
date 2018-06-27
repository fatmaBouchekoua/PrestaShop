var CommonClient = require('../../clients/common_client');
const {AccessPageFO} = require('../../selectors/FO/access_page');
const {productPage} = require('../../selectors/FO/product_page');
let promise = Promise.resolve();

scenario('The product page', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'common_client');
  scenario('of a product with variants', client => {
    test('should click on clothes category', () => client.waitForExistAndClick(productPage.cloths_category));
    test('should click on the second product', () => client.waitForExistAndClick(productPage.second_product_clothes_category));
    test('should contain a variant selector', () => client.isExisting(productPage.product_variants));
    test('should show the default variant by default', () => client.isSelected(productPage.size_title.replace("%W", 'S')));
    test('should set the product size to "M"', () => client.waitAndSelectByAttribute(productPage.product_size, 'title', 'M', 3000));
    test('should check the new variant', () => client.isSelected(productPage.size_title.replace("%W", 'M')));
    test('should go back to the home page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'common_client');
  scenario('of a customizable product', client => {
    test('should choose a customized product', () => client.waitForExistAndClick(productPage.first_product));
    test('should check that the message textarea is existing', () => client.isExisting(productPage.message_textarea_input));
    test('should display the add to cart button disabled, because the product is not customized yet', () => client.isNotEnabled(productPage.quick_view_add_to_cart));
    test('should add a test message', () => client.waitAndSetValue(productPage.message_textarea_input, "test message"));
    test('should clik on "SAVE CUSTOMIZATION" button', () => client.waitForExistAndClick(productPage.save_customization_button));
    test('should display the add to cart button enabled once the product is customized', () => client.isEnabled(productPage.quick_view_add_to_cart));
  }, 'common_client');
}, 'common_client', true);
