var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');

  test.describe('Проверка ссылок в редакторе страны', function() {
  var driver;

  async function thereIsWindowOtherThan(windowsBefore) {
    let windowsAfter = await driver.getAllWindowHandles();
    let newWindow = windowsAfter.filter(n => !windowsBefore.includes(n));
    return newWindow.length > 0 ? String(newWindow) : null;
  }

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Проверка ссылок в редакторе страны', async function() {
    await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
    await driver.manage().window().maximize();
    await driver.manage().timeouts().implicitlyWait(3000);
    await driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    await driver.findElement(By.css('button')).click();
    await driver.findElement(By.xpath("//a[@class='button']")).click();
    let links = await driver.findElements(By.xpath("//i[@class='fa fa-external-link']"));
    let linksCount = links.length;
    for (let i = 0; i < linksCount; i++) {
      let originalWindow = await driver.getWindowHandle();
      links[i].click();
      let newWindow = await driver.wait(thereIsWindowOtherThan(originalWindow));
      await driver.switchTo().window(newWindow);
      await driver.close();
      await driver.switchTo().window(originalWindow);
    }
  });

test.after(function() {
    driver.quit();
  });
});
