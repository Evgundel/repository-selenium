var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');

test.describe('Авторизация в приложении litecart', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Авторизация под администратором', function() {
    driver.get('http://localhost/litecart/admin/');
    driver.manage().window().maximize();
    driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    driver.findElement(By.css('button')).click();
  });

  test.after(function() {
    driver.quit();
  });
});
