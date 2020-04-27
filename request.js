let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio")
// console.log('before');
request("https://www.espncricinfo.com/series/19322/scorecard/1187683", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        // fs.writeFileSync("index.html", html);
        parseHtml(html)
    } else if (res.statusCode === 400) {
        console.log('Invalid Url')
    } else {
        console.log(err)
        console.log(res.statusCode)
    }
})
// console.log('after')

function parseHtml(html) {
    // let $ = cheerio.load(html)
    // // let headings =$("#global-header  .container  h1 a ").html()
    // // text()
    // // console.log(headings)
    // let commentary = $('.item-wrapper .description')
    // let text = $(commentary[0]).text()
    // console.log(text)

    let d = cheerio.load(html);
    let bowlers = d(".scorecard-section.bowling table tbody tr");

    let maxWickets = 0;
    let maxWicketsBowler = '';

    for (let i = 0; i < bowlers.length; i++) {
        let bowlerName = d(d(bowlers[i]).find("td")[0]).text()
        let wickets = d(d(bowlers[i]).find("td")[5]).text()
        // console.log(bowlerName + "\t" + wickets)
        if (wickets > maxWickets) {
            maxWickets = wickets
            maxWicketsBowler = bowlerName
        }
    }

    console.log(maxWicketsBowler + "\t" + maxWickets)

    fs.writeFileSync("bowling.html", bowlers);
    // console.log()
    // let team1bowler = bowlongsccard[0]
    // let team2bowler = bowlongsccard[1]

}
// https://www.espncricinfo.com/scores/series/19322