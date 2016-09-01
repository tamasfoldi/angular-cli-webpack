import { element, by, browser } from 'protractor/globals';
import { WebpackPage } from './app.po';

describe('webpack App', function () {
  let page: WebpackPage;

  beforeEach(() => {
    page = new WebpackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });

  it('should navigate to heroes', () => {
    page.navigateTo();
    let heroesButton = element(by.cssContainingText('nav a', 'Heroes'));
    heroesButton.click();

    expect(browser.getCurrentUrl()).toContain('/heroes');
  });

  it('should navigate to dashboard', () => {
    page.navigateTo();
    let heroesButton = element(by.cssContainingText('nav a', 'Heroes'));
    let dashboardButton = element(by.cssContainingText('nav a', 'Dashboard'));
    heroesButton.click();
    dashboardButton.click();

    expect(browser.getCurrentUrl()).toContain('/dashboard');
  });

  describe('dashboard', () => {
    it('should navigate to a selected hero page', () => {
      page.navigateTo();
      let heroElement = element.all(by.className('hero')).first();
      let heroName = heroElement.element(by.tagName('h4')).getText();

      heroElement.click();
      expect(browser.getCurrentUrl()).toContain('/detail/');
      let headerTitle = element(by.tagName('app-hero-detail h2')).getText();

      expect(headerTitle).toContain(heroName);
    });

    it('should search for the hero and navigate to the selected page', () => {
      page.navigateTo();
      let searchInputElement = element(by.tagName('input'));
      searchInputElement.sendKeys('t');
      browser.sleep(300);
      let firstSearchResult = element.all(by.className('search-result')).first();

      firstSearchResult.click();

      expect(browser.getCurrentUrl()).toContain('/detail/');
    });
  });

  describe('hero detail', () => {

    it('should save the edited hero name on save and navigate to the dashboard', () => {
      let firstHeroOnDashboard = page.navigateToFirstHerosPage();
      let heroNameInput = element(by.tagName('input'));
      let saveButton = element(by.cssContainingText('button', 'Save'));

      heroNameInput.sendKeys('test');
      saveButton.click();

      expect(browser.getCurrentUrl()).toContain('/dashboard');
      expect(firstHeroOnDashboard.getText()).toContain('test');
    });

    it('should not save the edited hero name on back and navigate to the dashboard', () => {
      let firstHeroOnDashboard = page.navigateToFirstHerosPage();
      let heroNameInput = element(by.tagName('input'));
      let saveButton = element(by.cssContainingText('button', 'Back'));

      heroNameInput.sendKeys('test');
      saveButton.click();

      expect(browser.getCurrentUrl()).toContain('/dashboard');
      expect(firstHeroOnDashboard.getText()).not.toContain('test');
    });
  });
});
