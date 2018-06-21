module.exports = {
  SupplierFO: {
    site_map: '//*[@id="link-static-page-sitemap-2"]',
    supplier_page: '//*[@id="supplier-page"]',
    supplier_infos: '//a[contains(@href,"%s")]',
    product_infos: '//*[@id="js-product-list"]//div[@class="product-description"]//a[contains(@href,"%s")]',
    name_fo: '//*[@id="main"]//div[@class="brand-infos"]//a[contains(@href,"%s")]'
  }
};
