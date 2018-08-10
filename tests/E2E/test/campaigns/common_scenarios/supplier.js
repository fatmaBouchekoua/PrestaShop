const {Menu} = require('../../selectors/BO/menu.js');
const {Supplier} = require('../../selectors/BO/catalogpage/Suppliers/suppliers');
const {CatalogPage} = require('../../selectors/BO/catalogpage/index');
let promise = Promise.resolve();
/****Example of supplier data ****
 * var supplierData = {
  * name: 'Supplier',
  * description: 'Lorem ipsum dolor sit amet, dico abhorreant consequuntur pro ei, an has nisl verear.',
  * phone: '0140183004',
  * mobile_phone: '0123456789',
  * address: 'amsterdam street',
  * secondary_address: 'RDC',
  * postal_code: '75009',
  * city: 'paris',
  * image: 'prestashop.png',
  * meta_title: 'meta title',
  * meta_description: 'meta description'
  * };
 */
module.exports = {
  createSupplier(supplierInformation) {
    scenario('Create a new "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" page', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should click on "Add new supplier" button', () => client.waitForExistAndClick(Supplier.new_supplier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Supplier.name_input, supplierInformation.name + date_time));
      test('should set the "Description" input', () => client.setEditorText(Supplier.description_input, supplierInformation.description));
      test('should set the "Phone" input', () => client.waitAndSetValue(Supplier.phone_input, supplierInformation.phone));
      test('should set the "Mobile phone" input', () => client.waitAndSetValue(Supplier.mobile_phone_input, supplierInformation.mobile_phone));
      test('should set the "Address" input', () => client.waitAndSetValue(Supplier.address_input, supplierInformation.address));
      test('should set the "Secondary address" input', () => client.waitAndSetValue(Supplier.secondary_address_input, supplierInformation.secondary_address));
      test('should set the "Postal code" input', () => client.waitAndSetValue(Supplier.postal_code_input, supplierInformation.postal_code));
      test('should set the "City" input', () => client.waitAndSetValue(Supplier.city_input, supplierInformation.city));
      test('should choose the "Country"', () => client.waitAndSelectByValue(Supplier.country, "8"));
      test('should upload "Picture" to the supplier', () => client.uploadPicture(supplierInformation.image, Supplier.image_input, "logo"));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Supplier.meta_title_input, supplierInformation.meta_title));
      test('should set the "Meta description', () => client.waitAndSetValue(Supplier.meta_description_input, supplierInformation.meta_description));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Supplier.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Supplier.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Supplier.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'suppliers');
  }
};
