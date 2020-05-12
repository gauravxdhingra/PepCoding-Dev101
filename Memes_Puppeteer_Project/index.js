let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
let memesJson = process.argv[3];
// var https = require('https');
let request = require('request');

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

        let memeJsonData = await fs.promises.readFile(memesJson);
        let memesArray = JSON.parse(memeJsonData);
        // console.log(memesArray[0].text2)

        // ***********************Login*************************
        await tab.goto(url, { waitUntil: "networkidle2" });
        // await tab.goto(url);
        // let bodyHTML = await tab.evaluate(() => document.);
        // let bodyHTML = await tab.content();
        // console.log(bodyHTML)

        // await tab.waitForSelector("input[placeholder='Text #1']");

        for (let i = 0; i < memesArray.length; i++) {

            let text1 = memesArray[i].text1;
            let text2 = memesArray[i].text2;
            let text3 = memesArray[i].text3;
            let templete = memesArray[i].templete;

            // let templete = memesArray[4].templete;
            templete = "\"" + templete + "\""
            const tempclick = "[alt=" + templete + "]";
            await tab.click(tempclick)

            await tab.type('[placeholder="Text #1"]', text1);


            if (text2 != '') await tab.type('[placeholder="Text #2"]', text2);
            if (text3 != '') await tab.type('[placeholder="Text #3"]', text3);
            // { delay: 120 }

            await tab.click(".mm-generate.b.but")
            await tab.waitForSelector('input[class="img-code link"]');

            let memeUrl = await tab.$eval(
                'input[class="img-code link"]',

                function (elem) {
                    return elem.getAttribute("value");
                });

            let n = i + 1;

            memeUrl = memeUrl.substring(22);
            memeUrl = "https://i.imgflip.com/" + memeUrl + ".jpg";
            console.log(n + '. ' + memeUrl);
            // await tab.goto(memeUrl, { waitUntil: "networkidle2" });

            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    // console.log('content-type:', res.headers['content-type']);
                    // console.log('content-length:', res.headers['content-length']);
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };

            download(memeUrl, './memes/' + n + '.jpg', function () {
                // console.log('done');
            });

            const [div] = await tab.$x("//div[@id='done-btns']/div[contains(., 'Make another')]");

            if (div) {
                await div.click();
            }
        }


        await tab.goto("https://en-gb.facebook.com/login/", { waitUntil: "networkidle2" });

        await tab.waitForSelector("#email");

        await tab.type("#email", user, { delay: 120 });
        await tab.type("#pass", pwd, { delay: 120 });

        // await tab.click("#loginbutton");


        await Promise.all([
            tab.click("#loginbutton"), tab.waitForNavigation({
                waitUntil: "networkidle2"
            })
        ])

        await tab.click('span[class="_1vp5"]');

        for (let i = 0; i < memesArray.length; i++) {

            await tab.waitForSelector('a[data-tooltip-content="Photo/Video"]');
            // await tab.click("#u_0_1h");
            // const elementHandle = await tab.$("#u_0_1h");
            // await elementHandle.uploadFile('./memes/8.jpg');


            const [fileChoser] = await Promise.all([
                tab.waitForFileChooser(), await tab.click('a[data-tooltip-content="Photo/Video"]'),
                // tab.click("#u_0_1h")
            ]);
            let n = i + 1;
            let file = './memes/' + n + '.jpg';
            await fileChoser.accept([file]);

            await tab.waitFor(6000);
            await tab.waitForSelector('button[class="_1mf7 _4r1q _4jy0 _4jy3 _4jy1 _51sy selected _42ft"]');
            await tab.click('button[class="_1mf7 _4r1q _4jy0 _4jy3 _4jy1 _51sy selected _42ft"]');
            await tab.waitFor(4000);
        }
        await tab.close();

    } catch (err) {
        console.log(err)
    }
})();

// async function handleSinglePage(tab, browser) {
//     // await tab.waitForSelector(".udlite-custom-focus-visible.course-card--container--3w8Zm.course-card--large--1BVxY");
//     // let qoncPage = await tab.$$(".udlite-custom-focus-visible.course-card--container--3w8Zm.course-card--large--1BVxY");

//     await tab.waitForSelector("a[data-purpose=container]");
//     let qoncPage = await tab.$$("a[data-purpose=container]");

//     let pArr = [];
//     //  all question of that page
//     for (let i = 0; i < 10; i++) {
//         let href = await tab.evaluate(function (elem) {
//             return elem.getAttribute("href");
//         }, qoncPage[i]);

//         let newTab = await browser.newPage();
//         // developer tools=> elem.getAttribute
//         let mWillAddedPromisetocQ = handleSingle(newTab, "https://www.udemy.com" + href, i);
//         pArr.push(mWillAddedPromisetocQ);
//     }
//     await Promise.all(pArr);

// }

// async function handleSingle(newTab, link, i) {
//     let x = i + 1;
//     await newTab.goto(link);

//     // await newTab.waitForSelector("button[data-purpose=toggle-wishlist]");
//     // await newTab.click("button[data-purpose=toggle-wishlist]");

//     await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
//     await newTab.click(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.btn.btn-link");
//     await newTab.waitFor(2000);

//     const titl = await newTab.evaluate(() => document.querySelector(".clp-lead__title").textContent);
//     const title = titl.substring(1, titl.length - 1).replace(':', '');
//     console.log(title);


//     const pric = await newTab.evaluate(() => document.querySelector("div[data-purpose=course-price-text]").textContent);
//     console.log(pric);

//     const desc = await newTab.evaluate(() => document.querySelector("div[data-purpose=collapse-description-text]").innerText);

//     const output = titl + pric + '\nDescription' + desc;

//     fs.writeFileSync('./Output/' + x + '. ' + title + '.txt', output);

//     // await newTab.pdf({ path: './PDFOutput/' + x +'. '+ title+'.pdf' , format: 'A4' });

//     await newTab.waitForSelector(".wishlist--wishlist--2riVP.wishlist-button--style-inverse--22PW4.wishlist-button--wishlist-btn--3Xy6s.wishlist-button--active--2i1GY.btn.btn-link");
//     await newTab.screenshot({ path: './Output/' + x + ' ' + title + '.png', fullPage: true });

//     // let bodyHTML = await newTab.evaluate(() => document.body.innerHTML);
//     // let bodyHTML = await newTab.content();
//     // console.log(bodyHTML);

//     // await fs.writeFileSync('./PDFOutput/' + x + '. ' + title + '.html', bodyHTML);

//     await newTab.close();
// }