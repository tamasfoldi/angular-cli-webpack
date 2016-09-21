import { browser, element, by } from 'protractor/globals';

export class WebpackPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  navigateToFirstHerosPage() {
    this.navigateTo();
    let firstHeroOnDashboard = element.all(by.className('hero')).first();
    firstHeroOnDashboard.click();
    return firstHeroOnDashboard;
  }
}
