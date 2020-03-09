require("babel-polyfill");
const { prepareTest, cleanupTest } = require("./utils");
const spinGifDatauri = require("./spin-gif-datauri");

describe("MakeEmoji", () => {
  test("can generate GIFs", async () => {
    const { server, browser, page } = await prepareTest({ port: "4445" });

    await page.waitFor(25000);
    await page.waitForFunction(
      spinGifDatauri =>
        document.querySelector(`.emoji-area > button > img`).src ===
        spinGifDatauri,
      {},
      spinGifDatauri
    );

    await cleanupTest({ browser, server });
  }, 60000);
});
