module.exports = {
  Stock: {
    product_quantity_input: '(//*[@id="app"]//div[contains(@class,"edit-qty")])[%O]/input',
    product_quantity: '//*[@id="app"]//tr[%O]/td[7]',
    product_quantity_modified: '(//*[@id="app"]//tr[%O]//span[contains(@class,"qty-update")])[1]',
    save_product_quantity_button: '(//*[@id="app"]//button[contains(@class,"check-button")])[1]',
    group_apply_button: '//*[@id="app"]//button[contains(@class,"update-qty")]',
    add_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-up")])[1]',
    remove_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-down")])[1]',
    success_panel: '//*[@id="growls"]',
    search_input: '(//*[@id="search"]//input[contains(@class,"input")])[1]',
    search_button: '//*[@id="search"]//button[contains(@class,"search-button")]',
    sort_product_icon: '//*[@id="app"]//div[@data-sort-col-name="id_product" and @data-sort-direction="asc"]/span[@role="button"]',
    advanced_filters: '//*[@id="filters-container"]/button',
    supplier_category_checkbox: '//*[@id="filters"]//div[@label="%P"]//div[@class="md-checkbox"]',
    supplier_tag: '//*[@id="filters"]//div[@class="tags-wrapper"]/span[contains(text(), "%P")]',
    supplier_value: '//*[@id="app"]//tr[%P]/td[3]',
    products_table: 'table',
    remove_supplier_tag: '//*[@id="filters"]//span[contains(text(),"%P")]/i',
    search_supplier_input: '//*[@id="filters"]//input[contains(@placeholder,"supplier")]',
    display_all_categories: '(//*[@id="filters"]//div[2]//ul/li//button)[1]',
    product_value: '//*[@id="app"]//tr[%P]/td[1]//p',
    remove_product: '//*[@id="search"]//span[contains(text(),"%P")]/i',
    alert_panel: '//*[@id="app"]//p[@class="alert-text"]',
    filter_by_status: '//*[@id="filters"]//label[@for="%P"]',
    product_status: '//*[@id="app"]//tr[%P]/td[4]/i'
  }
};
