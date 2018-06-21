const supplier = require('../../common_scenarios/supplier');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const product = require('../../common_scenarios/product');
let promise = Promise.resolve();
let supplierInformation = {
  name: 'Supplier',
  description: 'Lorem ipsum dolor sit amet, dico abhorreant consequuntur pro ei, an has nisl verear.',
  phone: '0140183004',
  mobile_phone: '0123456789',
  address: 'amsterdam street',
  secondary_address: 'RDC',
  postal_code: '75009',
  city: 'paris',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description'
};
let productData = {
  name: 'P1',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'test_1',
  supplier: {
    name: 'Supplier'
  }
};
scenario('Create a new supplier in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  supplier.createSupplier(supplierInformation);
  product.createProduct(AddProductPage, productData, supplierInformation);
  scenario('Go to the Front Office', client => {
    test('should go to the "Front Office"', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname, 9000))
        .then(() => client.switchWindow(1));
    });
    test('should change the Front Office language to "English"', () => client.changeLanguage());
  }, 'common_client');
  supplier.checkSupplierInFO(supplierInformation, productData);
  scenario('Go to the back Office', client => {
    test('should go back to the Back office', () => client.switchWindow(0));
  }, 'common_client');
  supplier.updateSupplier(supplierInformation);
  scenario('Go to the Front Office', client => {
    test('should go to the Front office', () => client.switchWindow(1));
  }, 'common_client');
  supplier.checkSupplierUpdatedInFO(supplierInformation);
  scenario('Go to the back Office', client => {
    test('should go to the Back office page', () => client.switchWindow(0));
  }, 'common_client');
  supplier.deleteSupplier(supplierInformation);
  scenario('Go to the Front Office', client => {
    test('should go to the Front office', () => client.switchWindow(1));
  }, 'common_client');
  supplier.checkSupplierDeleteInFO(supplierInformation);
}, 'suppliers',true);
