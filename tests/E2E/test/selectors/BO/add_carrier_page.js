module.exports = {
  AddCarrierPage: {
    new_carrier_button: '//*[contains(@id,"new_carrier")]/i',
    name_input: '//*[@id="name"]',
    transit_time: '//*[@id="delay_1"]',
    logo: '//*[@id="carrier_logo_input"]',
    next_button: '//*[@id="carrier_wizard"]//a[@class="buttonNext btn btn-default"]',
    shipping_handling: '//*[@id="fieldset_form_1"]//label[contains(@for,"handling_on")]',
    tax_select: '//*[@id="id_tax_rules_group"]',
    billing_weight: '//*[@id="billing_weight"]',
    range: '//*[@id="zones_table"]//tr[%NUMBER]/td[3]//input',
    all_zone: '//*[@id="zones_table"]/tbody/tr[@class="fees_all"]/td/input',
    max_width: '//*[@id="max_width"]',
    max_hieght: '//*[@id="max_height"]',
    max_depth: '//*[@id="max_depth"]',
    max_weight: '//*[@id="max_weight"]',
    finish_button: '//*[@id="carrier_wizard"]//a[@class="buttonFinish btn btn-success"]',
    green_validation: '//*[@id="content"]/div[@class="bootstrap"]/div[@class="alert alert-success"]',
  }
};
