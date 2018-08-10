const {AccessPageBO} = require('../../../selectors/BO/access_page');
const commonSupplierScenarios = require('../../common_scenarios/supplier');
const commonProductScenarios = require('../../common_scenarios/product');
const commonCategoryScenarios = require('../../common_scenarios/category');
const commonStockScenarios = require('../../common_scenarios/stock');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
let promise = Promise.resolve();
let categoryData = [{
  name: 'FirstCategory',
  description: 'description of category',
  picture: 'category_image.png',
  thumb_picture: 'category_miniature.png',
  meta_title: 'meta title category',
  meta_description: 'meta description category',
  meta_keywords: {
    1: 'first key',
    2: 'second key'
  },
  friendly_url: 'FirstCategory'
}, {
  name: 'SecondCategory',
  description: 'description of category',
  picture: 'category_image.png',
  thumb_picture: 'category_miniature.png',
  meta_title: 'meta title category',
  meta_description: 'meta description category',
  meta_keywords: {
    1: 'first key',
    2: 'second key'
  },
  friendly_url: 'SecondCategory'
}, {
  name: 'ThirdCategory',
  description: 'description of category',
  picture: 'category_image.png',
  thumb_picture: 'category_miniature.png',
  meta_title: 'meta title category',
  meta_description: 'meta description category',
  meta_keywords: {
    1: 'first key',
    2: 'second key'
  },
  friendly_url: 'ThirdCategory'
}];
let supplierData = [{
  name: 'FirstSupplier',
  description: 'First description',
  phone: '123456789',
  mobile_phone: '456321789',
  address: '3th district',
  secondary_address: '4th district',
  postal_code: '11111',
  city: 'Paris',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description'
}, {
  name: 'SecondSupplier',
  description: 'Second description',
  phone: '123456789',
  mobile_phone: '456321789',
  address: '3th district',
  secondary_address: '4th district',
  postal_code: '11111',
  city: 'Paris',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description'
}, {
  name: 'ThirdSupplier',
  description: 'Third description',
  phone: '123456789',
  mobile_phone: '456321789',
  address: '3th district',
  secondary_address: '4th district',
  postal_code: '11111',
  city: 'Paris',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description'
}];
let productData = [{
  name: 'FirstProduct',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'First product',
  categories: {
    1: {
      name: 'FirstCategory',
      main_category: true
    }
  },
  supplier: {
    name: 'FirstSupplier'
  },
}, {
  name: 'SecondProduct',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'Second product',
  categories: {
    1: {
      name: 'SecondCategory',
      main_category: true
    }
  },
  supplier: {
    name: 'SecondSupplier'
  }
},
  {
    name: 'ThirdProduct',
    quantity: "10",
    price: '5',
    image_name: 'image_test.jpg',
    reference: 'Third product',
    categories: {
      1: {
        name: 'ThirdCategory',
        main_category: true
      }
    },
    supplier: {
      name: 'ThirdSupplier'
    }
  }];
scenario('Make search and use filters', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  for (let m = 0; m < categoryData.length; m++) {
    commonCategoryScenarios.createCategory(categoryData[m]);
  }
  for (let m = 0; m < supplierData.length; m++) {
    commonSupplierScenarios.createSupplier(supplierData[m]);
  }
  for (let m = 0; m < productData.length; m++) {
    commonProductScenarios.createProduct(AddProductPage, productData[m]);
  }
  scenario('Test 1', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
    test('should click on "Advanced filters"', () => client.waitForExistAndClick(Stock.advanced_filters));
    test('should check many suppliers', () => {
      for (let j = 0; j < supplierData.length; j++) {
        promise = client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[j]['name'] + date_time));
      }
      return promise
        .then(() => client.pause(1000));
    });
    test('should verify if tags are added inside the searchbar', () => {
      for (let j = 0; j < supplierData.length; j++) {
        promise = client.isExisting(Stock.supplier_tag.replace('%P', supplierData[j]['name'] + date_time));
      }
      return promise
        .then(() => client.pause(1000));
    });
    test('should verify the products results', () => {
      for (let j = 0; j < supplierData.length; j++) {
        promise = client.checkTextValue(Stock.supplier_value.replace('%P', j + 1), supplierData[j]['name'] + date_time);
      }
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table));
    });
    test('should remove one tag with the keyboard', () => {
      global.number = global.numbersOfProducts;
      return promise
        .then(() => client.waitForExistAndClick(Stock.remove_supplier_tag.replace('%P', supplierData[2]['name'] + date_time)));
    });
    test('should remove one tag with the keyboard', () => {
      global.number = global.numbersOfProducts;
      return promise
        .then(() => client.waitForExistAndClick(Stock.search_supplier_input))
        .then(() => client.keys('\uE006'));
    });
    test('should verify products results', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => expect(global.numbersOfProducts).to.be.equal(global.number - 1));
    });
    test('should uncheck a box', () => client.waitForExistAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[1]['name'] + date_time)));
    test('should verify if the tag is erased inside the searchbar', () => client.isNotExisting(Stock.supplier_tag.replace('%P', supplierData[1]['name'] + date_time)));
    test('should verify products results', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => expect(global.numbersOfProducts).to.be.equal(global.number - 2));
    });
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.remove_supplier_tag.replace('%P', supplierData[0]['name'] + date_time)));
    test('should  verify if the tag is erased inside the searchbar', () => client.isNotExisting(Stock.supplier_tag.replace('%P', supplierData[0]['name'] + date_time)));
    test('should verify products results', () => {
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table))
        .then(() => expect(global.numbersOfProducts).to.be.greaterThan(supplierData.length));
    });
    test('should enter a supplier name inside the search bar', () => {
      return promise
        .then(() => client.isVisible(Stock.search_supplier_input))
        .then(() => client.search(Stock.search_supplier_input, supplierData[0]['name'] + date_time))
    });
    test('verify if the list below is filtered', () => client.checkTextValue(Stock.supplier_value.replace('%P', 1), supplierData[0]['name'] + date_time));
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.remove_supplier_tag.replace('%P', supplierData[0]['name'] + date_time)));
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)));
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.remove_supplier_tag.replace('%P', supplierData[0]['name'] + date_time)));
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)));
    test('should click on the "x"', () => client.waitForExistAndClick(Stock.remove_supplier_tag.replace('%P', supplierData[0]['name'] + date_time)));
  }, 'stocks');
  scenario('Test 2', client => {
    test('should display all categories', () => client.waitForExistAndClick(Stock.display_all_categories));
    test('should display all categories', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitForExistAndClick(Stock.display_all_categories));
    });
    test('should check many categories', () => {
      for (let j = 0; j < categoryData.length; j++) {
        promise = client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[j]['name'] + date_time));
      }
      return promise
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table));
    });
    test('should verify products results', () => {
      for (let j = 0; j < global.numbersOfProducts; j++) {
        promise = client.checkTextValue(Stock.product_value.replace('%P', j), date_time, 'contain');
      }
      return promise
        .then(() => client.pause(2000));
    });
    test('should uncheck categories', () => {
      for (let j = 0; j < categoryData.length; j++) {
        promise = client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[j]['name'] + date_time));
      }
      return promise
        .then(() => client.pause(1000));
    });
  }, 'stocks');
  scenario('Test 3', client => {
    test('should check a supplier and a category', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[0]['name'] + date_time)));
    });
    test('should verify product result', () => {
      return promise
        .then(() => client.checkTextValue(Stock.product_value.replace('%P', 1), date_time, 'contain'))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_value.replace('%P', 1), supplierData[0]['name'] + date_time));
    });
    test('should uncheck a supplier and a category', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[0]['name'] + date_time)));
    });
  }, 'stocks');
  scenario('Test 4', client => {
    test('should enter a product name existing in main search bar', () => client.waitAndSetValue(Stock.search_input, productData[0]['name'] + date_time));
    test('should Click on the search button', () => client.waitForVisibleAndClick(Stock.search_button));
    test('should Verify products results', () => client.checkTextValue(Stock.product_value.replace('%P', 1), productData[0]['name'] + date_time));
    test('should check a supplier and a category in advanced filters', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[0]['name'] + date_time)));
    });
    test('should verify product result', () => {
      return promise
        .then(() => client.checkTextValue(Stock.product_value.replace('%P', 1), date_time, 'contain'))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_value.replace('%P', 1), supplierData[0]['name'] + date_time));
    });
    test('should remove the product name and uncheck a supplier and a category in advanced filters', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Stock.remove_product.replace('%P', productData[0]['name'] + date_time)))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', categoryData[0]['name'] + date_time)))
        .then(() => client.waitForVisibleAndClick(Stock.supplier_category_checkbox.replace('%P', supplierData[0]['name'] + date_time)))
    });
  }, 'common_client');
  scenario('Test 5', client => {
    test('should enter a product name in main search bar that doesn"t exists', () => client.waitAndSetValue(Stock.search_input, 'Test'));
    test('should Click on the search button', () => client.waitForVisibleAndClick(Stock.search_button));
    test('should verify if there is a feedback inside the table "No product matches your search. Try changing search terms."', () => client.checkTextValue(Stock.alert_panel, "No product matches your search. Try changing search terms."));
    test('should remove the product name', () => client.waitForVisibleAndClick(Stock.remove_product.replace('%P', 'Test')));
  }, 'common_client');
  scenario('Test 6', client => {
    test('should filter by status: "active"', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.filter_by_status.replace('%P', 'enable')))
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table));
    });
    commonStockScenarios.verifyPoductsResults(client, Stock, 'check');
    test('should filter by status: "inactive"', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.filter_by_status.replace('%P', 'disable')))
        .then(() => client.pause(1000))
    });
    test('should verify products results', () => client.checkTextValue(Stock.product_status.replace('%P', 1), 'close'));
    test('should Filter by status: "all"', () => {
      return promise
        .then(() => client.waitForExistAndClick(Stock.filter_by_status.replace('%P', 'all')))
        .then(() => client.pause(1000))
        .then(() => client.getNumberOfProducts(Stock.products_table));
    });
    commonStockScenarios.verifyPoductsResults(client, Stock, 'check');
  }, 'stocks');
}, 'common_client');
