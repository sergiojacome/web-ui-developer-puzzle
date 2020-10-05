import { $, $$, browser, ExpectedConditions, protractor } from 'protractor';
const until = protractor.ExpectedConditions;

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('then should be able to undo add to reading list from snackbar', async () => {
    const addToListBtn = await $('[data-testing="book-item"] button:not([DISABLED])');
    addToListBtn.click();

    browser.wait(until.presenceOf($('tmo-total-count [ng-reflect-content]')), 5000);
    const badgeSelector = $('tmo-total-count [ng-reflect-content]');
    const totalItems = badgeSelector.getAttribute('ng-reflect-content');

    browser.wait(until.presenceOf($('.mat-simple-snackbar-action button')), 5000);
    $('.mat-simple-snackbar-action button').click();
    
    let totalItemsUndo: any = 0;
    if (badgeSelector.length) {
      totalItemsUndo = badgeSelector.getAttribute('ng-reflect-content');
    }
    expect(totalItemsUndo).not.toBe(totalItems);
  });

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('typescript');

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });
});
