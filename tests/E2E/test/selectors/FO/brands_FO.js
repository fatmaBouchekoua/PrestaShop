module.exports = {
  BrandsFO: {
    site_map: '//*[@id="link-static-page-sitemap-2"]',
    brands_page: '//*[@id="manufacturer-page"]',
    brands_info: '//*[@id="main"]//ul/li[@class="brand"]//div[@class="brand-infos"]//a[contains(@href,"%s")]',
    image: '//*[@id="main"]//ul/li[@class="brand"]//a[contains(@href,"%s")]/img',
    short_description: '//*[@id="manufacturer-short_description"]/p',
    description: '//*[@id="manufacturer-description"]/p',
    all_products: '//*[@id="main"]//div[@class="brand-products"]/a[%id]',
    product_name: '//*[@id="js-product-list"]//h2/a[contains(@href,"%s")]'
  }
};
