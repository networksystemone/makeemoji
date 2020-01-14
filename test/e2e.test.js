require("babel-polyfill");
const puppeteer = require("puppeteer");
const forever = require("forever-monitor");

describe("MakeEmoji", () => {
  test("h1 loads correctly", async () => {
    const { server, browser, page } = await prepareTest({ port: "4440" });

    await page.waitForSelector(`[data-test="h1"]`);

    const h1 = await page.$eval(`[data-test="h1"]`, e => e.innerHTML);
    expect(h1).toBe(`MakeEmoji`);

    await browser.close();
    server.stop();
  }, 30000);
});

async function prepareTest({ port = "3000" }) {
  const server = forever.start(["http-server", "./dist", `-p ${port}`], {
    max: 1,
    silent: true
  });
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 500,
      height: 2400
    },
    userAgent: ""
  });
  page.goto(`http://localhost:${port}/`);
  return { server, browser, page };
}
