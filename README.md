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

All manual testing was completed on https://demo.nopcommerce.com and includes:

-Strategy and Test Plan
-Test Cases
-Manual Test Summary
-Jira Progress Screenshots
-Jira Bug Report which includes a mock bug created as no real UI bugs were identified.
-Jira Excel Export

These files are included in the repository:
-StrategyAndTestPlan.pages
-nopCommerceManualTestCases.xlsx
-ManualTestSummaryNopCommerce.pages
-jiraProgressScreenshots
-JiraExcelExport.xlsx



**Pivot to Broadleaf Commerce for Cypress Automation**

When beginning automation, I discovered that nopCommerce uses reCAPTCHA on critical flows. Cypress cannot bypass reCAPTCHA, so automated e2e and performance testing is not doable on that application.
To complete the automation portion of the capstone, I selected the Broadleaf Commerce Demo site https://demo.broadleafcommerce.org.

This application allowed me to automate:
-E2E checkout flow
-Add items to Cart
-Remove items from Cart
-Guest Checkout
-Filling the shipping, billing, address and email forms
-The payment step
-Confirmation page assertion
-Performance test with navigation Timing API
-Accessibility test using a11y plugin
-API tests using Cypress request

All Cypress tests are located in the /cypress/e2e/ file located inside of the broadleafCypressTests folder.

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

Uses cy.request() for backend verification.
Files for e2e testing using Broadleaf demo site via Cypress:

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




Notes & Challenges
-nopCommerce manual tests completed successfully
-Pivot made due to reCAPTCHA blocking automation
-Broadleaf Commerce allowed full automation
-Checkout automation required handling:
-Delayed DOM rendering
-Hidden billing/shipping containers
-Multiple stages controlled by CSS visibility
-Custom selectors and timeouts
-Stripe test credit card fields (demo mode)




Conclusion

This capstone demonstrates a complete QA workflow across two applications which include nopCommerce for manual testing and Jira bug reporting and handling, and the Broadleaf Commerce demo site for automated Cypress testing including e2e, performance, and accessibility checks

Amber Burlet QA
