var PrestashopClient = require('./../prestashop_client');
var {selector} = require('../../globals.webdriverio.js');
var data = require('./../../datas/product-data');

class EditShipping extends PrestashopClient {

  goToProductShipping(){
    return this.client
      .scroll(500, 0)
      .waitForExist(selector.BO.AddProductPage.product_shipping_tab, 90000)
      .click(selector.BO.AddProductPage.product_shipping_tab)
  }

  shippingWidth(){
    return this.client
      .waitForExist(selector.BO.AddProductPage.shipping_width, 90000)
      .click(selector.BO.AddProductPage.shipping_width)
      .setValue(selector.BO.AddProductPage.shipping_width, data.common.cwidth)
  }

  shippingHeight(){
    return this.client
      .waitForExist(selector.BO.AddProductPage.shipping_height, 90000)
      .click(selector.BO.AddProductPage.shipping_height)
      .setValue(selector.BO.AddProductPage.shipping_height, data.common.cheight)
  }

  shippingDepth(){
    return this.client
      .waitForExist(selector.BO.AddProductPage.shipping_depth, 90000)
      .click(selector.BO.AddProductPage.shipping_depth)
      .setValue(selector.BO.AddProductPage.shipping_depth, data.common.cdepth)
  }

  shippingWeight(){
    return this.client
      .waitForExist(selector.BO.AddProductPage.shipping_weight, 90000)
      .click(selector.BO.AddProductPage.shipping_weight)
      .setValue(selector.BO.AddProductPage.shipping_weight, data.common.cweight)
  }

  shippingCosts(){
    return this.client
      .waitForExist(selector.BO.AddProductPage.shipping_fees, 90000)
      .click(selector.BO.AddProductPage.shipping_fees)
      .setValue(selector.BO.AddProductPage.shipping_fees, data.common.cadd_ship_coast)
  }

  selectAvailableCarrier(){
    return this.client
      .scroll(0, 600)
      .waitForExist(selector.BO.AddProductPage.shipping_available_carriers, 90000)
      .click(selector.BO.AddProductPage.shipping_available_carriers)
  }

}

module.exports = EditShipping;