const {AccessPageFO} = require('../../selectors/FO/access_page');
const {productPage}= require('../../selectors/FO/product_page');
const {buyOrderPage}= require('../../selectors/FO/buy_order_page');
const {layerCart}= require('../../selectors/FO/layer_cart_page');
const {OrderPage} = require('../../selectors/BO/order_page');
const {AccessPageBO} = require('../../selectors/BO/access_page');
let promise = Promise.resolve();

scenario('Create order in FO', client => {
    scenario('Open the browser and connect to the FO', client => {
        test('should open the browser', () => client.open());
        test('should sign in FO', () => client.signInFO(AccessPageFO));
    }, 'order/order');
    scenario('Create order in FO', client => {
        test('should change the FO language to english', () => client.languageChange());
        test('should choose product ', () => client.waitForExistAndClick(productPage.first_product));
        test('should select product "size M" ', () => client.waitAndSelectByValue(productPage.first_product_size, '2'));
        test('should select product "color blue"', () => client.waitForExistAndClick(productPage.first_product_color));
        test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity,"4"));
        test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(buyOrderPage.add_to_cart_button));
        test('should verify the appearance of the green confirmation', () => client.checkGreenConfirmation());
        test('should click on proceed to checkout button 1', () => client.waitForExistAndClick(layerCart.command_button));
        test('should click on proceed to checkout button 2', () => client.waitForExistAndClick(layerCart.proceed_to_checkout_button));
        test('should click on confirm address button', () => client.waitForExistAndClick(buyOrderPage.checkout_step2_continue_button));
        test('should choose shipping method my carrier', () => client.waitForExistAndClick(buyOrderPage.shipping_method_option));
        test('should create message', () => client.waitAndSetValue(buyOrderPage.message_textarea, 'Order message test'));
        test('should click on "confirm delivery" button', () => client.waitForExistAndClick(buyOrderPage.checkout_step3_continue_button));
        test('should set the payment type "Payment by bank wire"', () => client.waitForExistAndClick(buyOrderPage.checkout_step4_payment_radio));
        test('should set "the condition to approve"', () => client.waitForExistAndClick(buyOrderPage.condition_check_box));
        test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(buyOrderPage.confirmation_order_button));
        test('should check the order confirmation', () => {
            return promise
                .then(() => client.checkTextValue(buyOrderPage.confirmation_order_message,'YOUR ORDER IS CONFIRMED',"contain"))
                .then(() => client.getTextInVar(buyOrderPage.order_product, "product"))
                .then(() => client.getTextInVar(buyOrderPage.order_basic_price, "basic_price"))
                .then(() => client.getTextInVar(buyOrderPage.order_total_price, "total_price"))
                .then(() => client.getTextInVar(buyOrderPage.order_reference, "reference", true))
                .then(() => client.getTextInVar(buyOrderPage.shipping_method, "method", true))
                .then(() => client.getTextInVar(buyOrderPage.order_shipping_prince_value, "shipping_price"))
        });

    }, 'order/order');
}, 'order/order', true);

scenario('Check order created in BO', client => {

    scenario('Open the browser and connect to the BO', client => {
        test('should open the browser', () => client.open());
        test('should log in successfully in Back Office', () => client.signInBO(AccessPageBO));
    }, 'order/order');

    scenario('Check order created in BO', client => {
        test('should go to "Orders" page', () => client.goToSubtabMenuPage(OrderPage.orders_subtab, OrderPage.order_submenu));
        test('should search the order created by reference', () => client.waitAndSetValue(OrderPage.reference_search, tab['reference']));
        test('should go to the searched order', () => client.waitForExistAndClick(OrderPage.search_order_button));
        test('should click on "View" order', () => client.waitForExistAndClick(OrderPage.view_order_button));
        test('should check the customer name', () => client.checkTextValue(OrderPage.customer_name, 'John DOE', 'contain'));
        test('should status be equal to "Awaiting bank wire payment"', () => client.checkTextValue(OrderPage.order_check_status, 'Awaiting bank wire payment', "equal"));
        test('should check the shipping price', () => client.checkTextValue(OrderPage.check_shipping_price, tab['shipping_price'], "equal"));
        test('should check the product', () => client.checkTextValue(OrderPage.check_product, tab['product'], "equal"));
        test('should check the order message ', () => client.checkTextValue(OrderPage.check_message_order, 'Order message test', "equal"));
        test('should check the total price', () => client.checkTextValue(OrderPage.check_total_price, tab["total_price"], "equal"));
        test('should check basic product price', () => client.checkBasicToTalPrice());
        test('should check shipping method ', () => client.checkShippingMethod());
    }, "order/order");

    scenario('Logout from Back Office', client => {
        test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'product/product');

}, "order/order", true);
