package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.JavascriptExecutor;
import java.time.Duration;

public class CheckoutMultiStepTest extends BaseTest {

//performs the full guest checkout flow
     
private void performCheckout() {

WebDriverWait localWait = new WebDriverWait(driver, Duration.ofSeconds(15));
    

//Navigate to the home page
driver.get(BASE_URL + "/");

//Click the "Green Ghost" sauce
WebElement greenGhostLink = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("a[href='/hot-sauces/green_ghost']"))
);
greenGhostLink.click();

//Click "Add to Cart" from the product page
WebElement addToCartButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("button.btn.btn-primary.js-addToCart"))
);
addToCartButton.click();

//click the cart icon
WebElement cartIconLink = localWait.until(
ExpectedConditions.elementToBeClickable(
By.xpath("//i[contains(@class,'material-icons') and normalize-space()='shopping_cart']/ancestor::a[1]"))
);
cartIconLink.click();

//Click "View Cart" from the cart icon dropdown
WebElement gotoFullCart = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("a.btn.btn-primary.goto-full-cart"))
);
gotoFullCart.click();

// Make sure you are on the cart page
localWait.until(ExpectedConditions.urlContains("/cart"));

//Click the checkout button from the cart page
WebElement checkoutButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.xpath("//span[normalize-space()='Checkout']/ancestor::a[1]"))
);
checkoutButton.click();

//Click on "Checkout as Guest"
WebElement guestCheckoutButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.xpath("//button[@type='submit' and contains(., 'Checkout as Guest')]"))
);
guestCheckoutButton.click();

//Fill out the Shipping form
localWait.until(ExpectedConditions.urlContains("/checkout"));

WebElement fullNameField = localWait.until(
ExpectedConditions.visibilityOfElementLocated(By.id("fullName")));
fullNameField.clear();
fullNameField.sendKeys("Test User");

WebElement addressField = driver.findElement(By.id("addressLine1"));
addressField.clear();
addressField.sendKeys("123 Cypress Lane");

WebElement cityField = driver.findElement(By.id("city"));
cityField.clear();
cityField.sendKeys("Austin");

//Select Texas from the state dropdown menu
Select stateSelect = new Select(driver.findElement(By.id("stateProvinceRegion")));
stateSelect.selectByVisibleText("TX");  

WebElement postalCodeField = driver.findElement(By.id("postalCode"));
postalCodeField.clear();
postalCodeField.sendKeys("73301");

WebElement phoneField = driver.findElement(By.id("phonePrimary"));
phoneField.clear();
phoneField.sendKeys("5551234567");

// Click the first shipping method
WebElement shippingRadio = localWait.until(
ExpectedConditions.presenceOfElementLocated(By.id("fulfillmentOptionId1"))
);

if (!shippingRadio.isSelected()) {
((JavascriptExecutor) driver).executeScript("arguments[0].click();", shippingRadio);
}

//Click on continue to move to the payment portion
WebElement shippingContinueButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("a.btn.btn-primary.pull-right.js-submitCheckoutStage"))
);
shippingContinueButton.click();

//Waits for the payment section to appear
localWait.until(
ExpectedConditions.visibilityOfElementLocated(
By.cssSelector(".js-paymentStageContent"))
);

//Check the 'same as my shipping address' checkbox
WebElement sameAsShippingCheckbox = localWait.until(
ExpectedConditions.presenceOfElementLocated(
By.cssSelector("input.js-shouldUseShippingAddress")
)
);

//Made clickable with JavaScript because it isn't for selenium
if (!sameAsShippingCheckbox.isSelected()) {
((JavascriptExecutor) driver).executeScript("arguments[0].click();", sameAsShippingCheckbox);
}

//Fill Email address field and continue to review page
WebElement emailField = driver.findElement(By.id("emailAddress"));
emailField.clear();
emailField.sendKeys("testuser@example.com");

WebElement paymentContinueButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("a.btn.btn-primary.pull-right.js-submitPaymentCheckoutStage"))
);
paymentContinueButton.click();

//Makes sure 'review' is visible before placing order
WebElement reviewHeading = localWait.until(
ExpectedConditions.visibilityOfElementLocated(
By.xpath("//*[contains(., 'Review')]"))
);
Assert.assertTrue(reviewHeading.isDisplayed(), "Review section should be visible");

//click on 'place Order'
WebElement placeOrderButton = localWait.until(
ExpectedConditions.elementToBeClickable(
By.cssSelector("a.btn.btn-primary.pull-right.js-performCheckout")
)
);
placeOrderButton.click();

//wait for "Thank You!" message to appear
WebDriverWait finalWait = new WebDriverWait(driver, Duration.ofSeconds(25));

WebElement thankYouText = finalWait.until(
ExpectedConditions.visibilityOfElementLocated(
By.xpath("//h2[contains(normalize-space(),'Thank You')]")
)
);

Assert.assertTrue(thankYouText.isDisplayed(), "'Thank You' confirmation should be visible");
}

// guest checkout with standard shipping 
@Test
public void guestCheckoutStandardShipping() {
performCheckout();
}

//guest checkout with priority shipping  
@Test
public void guestCheckoutPriorityShipping() {
performCheckout();
}}