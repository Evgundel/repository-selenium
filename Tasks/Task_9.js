var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    assert = require('assert'),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key,
    test = require('selenium-webdriver/testing');

test.describe('Проверка сортировки стран и зон', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Проверка сортировки стран', function() {
    driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
    driver.manage().window().maximize();
    driver.findElement(By.name('username')).sendKeys('admin' + Key.TAB + 'admin');
    driver.findElement(By.css('button')).click();
    driver.findElements(By.xpath('//td[5]//a')).then((countries) => {
      let count = countries.length;
      //console.log('Найдено стран: ' + count);
      for (let i = 0; i < count - 1; i++) {
        countries[i].getAttribute('textContent').then((name1) => {
          countries[i+1].getAttribute('textContent').then((name2) => {
            //console.log(name1 + ' ' + name2);
            assert(name1 < name2);
          });
        });
      }
    });
  });

  test.it('Проверка сортировки зон на странице со странами', function() {
    driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
    driver.findElements(By.xpath('//td[5]//a')).then((countries) => {
      //Определяем количество стран
      let countC = countries.length;
      //console.log('Найдено стран: ' + countC);
      for (let i = 0; i < countC - 1; i++) {
        driver.findElements(By.xpath('//td[6]')).then((zones) => {
          //Проверяем количество зон у страны
          zones[i].getAttribute('textContent').then((zonesNumber) => {
            if (zonesNumber > 0) {
              driver.findElements(By.xpath('//td[5]//a')).then((country) => {
                //Открываем страну с зонами
                country[i].click().then(() => {
                  driver.findElements(By.xpath('//td[3]/input[@type=\'hidden\']')).then((zonesExist) => {
                    //Проверяем порядок зон
                    let countZ = zonesExist.length;
                    for (let j = 0; j < countZ - 1; j++) {
                      zonesExist[j].getAttribute('value').then((name1) => {
                        zonesExist[j+1].getAttribute('value').then((name2) => {
                          //console.log(name1 + ' сравниваем с ' + name2);
                          assert(name1 < name2);
                        });
                      });
                    }
                  });
                });
                driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
              });
            }
          });
        });
      }
    });
  });


  test.it('Проверка сортировки зон', function() {
    driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
    driver.findElements(By.xpath('//td[3]/a')).then((countries) => {
      let countC = countries.length;
      //console.log('Найдено стран с зонами: ' + countC);
        for (let i = 1; i <= countC; i++) {
          driver.findElement(By.xpath('//tr[@class="row"]['+ i + ']/td[3]/a')).click();
          driver.findElements(By.xpath('//td[3]/select/option[@selected]')).then((zones) => {
            let countZ = zones.length;
            for (let j = 0; j < countZ - 1; j++) {
              zones[j].getAttribute('textContent').then((name1) => {
                zones[j+1].getAttribute('textContent').then((name2) => {
                  //console.log(name1 + ' ' + name2);
                  assert(name1 < name2);
                });
              });
            }
          });
          driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
        }
    });
  });

test.after(function() {
    driver.quit();
  });
});
