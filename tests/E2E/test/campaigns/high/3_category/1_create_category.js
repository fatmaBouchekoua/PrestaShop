const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
scenario('Create category', client => {
  test('should open the browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to category', () => client.goToCategoryList());
  test('should create new category', () => client.createCategory());
  test('should add category name', () => client.addCategoryName());
  test('should add category image', () => client.addCategoryImage());
  test('should add category thumb', () => client.addCategoryThumb());
  test('should add category title', () => client.addCategoryTitle());
  test('should add category meta desciption', () => client.addCategoryMetaDescription());
  test('should add category meta keys words', () => client.addCategoryMetakeyswords());
  test('should add category simplify url', () => client.addCategorySimplifyUrl());
  test('should save category ', () => client.SaveCategory());
  test('should check category success panel', () => client.successPanel('Successful creation.'));
  test('should sign out BO', () => client.signOutBO());
}, 'category', true);

scenario('Check category in BO', client => {
  test('should open the browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to category ', () => client.goToCategoryBO());
  test('should search for category ', () => client.searchCategoryBO());
  test('should check category image', () => client.checkCategoryImage());
  test('should check category image thumb', () => client.checkCategoryImageThumb());
  test('should check category title', () => client.checkCategoryTitle());
  test('should check category meta description', () => client.checkCategoryMetaDescription());
  test('should check category simplify url', () => client.checkCategorySimplifyURL());
}, 'category', true);


scenario('Check category in FO', client => {
  test('should open the browser', () => client.open());
  test('should sign in FO', () => client.signInFO(AccessPageFO));
  test('should change front office language to english', () => client.changeLanguage('english'));
  test('should open product list', () => client.openProductList());
  test('should check category existence', () => client.checkCategoryExistenceFO());
  test('should sign out FO', () => client.signOutFO(AccessPageFO));
}, 'category', true);