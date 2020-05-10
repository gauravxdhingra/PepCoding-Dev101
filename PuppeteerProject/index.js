let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");

(async function () {
    // browser open => visible
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [ "--start-maximized"]
        // "--incognito",
    });

    let pages = await browser.pages()
    let page = pages[0]
    await page.goto("https://accounts.google.com/ServiceLogin/signinchooser?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
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