var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Поиск Google', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Соответствие страницы', function() {
    driver.get('https://www.google.com');
    driver.manage().window().maximize();
    driver.findElement(By.css('.a4bIc input')).sendKeys('webdriver');
    driver.findElement(By.css('center .gNO89b')).click();
    driver.wait(until.titleIs('webdriver - Поиск в Google'), 1000);
  });

  test.after(function() {
    driver.quit();
  });
});
