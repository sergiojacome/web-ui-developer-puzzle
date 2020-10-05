import { $, $$, browser, ExpectedConditions, protractor } from 'protractor';
const until = protractor.ExpectedConditions;
const badgeSelector = $('tmo-total-count [ng-reflect-content]');

describe('When: I use the reading list feature', () => {
  it('Then: I should add a book to my reading list', async () => { 
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    browser.wait(until.presenceOf($('[data-testing="book-item"]')), 5000);

    const addToListBtn = await $('[data-testing="book-item"] button:not([DISABLED])');
    addToListBtn.click();
  });
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('then should be able to remove and undo remove from reading list by clicking on snackbar', async () => {

    const totalItems = badgeSelector.getAttribute('ng-reflect-content');
    browser.wait(until.presenceOf($('tmo-reading-list')), 5000);
    $('tmo-reading-list button').click();

    browser.wait(until.presenceOf($('.mat-simple-snackbar-action button')), 5000);
    $('.mat-simple-snackbar-action button').click();
    
    let totalItemsUndo: any = 0;
    if (badgeSelector.length) {
      totalItemsUndo = badgeSelector.getAttribute('ng-reflect-content');
    }
    expect(totalItemsUndo).not.toBe(totalItems);
  });
});
