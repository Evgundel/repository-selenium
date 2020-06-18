var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing'),
    path = require('path');

  test.describe('Добавление нового товара', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Добавление нового товара', function() {
    driver.get('http://localhost/litecart/admin/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    driver.findElement(By.css('button')).click();
    driver.findElement(By.xpath("//span[text()='Catalog']")).click();
    driver.findElements(By.xpath("//tr[@class='row']")).then((productsOld) => {
      let oldCount = productsOld.length;
      driver.findElement(By.xpath("//a[contains(text(),'Add New Product')]")).click();
      // Заполнение вкладки General
      driver.findElement(By.xpath("//input[@value='1'][@type='radio']")).click();
      driver.findElement(By.xpath("//input[@name='name[en]']")).sendKeys('Donald Duck');
      driver.findElement(By.xpath("//input[@name='code']")).sendKeys('1000');
      driver.findElement(By.xpath("//input[@name='categories[]'][@value='1']")).click();
      driver.findElement(By.xpath("//input[@name='categories[]'][@value='2']")).click();
      driver.findElement(By.xpath("//input[@value='1-1']")).click();
      driver.findElement(By.xpath("//input[@name='quantity']")).sendKeys('5');
      let imgPath = path.resolve('Images', 'Donald_Duck.png');
      driver.findElement(By.xpath("//input[@name='new_images[]']")).sendKeys(imgPath);
      driver.findElement(By.xpath("//input[@name='date_valid_from']")).sendKeys('01062020');
      driver.findElement(By.xpath("//input[@name='date_valid_to']")).sendKeys('31052021');
      //Заполнение вкладки Information
      driver.findElement(By.xpath("//a[@href='#tab-information']")).click();
      driver.findElement(By.xpath("//select[@name='manufacturer_id']")).click();
      driver.findElement(By.xpath("//select[@name='manufacturer_id']")).sendKeys('a');
      driver.findElement(By.xpath("//input[@name='keywords']")).sendKeys('donald duck cartoon');
      driver.findElement(By.xpath("//input[@name='short_description[en]']")).sendKeys('Short description');
      driver.findElement(By.xpath("//div[@class='trumbowyg-editor']")).sendKeys('Description');
      driver.findElement(By.xpath("//input[@name='head_title[en]']")).sendKeys('Donald Duck');
      //Заполнение вкладки Prices
      driver.findElement(By.xpath("//a[@href='#tab-prices']")).click();
      driver.findElement(By.xpath("//input[@name='purchase_price']")).sendKeys('25');
      driver.findElement(By.xpath("//select[@name='purchase_price_currency_code']")).click();
      driver.findElement(By.xpath("//select[@name='purchase_price_currency_code']")).sendKeys('eur');
      driver.findElement(By.xpath("//input[@name='prices[USD]']")).sendKeys('28');
      driver.findElement(By.xpath("//input[@name='prices[EUR]']")).sendKeys('25');
      driver.findElement(By.xpath("//button[@name='save']")).click();
      //Проверка наличия нового продукта в списке
      driver.findElements(By.xpath("//tr[@class='row']")).then((productsNew) => {
        let newCount = productsNew.length;
        assert(oldCount + 1 == newCount);
      });
    });
  });

test.after(function() {
    driver.quit();
  });
});
