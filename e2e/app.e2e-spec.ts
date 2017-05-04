import { NcgAppPage } from './app.po';

describe('ncg-app App', () => {
  let page: NcgAppPage;

  beforeEach(() => {
    page = new NcgAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ncg works!');
  });
});
