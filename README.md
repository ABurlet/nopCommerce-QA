# nopCommerce-QA

**Capstone QA Project Part 1:
Manual and Automated Testing**

**Overview**

This project demonstrates a full QA workflow including:
-Test planning
-Manual testing
-Bug reporting in Jira
-Automating end-to-end tests using Cypress
-Performance and accessibility testing

I initially selected nopCommerce for the project’s manual testing component. However, when I began the automatio phase with Cypress, the site included reCAPTCHA, which prevents Cypress from interacting with critical functionality, such as login and checkout. Because automated testing cannot bypass CAPTCHA, I pivoted to the Broadleaf Commerce Demo site for the Cypress e2e tests.
This README explains that separation clearly so that the project is easy to understand.


**Manual Testing on nopCommerce**

All manual testing was completed on https://demo.nopcommerce.com

Deliverables:
-Strategy and Test Plan
-Test Cases Spreadsheet
-Manual Test Summary
-Jira Progress Screenshots
-A mock bug report created with jira for demonstration as no real UI bugs were identified.
-Jira Excel Export

All are included in the repository:
-StrategyAndTestPlan.pages
-nopCommerceManualTestCases.xlsx
-ManualTestSummaryNopCommerce.pages
-jiraProgressScreenshots
-JiraExcelExport.xlsx



**Pivot to Broadleaf Commerce for Cypress Automation**

When beginning automation, I discovered that nopCommerce uses reCAPTCHA on critical flows. Cypress cannot bypass reCAPTCHA, so automated e2e and performance testing is not doable on that application.
To complete the automation portion of the capstone, I selected the Broadleaf Commerce Demo site https://demo.broadleafcommerce.org.

Broadleaf Commerce allowed full automation of:
-E2E checkout flow
-Add items to cart
-Remove items from cart
-Guest Checkout
-Filling shipping, billing, and email forms
-Payment navigation
-Confirmation page validation
-Performance test with Navigation Timing API
-Accessibility testing using cypress axe plugin
-API verification using cy.request()

All automated tests are located inside /cypress/e2e/broadleafCypressTests/ folder.

**Automated tests implemented with Broadleaf**

**Checkout Test**
-Navigates homepage
-Adds product to cart
-Removes product 
-Starts checkout
-Fills shipping information
-Selects shipping method
-Proceeds to payment
-Uses “Same as my shipping address” checkbox
-Enters email
-Continues to review
-Clicks Place Your Order
-Asserts the confirmation URL and “Thank You” message

**User Registration Test**
-Navigates to the login/register page
-Fills all required fields inside of the form
-Dynamically creates a unique email
-Submits the form and verifies successful registration

**Login Test**
-Uses valid credentials to place inside input fields
-Submits the login form
-Verifies login success by checking the url and account dropdown is visible

**Product Search Test**
-Searches for a key word
-Verifies the page containing search results loads
-Ensures all returned results contain the search term

**Add to Cart Test**
-Adds a product to cart
-Verifies that the item is inside of the cart
-Removes the item from the cart
-Confirms that the empty cart message appears

**Performance testing**

Uses the browser’s navigation timing API
-Captures loadEventEnd startTime
-Logs the load time
-Asserts it is under a defined threshold of 5000 ms

**Accessibility testing**

Included using Cypress accessibility plugin
-Scans homepage or checkout for violations
-Outputs results in console

**API testing**

-Uses cy.request() for backend responses.
-Confirms status codes, payload structure and business logic.



**Automated Test Files:**
cypress/
e2e/
-cart.cy.js
-checkout.cy.js
-performance.cy.js
-accessibility.cy.js
-api.cy.js
-login.cy.js
-productSearch.cy.js
-registration.cy.js
-accessibility.cy.js



**Steps to Reproduce** 

**Manual Testing for nopCommerce**
-Navigate to https://demo.nopcommerce.com.
-Review the Strategy and Test Plan.
-Execute each manual test case from the test cases spreadsheet.
-Document results in the manual test summary.
-Log defects in Jira. I included a mock defect.
-Export Jira progress and attach screenshots.


**Automated Testing for Broadleaf Commerce**
-Clone this repository.
-Open the project folder in VS Code.
-Install dependencies using npm install.
-Open the cypress test runner with npx cypress open.
-Select E2E Testing and choose a browser.
-Run any test from the /cypress/e2e/BroadleafCypressTests/ folder.





***Notes and Challenges***
-nopCommerce manual tests completed successfully
-CAPTCHA prevented cypress automation on nopCommerce
-Broadleaf Commerce fully supported automation
-Checkout required handling for hidden DOM elements
-Stripe card fields required special selectors
-Multiple stage checkout with CSS controlled visibility
-Required custom waits, .within() and timeout adjustments




**Conclusion**

This capstone demonstrates a complete QA workflow across two applications which include nopCommerce for manual testing and Jira bug reporting and tracking, and the Broadleaf Commerce demo site for automated Cypress tests, performance and accessibility checks and API validation.

Amber Burlet QA
