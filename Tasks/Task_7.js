var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');

  test.describe('Проверка главного меню', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие пунктов главного меню', function() {
    driver.get('http://localhost/litecart/admin/');
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(1000);
    driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    driver.findElement(By.css('button')).click();
    driver.findElements(By.css('li#app-')).then((divs) => {
      let countD = divs.length;
      //Разделы
      for (let i = 0; i < countD; i++) {
        driver.findElements(By.css('li#app-')).then((divs2) => {
          divs2[i].click().then(() => {
            driver.findElements(By.css('h1')).then((header) => {
              assert(header.length > 0);
            });
            driver.findElements(By.css('ul.docs > li')).then((subDivs) => {
                let countS = subDivs.length;
                //Подразделы
                for (let j = 0; j < countS; j++) {
                  driver.findElements(By.css('ul.docs > li')).then((subDivs2) => {
                    subDivs2[j].click().then(() => {
                      driver.findElements(By.css('h1')).then((header) => {
                        assert(header.length > 0);
                      });
                    });
                  });
                }
            });
          });
        });
      }
    });
  });

test.after(function() {
    driver.quit();
  });
});
