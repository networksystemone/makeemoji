require("babel-polyfill");
const { prepareTest, cleanupTest } = require('./utils');
const spinGifDatauri = require('./spin-gif-datauri');

describe("MakeEmoji", () => {
  test("app loads correctly", async () => {
    const { server, browser, page } = await prepareTest({ port: "4444" });

    await page.waitForSelector(`[data-test="h1"]`)
    const h1Text = await page.$eval(`[data-test="h1"]`, el => el.innerHTML);
    expect(h1Text).toBe(`MakeEmoji`);

    await cleanupTest({ browser, server });
  }, 30000);

  test("can generate GIFs", async () => {
    const { server, browser, page } = await prepareTest({ port: "4445" });

    await page.waitFor(30000);
    await page.$eval(`#test-1`, el => el.click());
    await page.waitForFunction(() => document.querySelector(`[data-emoji="spin"]`).src === spinGifDatauri);
    
    await cleanupTest({ browser, server });
  }, 30000);
});