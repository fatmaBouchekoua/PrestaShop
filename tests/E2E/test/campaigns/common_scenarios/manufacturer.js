const {Menu} = require('../../selectors/BO/menu.js');
const {CatalogPage} = require('../../selectors/BO/catalogpage/index');
const {Brands} = require('../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../selectors/BO/catalogpage/Manufacturers/brands_address');
const {BrandsFO} = require('../../selectors/FO/brands_FO');
let promise = Promise.resolve();
/****Example of brand data ****
 * var brandData = {
  * name: 'Brand',
  * short_desc: 'Short description',
  * description: 'Description',
  * image: 'prestashop.png',
  * meta_title: 'meta title',
  * meta_description: 'meta description'
};*/

/**** Example of address data ****
 * var addressData={
  * last_name: 'PrestaShop',
  * first_name: 'PrestaShop',
  * address: 'Amsterdam street',
  * second_address: 'RDC',
  * postal_code: '75009',
  * city: 'Paris',
  * home_phone: '0123456789',
  * mobile_phone: '9876543210',
  * other: 'Azerty'
};*/
module.exports = {
  createManufacturer(manufacturerInformation) {
    scenario('Create a new "Manufacturer"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should click on "Add new brand" button', () => client.waitForExistAndClick(Brands.new_brand_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, manufacturerInformation.name + date_time));
      test('should set the "short description" input', () => client.setEditorText(Brands.description.replace('%NUMBER', 1), manufacturerInformation.short_desc));
      test('should set the "description" input', () => client.setEditorText(Brands.description.replace('%NUMBER', 3), manufacturerInformation.description));
      test('should upload "Picture" to the brand', () => client.uploadPicture(manufacturerInformation.image, Brands.image_input, "logo"));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Brands.meta_title_input, manufacturerInformation.meta_title));
      test('should set the "Meta description" input', () => client.waitAndSetValue(Brands.meta_description_input, manufacturerInformation.meta_description));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Brands.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Brands.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'manufacturers');
  },
  updateManufacturer(manufacturerInformation) {
    scenario('Update the created "Manufacturer"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should search for brand', () => client.searchByValue(Brands.search_input_brand, Brands.search_button, manufacturerInformation.name + date_time));
      test('should click on "the dropdown" button', () => client.waitForExistAndClick(Brands.dropdown_button));
      test('should click on "Edit" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(Brands.update_button))
          .then(() => client.editObjectData(manufacturerInformation));
      });
      test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, manufacturerInformation.name + date_time));
      test('should set the "short description" input', () => {
        return promise
          .then(() => client.waitForExist(Brands.description.replace('%NUMBER', 1), 1000))
          .then(() => client.setEditorText(Brands.description.replace('%NUMBER', 1), manufacturerInformation.short_desc));
      });
      test('should set the "description" input', () => {
        return promise
          .then(() => client.waitForExist(Brands.description.replace('%NUMBER', 3), 1000))
          .then(() => client.setEditorText(Brands.description.replace('%NUMBER', 3), manufacturerInformation.description));
      });
      test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
    }, 'manufacturers');
  },
  checkManufacturerInFO(manufacturerInformation) {
    scenario('Check that the manufacturer is well created in the Front Office', client => {
      test('should click on the "Sitemap"', () => client.scrollWaitForExistAndClick(BrandsFO.site_map, 3000));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should go to the "Brands" informations', () => client.scrollWaitForExistAndClick(BrandsFO.brands_info.replace('%s', manufacturerInformation.name.toLowerCase() + date_time)));
      test('should verify the short description of the manufacturer', () => client.checkTextValue(BrandsFO.short_description, manufacturerInformation.short_desc));
      test('should verify the description of the manufacturer', () => client.checkTextValue(BrandsFO.description, manufacturerInformation.description));
    }, 'manufacturers');
  },
  checkManufacturerDeleteInFO(manufacturerInformation) {
    scenario('Check that the manufacturer is well deleted in the Front Office', client => {
      test('should click on the "Sitemap"', () => client.scrollWaitForExistAndClick(BrandsFO.site_map, 3000));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should check that the manufacturer is not exist', () => client.isNotExisting(BrandsFO.brands_info.replace('%s', manufacturerInformation.name.toLowerCase() + date_time)));
    }, 'manufacturers');
  },
  checkProductWithManufacturerInFO(manufacturerInformation, productData) {
    scenario('Check that the manufacturer has a product', client => {
      test('should click on the "Sitemap"', () => client.waitForExistAndClick(BrandsFO.site_map));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should check that the manufacturer has product', () => client.scrollWaitForExistAndClick(BrandsFO.brands_info.replace('%s', manufacturerInformation.name.toLowerCase() + date_time)));
      test('should check the product name', () => client.checkTextValue(BrandsFO.product_name.replace('%s', productData.name.toLowerCase() + date_time), productData.name + date_time));

    }, 'manufacturers');
  },
  deleteManufacturer(manufacturerInformation, manufacturerAddress) {
    scenario('Delete the created "Manufacturer"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should search for brand', () => client.searchByValue(Brands.search_input_brand, Brands.search_button, manufacturerInformation.name + date_time));
      test('should click on "the dropdown" button', () => client.waitForExistAndClick(Brands.dropdown_button));
      test('should click on "Delete" action', () => client.waitForExistAndClick(Brands.delete_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
      test('should search for brand address', () => client.searchByValue(BrandAddress.search_first_name_input, BrandAddress.search_button, manufacturerAddress.first_name));
      test('should verify that the manufacturer is deleted', () => client.checkTextValue(BrandAddress.brand, '--'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
    }, 'manufacturers');
  },
  createManufactureAddress(manufacturerInformation, manufacturerAddress) {
    scenario('Create a new "Manufacturer address"', client => {
      test('should click on "Add new brand address" button', () => client.waitForExistAndClick(BrandAddress.new_brand_address_button));
      test('should Choose the brand name', () => client.waitAndSelectByVisibleText(BrandAddress.branch_select, manufacturerInformation.name + date_time));
      test('should set the "Last name" input', () => client.waitAndSetValue(BrandAddress.last_name_input, manufacturerAddress.last_name));
      test('should set the "First name" input', () => client.waitAndSetValue(BrandAddress.first_name_input, manufacturerAddress.first_name));
      test('should set the "Address" input', () => client.waitAndSetValue(BrandAddress.address_input, manufacturerAddress.address));
      test('should set the "Second address" input', () => client.waitAndSetValue(BrandAddress.secondary_address, manufacturerAddress.second_address));
      test('should set the "Zip code" input', () => client.waitAndSetValue(BrandAddress.postal_code_input, manufacturerAddress.postal_code));
      test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, manufacturerAddress.city));
      test('should choose the country', () => client.waitAndSelectByValue(BrandAddress.country, "8"));
      test('should set the "Home phone" input', () => client.waitAndSetValue(BrandAddress.home_phone_input, manufacturerAddress.home_phone));
      test('should set the "Mobile phone" input', () => client.waitAndSetValue(BrandAddress.mobile_phone_input, manufacturerAddress.mobile_phone));
      test('should set the "Other information" input', () => client.waitAndSetValue(BrandAddress.other_input, manufacturerAddress.other));
      test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
      test('should search for a brand', () => client.searchByValue(Brands.search_input_brand, Brands.search_button, manufacturerInformation.name + date_time));
      test('should check the address number of a brand', () => client.checkTextValue(Brands.number_addresses, '1'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
    }, 'manufacturers');
  },
  updateManufactureAddress(manufacturerInformation, manufacturerAddress) {
    scenario('Update the created "Manufacturer address"', client => {
      test('should search for a brand address ', () => client.searchByValue(BrandAddress.search_input_brand, BrandAddress.search_button, manufacturerInformation.name + date_time));
      test('should click on "Edit" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(BrandAddress.update_button))
          .then(() => client.editObjectData(manufacturerAddress));
      });
      test('should set the "First name" input', () => client.waitAndSetValue(BrandAddress.first_name_input, manufacturerAddress.first_name));
      test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, manufacturerAddress.city));
      test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should verify that the brand city is updated', () => client.checkTextValue(BrandAddress.city_name, manufacturerAddress.city));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
    }, 'manufacturers');
  },
  deleteManufacturerAddress(manufacturerAddress) {
    scenario('Delete the created "Manufacturer address"', client => {
      test('should search for a brand address ', () => client.searchByValue(BrandAddress.search_first_name_input, BrandAddress.search_button, manufacturerAddress.first_name));
      test('should click on the "dropDown" button', () => client.waitForExistAndClick(BrandAddress.dropDown_button));
      test('should click on "Delete" action', () => client.waitForExistAndClick(BrandAddress.delete_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
    }, 'manufacturers');
  }
};
