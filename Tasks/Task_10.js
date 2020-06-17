var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing'),
    mainRegularPriceSelector = '//div[@id=\'box-campaigns\']//s[@class=\'regular-price\']',
    goodsRegularPriceSelector = '//s[@class=\'regular-price\']',
    mainCampaignPriceSelector = '//div[@id=\'box-campaigns\']//strong[@class=\'campaign-price\']',
    goodsCampaignPriceSelector = '//strong[@class=\'campaign-price\']';

  test.describe('Проверка страницы с товарами', function() {
  var driver;

  function compareItems(selector1, selector2) {
    driver.findElement(By.xpath(selector1)).getAttribute('textContent').then((mainPageItem) => {
      //console.log(mainPageItem);
      driver.findElement(By.xpath("//div[@id=\'box-campaigns\']//li")).click().then(() => {
        driver.findElement(By.xpath(selector2)).getAttribute('textContent').then((goodsPageItem) => {
          //console.log(goodsPageItem);
          return assert(mainPageItem == goodsPageItem);
        });
      });
    });
  }

  function isCrossed(selector) {
    driver.findElement(By.xpath(selector)).getCssValue('text-decoration').then((decoration) => {
        //console.log('Формат обычной цены: ' + decoration);
        return assert(decoration.substring(0, 12) == 'line-through');
    });
  }

  function isGrey(selector) {
    driver.findElement(By.xpath(selector)).getCssValue('color').then((color) => {
      let rgb = color.replace("rgba(", "").split(", ");
      //console.log(rgb);
      return assert(rgb[0] == rgb[1] && rgb[1] == rgb[2]);
    });
  }

  function isBold(selector) {
    driver.findElement(By.xpath(selector)).getCssValue('font-weight').then((font) => {
        //console.log('Формат акционной цены: ' + font);
        return assert(font == 'bold' || font >= 600);
    });
  }

  function isRed(selector) {
    driver.findElement(By.xpath(selector)).getCssValue('color').then((color) => {
      let rgb = color.replace("rgba(", "").split(", ");
      //console.log(rgb);
      return assert(rgb[0] !== "0" && rgb[1] == "0" && rgb[2] == "0");
    });
  }

  function comparePrice(selector1, selector2) {
    driver.findElement(By.xpath(selector1)).getCssValue('font-size').then((regularFontSize) => {
      driver.findElement(By.xpath(selector2)).getCssValue('font-size').then((campaignFontSize) => {
        //console.log('Шрифт обычной цены ' + regularFontSize + ' и шрифт акционной цены ' + campaignFontSize);
        return assert(regularFontSize.replace("px", "") < campaignFontSize.replace("px", ""));
      });
    });
  }

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Совпадают наименования товаров на главной странице и странице товара', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    compareItems('//div[@id=\'box-campaigns\']//div[@class=\'name\']', '//h1');
  });

  test.it('Совпадают цены товаров на главной странице и странице товара', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    //Сравнение обычных цен
    compareItems(mainRegularPriceSelector, goodsRegularPriceSelector);
    driver.navigate().back();
    //Сравнение акционных цен
    compareItems(mainCampaignPriceSelector, goodsCampaignPriceSelector);
  });

  test.it('Проверка свойств обычной цены: серая и перечеркнутая', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    isCrossed(mainRegularPriceSelector);
    isGrey(mainRegularPriceSelector);
    driver.findElement(By.xpath("//div[@id=\'box-campaigns\']//li")).click().then(() => {
      isCrossed(goodsRegularPriceSelector);
      isGrey(goodsRegularPriceSelector);
    });
  });

  test.it('Проверка свойств акционной цены: красная и жирным шрифтом', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    isBold(mainCampaignPriceSelector);
    isRed(mainCampaignPriceSelector);
    driver.findElement(By.xpath("//div[@id=\'box-campaigns\']//li")).click().then(() => {
      isBold(goodsCampaignPriceSelector);
      isRed(goodsCampaignPriceSelector);
    });
  });

  test.it('Проверка шрифта цен: акционная больше обычной', function() {
    driver.get('http://localhost/litecart/en/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    comparePrice(mainRegularPriceSelector, mainCampaignPriceSelector);
    driver.findElement(By.xpath("//div[@id=\'box-campaigns\']//li")).click().then(() => {
      comparePrice(goodsRegularPriceSelector, goodsCampaignPriceSelector);
    });
  });

test.after(function() {
    driver.quit();
  });
});
