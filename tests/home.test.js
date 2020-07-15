const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
let browser, page;

describe('Home page testing', () => {

  beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });
    // Launched the second tab
    page = await browser.newPage();
    await page.goto('localhost:4200');

  }, 10000);

  afterEach(async () => {
      await browser.close();
  });

  test('The heading has the correct text', async () => {

      const text = await page.$eval('h1.w3-animate-zoom', el => el.innerHTML);

      expect(text).toEqual('Do You Want To Be A Winner?');

  }, 30000);

  test('Clicking Yes!, opens signup page', async () => {
      await page.click('.btn-splash');

      const url = await page.url();

      expect(url).toMatch(/auth\/register/);
  });

  test('Clicking Login!, opens login page', async () => {
      await page.click('a.mat-button');

      const url = await page.url();

      expect(url).toMatch(/auth/);
  });

  test('When sign in, show user area', async () => {
    const id = 15;
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: id, exp: (Date.now() + process.env.JWT_EXPIRES_IN) / 1000 }, process.env.JWT_SECRET);

    await page.setCookie({name: 'jwt', value: token});
    await page.setExtraHTTPHeaders({'Authorization': `Bearer ${token}`});
    await page.goto('localhost:4200/me');

  });

});
