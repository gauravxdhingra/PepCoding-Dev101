var pdf = require('html-pdf');
let puppeteer = require("puppeteer");
let cFile = process.argv[2];
// console.log(cFile);
let fs = require("fs");
// console.log(require('./credentials.json'));
let course = process.argv[3];
// let nPost = process.argv[4];
(async function () {
    // browser create => icognito mode,fullscreen
    try {
        let data = await fs.promises.readFile(cFile);
        // console.log(data)
        let { url, user, pwd } = JSON.parse(data);
        // [1];
        // console.log(pwd)
        // launch browser
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--disable-notifications"]
        });
        // tab
        let tabs = await browser.pages();
        let tab = tabs[0];
        // dom => html 
        //  browser=> 500ms request 
        // hk login page
        // ***********************Login*************************
        await tab.goto(url, { waitUntil: "networkidle2" });
        // await tab.click("button[data-purpose=header-login]");

        // let bodyHTML = await tab.evaluate(() => document.);
        let bodyHTML = await tab.content();
        console.log(bodyHTML)


        await tab.waitForSelector("input[type=email]");
        await tab.type("input[type=email]", user, { delay: 120 });
        // const googleLoginButtonSelector = 'body > section > ... > div'
        // await tab.waitForSelector( googleLoginButtonSelector )
        // await page.click( googleLoginButtonSelector )

        await tab.type("input[type=password]", pwd, { delay: 120 });
        //  _1xnd => group of post 
        // _4-u2 _4-u8=> particular post
        //  inside ._1xnd
        // descendent => select 
        // 1xnd => last
        // await Promise.all([
        //     tab.click("input[data-purpose=do-login]"), tab.waitForNavigation({
        //         waitUntil: "networkidle2"
        //     })
        // ]);
        await tab.click("input[data-purpose=do-login]")

        // ***********************Search Courses*************************

        await tab.waitForSelector("input[data-purpose=search-input]");
        await tab.type("input[data-purpose=search-input]", course, { delay: 120 });

        // await Promise(
        //     tab.click("button[type=submit]"), tab.waitForNavigation({
        //         waitUntil: "networkidle2"
        //     })
        // );
        await tab.click("button[type=submit]")

        // await tab.goto(pUrl, { waitUntil: "networkidle2" });
        // await tab.waitForSelector("div[data-key=tab_posts]");
        // //  post => click => reroute=> 2 times=> 2 times (wait for navigation)
        // await Promise.all([
        //     tab.click("div[data-key=tab_posts]"),
        //     tab.waitForNavigation({ waitUntil: "networkidle2" })
        // ])
        // await tab.waitForNavigation({ waitUntil: "networkidle2" });
        await handleSinglePageQuestion(tab, browser);
        // let idx = 0;
        // do {
        //     //  post => 7 post => are loaded 
        //     await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        //     // children selector

        //     let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
        //     // saftey
        //     // console.log(elements.length);
        //     let post = elements[idx];
        //     // like -> selector
        //     await tab.waitForSelector("._666k ._8c74");
        //     let like = await post.$("._666k ._8c74");
        //     await like.click({ delay: 100 });
        //     idx++;
        //     await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
        //     //  wait for loader => visible => content load =>
        //     // hidden=> may post => wait for loader 
        //     //  loader  hide wait 
        //     // immediate child
        //     //  descendent 
        // } while (idx < nPost)
        // // await browser.close();
    } catch (err) {
        console.log(err)
    }
})();

async function handleSinglePageQuestion(tab, browser) {
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
        let mWillAddedPromisetocQ = handleSingleQuestion(newTab, "https://www.udemy.com" + href, i);
        pArr.push(mWillAddedPromisetocQ);
    }
    await Promise.all(pArr);
    // // go to next page 
    // await tab.waitForSelector(".pagination ul li");
    // let paginationBtn = await tab.$$(".pagination ul li");

    // let nxtBtn = paginationBtn[paginationBtn.length - 2];
    // let className = await tab.evaluate(function (nxtBtn) {
    //     return nxtBtn.getAttribute("class");
    // }, nxtBtn);
    // if (className === "disabled") {
    //     return;
    // } else {
    //     await Promise.all([nxtBtn.click(), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
    //     await handleSinglePageQuestion(tab, browser);
    // }
}

async function handleSingleQuestion(newTab, link, i) {
    let x = i + 1;
    await newTab.goto(link);
    // await newTab.goto(link, { waitUntil: "networkidle2" });
    //  popup => save changes may not have been saved 
    await newTab.waitForSelector("button[data-purpose=toggle-wishlist]");
    await newTab.click("button[data-purpose=toggle-wishlist]");
    // await Promise.all([
    //     newTab.click("li[data-tab=moderators]"),
    //     newTab.waitForNavigation({ waitUntil: "networkidle0" })
    // ])
    // await newTab.waitForSelector("input[id=moderator]", { visible: true });
    // await newTab.type("#moderator", "theamanthakur");
    // await newTab.keyboard.press("Enter")


    // await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
    // await newTab.click(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
    await newTab.waitFor(2000);

    const titl = await newTab.evaluate(() => document.querySelector(".clp-lead__title").textContent);
    const title = titl.substring(1, titl.length - 1);
    console.log(title);

    // await newTab.pdf({ path: './PDFOutput/' + x +'. '+ title+'.pdf' , format: 'A4' });
    await newTab.screenshot({ path: './PDFOutput/' + x + ' ' + title + '.png', fullPage: true });

    // let bodyHTML = await newTab.evaluate(() => document.body.innerHTML);
    let bodyHTML= await newTab.content();
    // console.log(bodyHTML);

    // var options = { format: 'Letter' };
    // pdf.create(bodyHTML, options).toFile('./PDFOutput/' + x + '. ' + title + '.pdf', function (err, res) {
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    // });
   await fs.writeFileSync('./PDFOutput/' + x + '. ' + title + '.html', bodyHTML);

    // await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.wishlist-button--active--2i1GY.btn.btn-link");

    await newTab.close();
}