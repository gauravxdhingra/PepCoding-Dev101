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

        await tab.goto(url, { waitUntil: "networkidle2" });

        for (let i = 0; i < memesArray.length; i++) {

            let text1 = memesArray[i].text1;
            let text2 = memesArray[i].text2;
            let text3 = memesArray[i].text3;
            let templete = memesArray[i].templete;

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

            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };

            download(memeUrl, './memes/' + n + '.jpg', function () {
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

        await Promise.all([
            tab.click("#loginbutton"), tab.waitForNavigation({
                waitUntil: "networkidle2"
            })
        ])

        await tab.click('span[class="_1vp5"]');

        for (let i = 0; i < memesArray.length; i++) {

            await tab.waitForSelector('a[data-tooltip-content="Photo/Video"]');

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