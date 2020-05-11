let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
let course = process.argv[3];
// var pdf = require('html-pdf');

(async function () {
    // browser create => icognito mode,fullscreen
    try {
        let data = await fs.promises.readFile(cFile);
     
        let { url, user, pwd } = JSON.parse(data);
      
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--disable-notifications"]
        });
        // tab
        let tabs = await browser.pages();
        let tab = tabs[0];

        // ***********************Login*************************
        await tab.goto(url, { waitUntil: "networkidle2" });

        // let bodyHTML = await tab.evaluate(() => document.);
        // let bodyHTML = await tab.content();
        // console.log(bodyHTML)


        await tab.waitForSelector("input[type=email]");
        await tab.type("input[type=email]", user, { delay: 120 });

        await tab.type("input[type=password]", pwd, { delay: 120 });

        await tab.click("input[data-purpose=do-login]")

        // ***********************Search Courses*************************

        await tab.waitForSelector("input[data-purpose=search-input]");
        await tab.type("input[data-purpose=search-input]", course, { delay: 120 });

        await tab.click("button[type=submit]")
        await handleSinglePage(tab, browser);

    } catch (err) {
        console.log(err)
    }
})();

async function handleSinglePage(tab, browser) {
    // await tab.waitForSelector(".udlite-custom-focus-visible.course-card--container--3w8Zm.course-card--large--1BVxY");
    // let qoncPage = await tab.$$(".udlite-custom-focus-visible.course-card--container--3w8Zm.course-card--large--1BVxY");
   
    await tab.waitForSelector("a[data-purpose=container]");
    let qoncPage = await tab.$$("a[data-purpose=container]");

    let pArr = [];
    //  all question of that page
    for (let i = 0; i < 10; i++) {
        let href = await tab.evaluate(function (elem) {
            return elem.getAttribute("href");
        }, qoncPage[i]);

        let newTab = await browser.newPage();
        // developer tools=> elem.getAttribute
        let mWillAddedPromisetocQ = handleSingle(newTab, "https://www.udemy.com" + href, i);
        pArr.push(mWillAddedPromisetocQ);
    }
    await Promise.all(pArr);

}

async function handleSingle(newTab, link, i) {
    let x = i + 1;
    await newTab.goto(link);

    // await newTab.waitForSelector("button[data-purpose=toggle-wishlist]");
    // await newTab.click("button[data-purpose=toggle-wishlist]");

    await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
    await newTab.click(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
    await newTab.waitFor(2000);

    const titl = await newTab.evaluate(() => document.querySelector(".clp-lead__title").textContent);
    const title = titl.substring(1, titl.length - 1).replace(':', '');
    console.log(title);


    const pric = await newTab.evaluate(() => document.querySelector("div[data-purpose=course-price-text]").textContent);
    console.log(pric);

    const desc = await newTab.evaluate(() => document.querySelector("div[data-purpose=collapse-description-text]").innerText);

    const output = titl + pric + '\nDescription' + desc;

    fs.writeFileSync('./Output/' + x + '. ' + title + '.txt', output);

    // await newTab.pdf({ path: './PDFOutput/' + x +'. '+ title+'.pdf' , format: 'A4' });

    await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.wishlist-button--active--2i1GY.btn.btn-link");
    await newTab.screenshot({ path: './Output/' + x + ' ' + title + '.png', fullPage: true });

    // let bodyHTML = await newTab.evaluate(() => document.body.innerHTML);
    // let bodyHTML = await newTab.content();
    // console.log(bodyHTML);

    // var options = { format: 'Letter' };
    // pdf.create(bodyHTML, options).toFile('./PDFOutput/' + x + '. ' + title + '.pdf', function (err, res) {
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    // });
    // await fs.writeFileSync('./PDFOutput/' + x + '. ' + title + '.html', bodyHTML);

    await newTab.close();
}