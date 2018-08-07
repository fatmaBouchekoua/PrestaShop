module.exports = {
  Stock: {
    product_quantity_input: '(//*[@id="app"]//div[contains(@class,"edit-qty")])[%O]/input',
    product_quantity: '//*[@id="app"]//tr[%O]/td[7]',
    product_quantity_modified: '(//*[@id="app"]//tr[%O]//span[contains(@class,"qty-update")])[1]',
    save_product_quantity_button: '(//*[@id="app"]//button[contains(@class,"check-button")])[1]',
    group_apply_button: '//*[@id="app"]//button[contains(@class,"update-qty")]',
    add_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-up")])[1]',
    remove_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-down")])[1]',
    success_panel: '//*[@id="search"]/div[contains(@class,"alert-box")]/div[contains(@class,"alert-success")]//p',
    search_input: '(//*[@id="search"]//input[contains(@class,"input")])[1]',
    search_button: '//*[@id="search"]//button[contains(@class,"search-button")]',
    sort_product_icon: '(//*[@id="app"]//span[@role="button"])[1]',
    select_product_input: '//*[@id="app"]//tbody/tr[%O]//div[@class="md-checkbox"]//input',
    select_product: '//*[@id="app"]//tbody/tr[%O]//div[@class="md-checkbox"]',
    bulk_edit_quantity_input: '//*[@id="app"]//div[contains(@class,"bulk-qty")]/input',
    physical_and_available_quantity_updated: '//*[@id="app"]//tr[%O]/td[%P]/span[@class="qty-update"]',
    physical_reserved_and_available_quantity: '//*[@id="app"]//tr[%O]/td[%P]',
    arrow_up: '//*[@id="app"]//section/div[contains(@class,"actions")]//span[@class="ps-number-up"]',
    arrow_down: '//*[@id="app"]//section/div[contains(@class,"actions")]//span[@class="ps-number-down"]',
    checkbox_bulk_quantity: '//*[@id="app"]//div[contains(@class,"mt-3")]',
    products_table: 'table'
  }
};
