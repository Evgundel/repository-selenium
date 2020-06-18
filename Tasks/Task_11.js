var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');
    email = 'mail'+ Date.now() + "@test.com";

  test.describe('Регистрация и авторизация пользователя', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Регистрация пользователя', function() {
    //console.log(email);
    driver.get("http://localhost/litecart/en/create_account");
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);

    driver.findElement(By.xpath("//input[@name='firstname']")).sendKeys("TestName");
    driver.findElement(By.xpath("//input[@name='lastname']")).sendKeys("TestLastName");
    driver.findElement(By.xpath("//input[@name='address1']")).sendKeys("TestAdress");
    driver.findElement(By.xpath("//input[@name='postcode']")).sendKeys("12345");
    driver.findElement(By.xpath("//input[@name='city']")).sendKeys("Perm");
    driver.findElement(By.xpath("//span[@class='select2-selection__rendered']")).click();
    driver.findElement(By.xpath("//input[@type='search']")).sendKeys("united states", Key.ENTER);
    driver.findElement(By.xpath("//select[@name='zone_code']")).click();
    driver.findElement(By.xpath("//input[@name='email']")).sendKeys(email);
    driver.findElement(By.xpath("//input[@name='phone']")).sendKeys("+1234567890");
    driver.findElement(By.xpath("//input[@name='password']")).sendKeys("Qwerty123456");
    driver.findElement(By.xpath("//input[@name='confirmed_password']")).sendKeys("Qwerty123456");
    driver.findElement(By.xpath("//button[@name='create_account']")).click();
    driver.findElement(By.xpath("//select[@name='zone_code']")).sendKeys("hawaii", Key.ENTER);
    driver.findElement(By.xpath("//input[@name='password']")).sendKeys("Qwerty123456");
    driver.findElement(By.xpath("//input[@name='confirmed_password']")).sendKeys("Qwerty123456");
    driver.findElement(By.xpath("//button[@name='create_account']")).click();
    driver.findElement(By.css('.notice.success')).getAttribute('textContent').then((confirmation) => {
      assert(confirmation == ' Your customer account has been created.');
      driver.wait(until.elementLocated(By.xpath('//a[contains(text(),\'Logout\')]')), 3000).then(() => {
        driver.findElement(By.xpath('//a[contains(text(),\'Logout\')]')).click();
      });
    });
  });

  test.it('Авторизация пользователя', function() {
    driver.get("http://localhost/litecart/en/");
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(3000);
    driver.findElement(By.xpath("//input[@name='email']")).sendKeys(email);
    driver.findElement(By.xpath("//input[@name='password']")).sendKeys("Qwerty123456");
    driver.findElement(By.xpath("//button[@name='login']")).click();
    driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();
  });

test.after(function() {
    driver.quit();
  });
});
