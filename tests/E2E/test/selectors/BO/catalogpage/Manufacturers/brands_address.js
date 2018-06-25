module.exports = {
  BrandAddress: {
    new_brand_address_button: '//*[@id="page-header-desc-address-new_manufacturer_address"]',
    branch_select: '//*[@id="id_manufacturer"]',
    last_name_input: '//*[@id="lastname"]',
    first_name_input: '//*[@id="firstname"]',
    address_input: '//*[@id="address1"]',
    secondary_address: '//*[@id="address2"]',
    postal_code_input: '//*[@id="postcode"]',
    city_input: '//*[@id="city"]',
    country: '//*[@id="id_country"]',
    home_phone_input: '//*[@id="phone"]',
    mobile_phone_input: '//*[@id="phone_mobile"]',
    other_input: '//*[@id="other"]',
    save_button: '//*[@id="address_form_submit_btn"]',
    search_button: '//*[@id="submitFilterButtonaddress"]',
    update_button: '//*[@id="table-address"]/tbody//a[@class="edit btn btn-default"]',
    reset_button: '//*[@id="table-address"]//button[@name="submitResetaddress"]',
    dropDown_button: '//*[@id="table-address"]/tbody//button[@class="btn btn-default dropdown-toggle"]',
    delete_button: '//*[@id="table-address"]//tbody//div[@class="btn-group pull-right open"]//a[@class="delete"]',
    city_name: '//*[@id="table-address"]//td[7]',
    brand: '//*[@id="table-address"]/tbody//td[3]',
    search_input_brand: '//*[@id="table-address"]/thead//input[@name="addressFilter_m!name"]',
    search_first_name_input: '//*[@id="table-address"]/thead//input[@name="addressFilter_firstname"]',
    address_brand_name: '//*[@id="table-address"]//tr/td[3]'
  }
};
