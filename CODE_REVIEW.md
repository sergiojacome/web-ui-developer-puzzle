# Task 1: Code fixes and review

#### 1.1 Code smells & improvements
- I did a quick review on the code, couldn't find any of the typical code smells, like unused imported libraries, redundant code nor too many nested functions.
- I ran a sonarqube scan to double check for code smells, and the scan didn't find anything for the libs/books folder, so I decided to move on.
- One thing that I think could be helpful, and I would change, is comment the code a little bit, just to provide hints to new developers coming to work on the code.
- The project seems to be using angular best practices, which is great, to minimize the impact on the point above.
- nrwl/nest, nrwl/node & nrwl/workspace need to be updated to fix high security issues
- Added a loading spinner while the API responds for better UX
- On book-search.component.ts I changed the code to consume the books$ observable directly, instead of reassigning values on ngOnInit(), the store values should not be mutated like that.

#### 1.2 Accessibility issues
- The issues found by lighthouse are the following:
--Buttons do not have an accessible name
--Background and foreground colors do not have a sufficient contrast ratio.
- Some of the issues not listed by lighthouse are:
--Images with no alt attribute
--Missing aria-label for some buttons once there are search results available
--Use of <b> instead of <strong> NOTE: this is coming from the API response
--Adding outline for all :focus elements

#### 1.3 Fixing failed tests
- 2 failing tests on the reading-list.reducer.spec.ts, failedAddToReadingList and failedRemoveFromReadingList, adding code to add/remove items from store.
- Enabled the search results while typing to pass the pending E2E test