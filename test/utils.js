const puppeteer = require("puppeteer");
const forever = require("forever-monitor");

async function prepareTest({ port = "3000" }) {
  const server = forever.start(
    ["./node_modules/.bin/http-server", "./dist", `-p ${port}`],
    { max: 1, silent: true }
  );
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.emulate({ viewport: { width: 500, height: 2400 }, userAgent: "" });
  page.goto(`http://localhost:${port}/`);
  return { server, browser, page };
}

async function cleanupTest({ browser, server }) {
  await browser.close();
  server.stop();
}

module.exports = { prepareTest, cleanupTest };
