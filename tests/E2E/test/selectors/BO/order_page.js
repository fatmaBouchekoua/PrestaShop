module.exports = {
  OrderPage:{
    orders_subtab: '#subtab-AdminParentOrders',
    form: '#form-order',
    order_product_name_span: '.productName',
    order_product_quantity_span: '.product_quantity_show',
    order_product_total: '#total_order > td.amount.text-right.nowrap',
    order_reference_span: '((//div[@class="panel-heading"])[1]/span)[1]',
    first_order: '//*[@id="form-order"]/div/div[2]/table/tbody/tr[1]/td[12]/div/a',
    order_state_select: '//*[@id="id_order_state"]',
    update_status_button: '//*[@id="status"]/form/div/div[2]/button',
    order_quantity: '//*[@id="orderProducts"]/tbody/tr[1]/td[4]/span[1]',
    order_check_status: '//*[@id="status"]/div/table/tbody/tr[1]/td[2]',
    check_shipping_Cost: '//*[@id="shipping_table"]/tbody/tr/td[5]/span',
    check_message_order: '//*[@id="content"]//div[@class="message-body"]//p[@class="message-item-text"]',
    check_payment_type: '//*[@id="formAddPayment"]/div/table/tbody/tr[1]/td[2]',
    check_quantity: '//*[@id="orderProducts"]/tbody/tr[1]/td[4]/span[1]',
    quantity_value:'//*[@id="orderProducts"]/tbody/tr[1]/td[4]/span[2]/input',
    product_Url: '//*[@id="orderProducts"]/tbody/tr[1]/td[2]/a',
    basic_price_value: '//*[@id="customer_cart"]/tbody/tr/td[4]/input',
    edit_product_button: '//*[@id="orderProducts"]/tbody/tr[1]/td[13]/div/button[1]',
    second_edit_product_button:'//*[@id="orderProducts"]/tbody/tr[1]/td[12]/div/button[1]',
    product_basic_price: '//*[@id="orderProducts"]/tbody/tr[1]/td[3]/div/div/div[1]/div/input',
    customer_name: '//*[@id="content"]//div[@class="message-body"]//h4[@class="message-item-heading"]',
    update_order_status_button: '//*[@id="status"]/form/div/div[2]/button',
    order_submenu: '//*[@id="subtab-AdminOrders"]/a',
    document_submenu:'//*[@id="tabOrder"]/li[2]/a',
    download_button:'//*[@id="documents_table"]/tbody/tr[1]/td[3]/a',
    download_delivery_button:'//*[@id="documents_table"]/tbody/tr[3]/td[3]/a',
    check_shipping_price: '//*[@id="shipping_table"]/tbody/tr/td[5]/span',
    check_product: '//*[@id="orderProducts"]/tbody/tr[1]/td[2]/a/span',
    check_total_price: '//*[@id="total_products"]/td[2]',
    check_shipping_method: '//*[@id="shipping_table"]/tbody/tr/td[3]',
    reference_search: '//*[@id="form-order"]/div/div[2]/table/thead/tr[2]/th[3]/input',
    search_order_button: '//*[@id="submitFilterButtonorder"]',
    view_order_button: '//*[@id="form-order"]/div/div[2]/table/tbody/tr/td[12]/div/a',
  }
};