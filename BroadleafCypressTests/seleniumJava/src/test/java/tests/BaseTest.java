package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTest {

protected WebDriver driver;
protected WebDriverWait wait;
protected final String BASE_URL = "https://demo.broadleafcommerce.org";

@BeforeMethod
public void setUp() {
WebDriverManager.chromedriver().setup();

ChromeOptions options = new ChromeOptions();
options.addArguments("--remote-allow-origins=*");
options.addArguments("--disable-notifications");
options.addArguments("--disable-infobars");
options.addArguments("--disable-extensions");

driver = new ChromeDriver(options);
wait = new WebDriverWait(driver, Duration.ofSeconds(15));

driver.manage().window().maximize();
driver.get(BASE_URL);
}

@AfterMethod(alwaysRun = true)
public void tearDown() {
if (driver != null) {
driver.quit();
}
}
}