let metadata = require("./metadata.json")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let id = process.argv[2]
let pass = process.argv[3]

let googlePageWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login");
googlePageWillBeOpenedPromise.then(function () {
    // console.log('google page opened')
    // search email input box
    let eamilWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"))
    let passWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"))
    // return eamilWillBeSelectedPromise
    // click
    return Promise.all([eamilWillBeSelectedPromise, passWillBeSelectedPromise])
}).then(
    function (ElementArray) {
        let idWillBeSentPromise = ElementArray[0].sendKeys(id)
        let passWillBeSentPromise = ElementArray[1].sendKeys(pass)
        // return abracaWillBeSentPromise
        return Promise.all([idWillBeSentPromise, passWillBeSentPromise])
    }
).then(function () {
    // console.log('google page opened')
    // serach email input box
    let eamilWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"))
    return eamilWillBeSelectedPromise
    // click
}).then(
    function (emailElement) {
        let abracaWillBeSentPromise = emailElement.click()
        return abracaWillBeSentPromise
    }
).then(
    function () {
        console.log('Login Success')
    }
).then(
    function () {
        let REsorcecardSelectedPageAnchorPromise = driver.findElement(swd.By.css(".resource a"))
        return REsorcecardSelectedPageAnchorPromise
    }).then(function (ResourceElement) {
        let ResourceCardClickPromise = ResourceElement.getAttribute("href")
        console.log(ResourceCardClickPromise)
        return ResourceCardClickPromise
    }).then(
        // console.log("resorces opened")
        function (pageLink) {
            console.log(pageLink)
            let NavigateToCorsesList = driver.get(pageLink)
            return NavigateToCorsesList
        }
    ).then(

        function () {

        }
    )

    .catch(
        function (e) {
            console.log(e)
        }
    )


// Search email
// input email
// search password
// input pass
// search submit
// press submit

// googlePageWillBeOpenedPromise.catch(function (err) {
//     console.log(err)
// })