var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');

test.describe('Проверка наличия стикеров', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Проверка наличия стикеров у товаров на главной странице', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.findElements(By.css('.product.column')).then((goods) => {
        let q = goods.length;
        console.log('Количество товаров: ' + q);
        for (let i = 0; i < q; i++) {
          goods[i].findElements(By.css('div .sticker')).then((stikers) => {
            //console.log(stikers.length);
          assert.equal(stikers.length, 1);
          });
        }
      });
    });

test.after(function() {
    driver.quit();
  });
});
