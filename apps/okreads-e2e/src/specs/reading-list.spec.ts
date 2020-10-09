import { $, browser, ExpectedConditions, protractor } from 'protractor';
const until = protractor.ExpectedConditions;
const badgeSelector = $('tmo-total-count [ng-reflect-content]');

describe('When: I use the reading list feature', () => {
  it('should add a book to my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    browser.wait(until.presenceOf($('[data-testing="book-item"]')), 500);

    const addToListBtn = await $('[data-testing="book-item"] button:not([DISABLED])');
    addToListBtn.click();
  });
  it('Then: I should see my reading list', async () => {

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: should mark the book as read', async () => {
    const markAsRead = await $('[data-testing="reading-list-mark-as-read"]');
    await markAsRead.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-finished"]'),
        'Finished on'
      )
    );
  });
});
