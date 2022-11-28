const puppeteer = require('puppeteer');

const app = `http://localhost:7070/`;

describe('Odin\'s Eye', () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch({ headless: true });
      page = await browser.newPage();
      await page.goto(app)
    });

    afterAll(() => browser.close());
  
    it('header should be titled "Odin\'s Eye"', async () => {
        await page.waitForSelector('.header');
        const title = await page.$eval('.header', el => el.innerText);
        expect(title).toBe(`Odin's Eye`);
    }),

    it('expects the logo to be an image', async () => {
      await page.waitForSelector('#logo');
      const logo = await page.$eval('#logo', el => el.innerHTML);
      expect(logo).toBe(`<img src=\"http://localhost:7070/c5725aceae4c9e83888013d26e8c08fe.png\" alt=\"odin-eye-logo\">`);
    }),

    describe('Kubernetes page', () => {

      beforeAll(async () => {
        await page.click('#kubernetes');
      })

      it('expect onclick of kubernetes link on navbar to render the kubernetes dashboard', async () => {
        const kubernetesContainer = await page.$eval('#kube-list-data', el => el.childElementCount)
        expect(kubernetesContainer).toBe(3)
      }),
  
      it('expect the dropdown div to contain a dropdown button element', async () => {
        const dropdownDiv = await page.evaluate(() => {
          return (Array.from(document.querySelector('#dropdown').children).length)
        })
        expect(dropdownDiv).toBe(1);
      }),
  
      it('expects kubernetes page to contain pods name div', async () => {
        await page.waitForSelector('#pod-name-header');
        const podName = await page.$eval("#pod-name-header", el => el.innerText);
        expect(podName).toBe('Pod Names:')
      })
    })

  });