module.exports = {
  Supplier: {
    new_supplier_button: '//*[@id="page-header-desc-supplier-new_supplier"]',
    name_input: '//*[@id="name"]',
    description_input: '//*[@id="mce_31"]',
    phone_input: '//*[@id="phone"]',
    mobile_phone_input: '//*[@id="phone_mobile"]',
    address_input: '//*[@id="address"]',
    secondary_address_input: '//*[@id="address2"]',
    postal_code_input: '//*[@id="postcode"]',
    city_input: '//*[@id="city"]',
    country: '//*[@id="id_country"]',
    image_input: '//*[@id="logo"]',
    meta_title_input: '//*[@id="meta_title_1"]',
    meta_description_input: '//*[@id="meta_description_1"]',
    meta_keywords_input: '(//*[@id="fieldset_0"]//input[contains(@placeholder,"Add tag")])[1]',
    active_button: '//*[@id="fieldset_0"]//label[@for="active_on"]',
    save_button: '//*[@id="supplier_form_submit_btn"]',
    number_product: '//*[@id="table-supplier"]//td[%NUMBER]',
    search_name_input: '//*[@id="table-supplier"]/thead//input[@name="supplierFilter_name"]',
    search_button: '//*[@id="submitFilterButtonsupplier"]',
    icon: '//*[@id="table-supplier"]//button[@data-toggle="dropdown"]',
    update_button: '//*[@id="table-supplier"]//a[@class="edit"]',
    reset_button: '//*[@id="table-supplier"]//button[@name="submitResetsupplier"]',
    delete_button: '//*[@id="table-supplier"]//a[@class="delete"]'
  }
};
