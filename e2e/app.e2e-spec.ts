import { NhlpoolhelperPage } from './app.po';

describe('nhlpoolhelper App', function() {
  let page: NhlpoolhelperPage;

  beforeEach(() => {
    page = new NhlpoolhelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
