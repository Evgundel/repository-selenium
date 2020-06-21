var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing'),
    goodsCount = 3;

  test.describe('Добавление товаров в корзину', function() {
  var driver;

  function addToCart(count) {
    driver.findElement(By.name('add_cart_product')).click();
    driver.findElement(By.css('#cart span.quantity')).then((cartCount) => {
    driver.wait(until.elementTextContains(cartCount, count + 1));
    });
  }

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Добавление товаров в корзину', function() {
    driver.get('https://litecart.stqa.ru/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    //Добавление товаров в корзину
    for (let i = 0; i < goodsCount; i++) {
      driver.findElements(By.css('.product.column')).then((goods) => {
        goods[i].click();
        driver.findElement(By.css('h1')).getAttribute('textContent').then((goodName) => {
          if (goodName == 'Yellow Duck') {
            driver.findElement(By.css('select')).sendKeys('Small');
            addToCart(i);
          } else {
            addToCart(i);
          }
        });
        driver.navigate().back();
      });
    }
    //Удаление товаров из корзины
    driver.findElement(By.css('#cart .link')).click();
    driver.findElements(By.css('li.shortcut a')).then((goodsInCart) => {
      let goodsInCartCount = goodsInCart.length
      for (let j = 0; j < goodsInCartCount; j++) {
          driver.findElements(By.xpath("//td[2][@class='item']")).then((tableRecords) => {
          driver.findElement(By.name('remove_cart_item')).click();
          if (j !== goodsInCartCount - 1) {
            driver.wait(until.stalenessOf(tableRecords[j]));
          } else {
            driver.findElement(By.css('.content #checkout-cart-wrapper')).then((message) => {
            driver.wait(until.elementTextContains(message, 'There are no items in your cart.'));
            });
          }
        });
      }
    });
  });

test.after(function() {
    driver.quit();
  });
});
