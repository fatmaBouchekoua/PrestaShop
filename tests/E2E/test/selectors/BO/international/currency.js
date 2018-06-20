module.exports = {
  CurrencyPage: {
    add_new_currency_button: '//*[contains(@id,"new_currency")]/i',
    currency_select: '//*[@id="iso_code"]',
    save_button: '//*[@id="currency_form_submit_btn"]/i',
    update_exchange_rates_button: '//*[@id="currency_form"]/button',
    enable_currency: '//*[@id="table-currency"]//td[5]//i[@class="icon-remove"]',
    exchange_rate_GBP: '//*[@id="table-currency"]/tbody/tr[2]/td[4]'
  }
};
