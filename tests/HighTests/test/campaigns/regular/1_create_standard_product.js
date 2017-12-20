const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {AccessPageFO} = require('../../selectors/FO/access_page');
const {SearchProductPage} = require('../../selectors/FO/search_product_page');
var data = require('./../../datas/product-data');

scenario('Create Standard Product', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog"', () => client.waitForExistAndClick(AddProductPage.products_subtab));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Edit Basic settings', client => {
    test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, 'Robe' + date_time));
    test('should set the "Quantity" of product', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, "10"));
    test('should upload the first product picture', () => client.uploadPicture('1.png', AddProductPage.picture));
    test('should set the "Tax exclude" price', () => client.addProductPriceTaxExcluded());
    test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, data.common.product_reference));
    test('should set the product "online"', () => client.waitForExistAndClick(AddProductPage.product_online_toggle));
  }, 'product/product');

  scenario('Save Product', client => {
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'product/product');

}, 'product/product', true);

scenario('Check the product creation in the "Catalog" page', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog"', () => client.goToCatalog());
  test('should search for product by name', () => client.searchProductByName('Robe' + date_time));
  test('should check the existence of product name', () => client.checkTextValue(AddProductPage.catalog_product_name, 'Robe' + date_time));
  test('should check the existence of product reference', () => client.checkTextValue(AddProductPage.catalog_product_reference, data.common.product_reference));
  test('should check the existence of product category', () => client.checkTextValue(AddProductPage.catalog_product_category, "Home"));
  test('should check the existence of product price TE', () => client.checkProductPriceTE());
  test('should check the existence of product quantity', () => client.checkTextValue(AddProductPage.catalog_product_quantity, data.common.quantity));
  test('should check the existence of product status', () => client.checkTextValue(AddProductPage.catalog_product_online, 'check'));
  test('should reset filter', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
}, 'product/check_product', true);

scenario('Check the product information in the Product details page in the FO', client => {
  test('should open browser', () => client.open());
  test('should sign in FO', () => client.signInFO(AccessPageFO));
  test('should change the FO language to english', () => client.languageChange());
  test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, 'Robe' + date_time));
  test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
  test('should check that the product attribute name is "'+'attribute' + date_time+'"', () => client.checkTextValue(SearchProductPage.attribut_name, 'attribute' + date_time));
  // test('should check the existence of product name', () => client.checkTextValue(AddProductPage.catalog_product_name, data.standard.name + date_time));
  // test('should check the existence of product reference', () => client.checkTextValue(AddProductPage.catalog_product_reference, data.common.product_reference));
  // test('should check the existence of product category', () => client.checkTextValue(AddProductPage.catalog_product_category, "Home"));
  // test('should check the existence of product price TE', () => client.checkProductPriceTE());
  // test('should check the existence of product quantity', () => client.checkTextValue(AddProductPage.catalog_product_quantity, data.common.quantity));
  // test('should check the existence of product status', () => client.checkTextValue(AddProductPage.catalog_product_online, 'check'));
  // test('should reset filter', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
}, 'product/check_product', true);

