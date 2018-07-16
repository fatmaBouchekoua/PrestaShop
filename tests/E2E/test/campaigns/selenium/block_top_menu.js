const {AccessPageFO} = require('../../selectors/FO/access_page');
let promise = Promise.resolve();
scenario('The blocktopmenu', client => {
  test('should be shown on the home page', () => {
    return promise
      .then(() => client.open())
      .then(() => client.accessToFO(AccessPageFO))
      .then(() => client.changeLanguage())
      .then(() => client.isExisting(AccessPageFO.block_top_menu));
  })
}, 'common_client',true);
