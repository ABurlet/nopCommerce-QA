package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class RegistrationMultiStepTest extends BaseTest {

@Test
public void userCanRegisterWithValidData() {

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

//Go to the home page
driver.get(BASE_URL + "/");

//Click on login
WebElement loginLink = wait.until(
ExpectedConditions.elementToBeClickable(
By.xpath("//a[contains(., 'Login')]")
)
);
loginLink.click();

//Wait for "Register" header to be visible
wait.until(
ExpectedConditions.visibilityOfElementLocated(
By.xpath("//div[@id='register']//h3[contains(@class,'card-title') and normalize-space()='Register']")
)
);

//Find the header for registration form
WebElement registerForm = driver.findElement(By.id("registrationForm"));

//Generate a unique email
String email = "amber_qt_" + System.currentTimeMillis() + "@test.com";

//Fill out the registration form using ids found in the DOM
registerForm.findElement(By.id("customer.emailAddress")).sendKeys(email);
registerForm.findElement(By.id("customer.firstName")).sendKeys("Amber");
registerForm.findElement(By.id("customer.lastName")).sendKeys("Burlet");
registerForm.findElement(By.id("password")).sendKeys("Password123!");
registerForm.findElement(By.id("passwordConfirm")).sendKeys("Password123!");

//Click the register button
registerForm.findElement(
By.cssSelector("button.btn.btn-primary.pull-right[type='submit']")
).click();

//Assert name is visible on dropdown menue after registration
WebElement accountDropdown = wait.until(
ExpectedConditions.visibilityOfElementLocated(
By.xpath("//a[contains(@class,'dropdown-toggle') and contains(., 'Amber')]")
)
);

Assert.assertTrue(accountDropdown.isDisplayed(),
"User name should be visible in the header after registration");

System.out.println("Registered test email: " + email);
}
}