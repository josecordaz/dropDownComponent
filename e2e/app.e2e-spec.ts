import { DropDownComponentPage } from './app.po';

describe('drop-down-component App', function() {
  let page: DropDownComponentPage;

  beforeEach(() => {
    page = new DropDownComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
