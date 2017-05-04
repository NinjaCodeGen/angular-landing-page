import { browser, element, by } from 'protractor';

export class NcgAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ncg-root h1')).getText();
  }
}
