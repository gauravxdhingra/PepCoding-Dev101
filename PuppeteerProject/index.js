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
        await Promise.all([
            tab.click("input[data-purpose=do-login]"), tab.waitForNavigation({
                waitUntil: "networkidle2"
            })
        ]);

        // ***********************Search Courses*************************

        await tab.waitForSelector("input[data-purpose=search-input]");
        await tab.type("input[data-purpose=search-input]", course, { delay: 120 });

        await Promise(
            tab.click("button[type=submit]"), tab.waitForNavigation({
                waitUntil: "networkidle2"
            })
        );


        await tab.goto(pUrl, { waitUntil: "networkidle2" });
        await tab.waitForSelector("div[data-key=tab_posts]");
        //  post => click => reroute=> 2 times=> 2 times (wait for navigation)
        await Promise.all([
            tab.click("div[data-key=tab_posts]"),
            tab.waitForNavigation({ waitUntil: "networkidle2" })
        ])
        await tab.waitForNavigation({ waitUntil: "networkidle2" });

        let idx = 0;
        do {
            //  post => 7 post => are loaded 
            await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
            // children selector

            let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
            // saftey
            // console.log(elements.length);
            let post = elements[idx];
            // like -> selector
            await tab.waitForSelector("._666k ._8c74");
            let like = await post.$("._666k ._8c74");
            await like.click({ delay: 100 });
            idx++;
            await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
            //  wait for loader => visible => content load =>
            // hidden=> may post => wait for loader 
            //  loader  hide wait 
            // immediate child
            //  descendent 
        } while (idx < nPost)
        // await browser.close();
    } catch (err) {
        console.log(err)
    }
})()


// div class="1xnd"
//     div 
//       ul
//         li
//           div class="_4-u2 4-u8"



// div class="1xnd"
//   div class="_4-u2 4-u8"