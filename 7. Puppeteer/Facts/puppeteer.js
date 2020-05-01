let puppeteer = require("puppeteer");
(async function () {
    // browser open => visible
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--incognito", "--start-maximized"]
    });

    let pages = await browser.pages()
    let page = pages[0]
    await page.goto("https://www.facebook.com")
})();

let data = await fs.promises.readFile(cFile);
let {url,pwd, user}= JSON.parse(data);
// Login Page => NOrmal websites 
// spa => Socket maintain -> networkidle2
await page.goto(url,{waitUntil:"networkidle0"});
// Let unInputWillBeFoundPromise=page.$("#input-1");
// Let psInputWillBeFoundPromise=page.$("#input-2");
// Let unNpsEL = await Promise.all([unInputWillBeFoundPromise, psInputWillBeFoundPromise])
await page.type("#input-1", user);
await page.type("#input-type", pwd);
await page.click("button[data-analytics-LoginPassword]");

// ***### Dashboard ###***
await page.waitforNavigation({waitUntil:"networkidle0"});
await page.waitforSelector("a[]")