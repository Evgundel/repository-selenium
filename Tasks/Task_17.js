var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing'),
    url = 'http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1';

test.describe('Логи браузера', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Логи браузера', function() {
    driver.get(url);
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(3000);
    driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    driver.findElement(By.css('button')).click();
    driver.findElements(By.xpath("//tr[.//input[contains(@name, 'products')]]/td[3]/a")).then((products) => {
      let productsCount = products.length;
      //console.log(productsCount);
      for (let i = 1; i <= productsCount; i++) {
        driver.findElement(By.xpath("//tr[.//input[contains(@name, 'products')]][" + i + "]/td[3]/a")).click().then(() => {
          driver.manage().logs().get("browser").then((logsEntries) => {
              logsEntries.forEach(function(l) {
              assert.equal(l, null);
          });
        });
          driver.get(url);
        });
      }
    });
  });

test.after(function() {
    driver.quit();
  });
});
