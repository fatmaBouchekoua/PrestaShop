const {Menu} = require('../../selectors/BO/menu.js');
const {AddCarrierPage} = require('../../selectors/BO/add_carrier_page');

module.exports = {
  createCarrier: function (AddCarrierPage, carrierData) {
    scenario('Create a new "Carrier"', client => {
      test('should go to "Shipping" page', () => client.goToSubtabMenuPage(Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.carriers_submenu));
      test('should click on "Add new carrier" button', () => client.waitForExistAndClick(AddCarrierPage.new_carrier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(AddCarrierPage.name_input, carrierData.name + date_time));
      test('should set the "Transit time" input', () => client.waitAndSetValue(AddCarrierPage.transit_time, carrierData.transitTime));
      test('should upload the logo', () => client.uploadPicture(carrierData.image, AddCarrierPage.logo, 'image'));
      test('should click on the "Next" button', () => client.waitForExistAndClick(AddCarrierPage.next_button));
      test('should enable the "Add handling costs" ', () => client.waitForExistAndClick(AddCarrierPage.shipping_handling.replace('%id', 1), 1000));
      test('should choose the "According to total weight"', () => client.waitForExistAndClick(AddCarrierPage.billing_weight));
      test('should choose the "Tax"', () => client.waitAndSelectByValue(AddCarrierPage.tax_select, "1"));
      test('should set the "range inf " input', () => client.waitAndSetValue(AddCarrierPage.range.replace('%NUMBER', 1), carrierData.rangeInf));
      test('should set the "range sup " input', () => client.waitAndSetValue(AddCarrierPage.range.replace('%NUMBER', 2), carrierData.rangeSup));
      test('should select all zones', () => client.waitForExistAndClick(AddCarrierPage.all_zone, 1000));
      test('should set the "price per zone " input', () => client.waitAndSetValue(AddCarrierPage.range.replace('%NUMBER', 3), carrierData.price));
      test('should click on the "Next" button', () => client.scrollWaitForExistAndClick(AddCarrierPage.next_button, 60));
      test('should set the "Maximum package width (cm) " input', () => client.waitAndSetValue(AddCarrierPage.max_width, carrierData.maxPackWidth));
      test('should set the "Maximum package height (cm) " input', () => client.waitAndSetValue(AddCarrierPage.max_hieght, carrierData.maxPackheight));
      test('should set the "Maximum package depth (cm)" input', () => client.waitAndSetValue(AddCarrierPage.max_depth, carrierData.maxPackdepth));
      test('should set the "Maximum package weight (kg)" input', () => client.waitAndSetValue(AddCarrierPage.max_weight, carrierData.maxPackweight));
      test('should click on "Next" button', () => client.waitForExistAndClick(AddCarrierPage.next_button));
      test('should click on "finish" button', () => client.waitForExistAndClick(AddCarrierPage.finish_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddCarrierPage.green_validation, '×\nSuccessful creation.'));
    }, 'common_client');
  },
};
