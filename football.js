const puppeteer = require('puppeteer')
const fs = require('fs');
async function scrape() {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    const data = []
    await page.goto('https://www.transfermarkt.com/premier-league/marktwerte/wettbewerb/GB1/plus/1/galerie/0?pos=&detailpos=&altersklasse=alle')
    await page.click('#yw1 > div.pager > ul > li:nth-child(2) > a')
    for (let index = 1; index <= 25; index++) {
        // Name
        const elementName = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.hauptlink > a`)
        const name = await page.evaluate(elementName => elementName.textContent, elementName)

        // Position
        const elementPosition = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td`)
        const position = await page.evaluate(elementPosition => elementPosition.textContent, elementPosition)

        // National
        const elementNation = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(3) > img:nth-child(1)`)
        const nation = await page.evaluate(elementNation => elementNation.title, elementNation)

        // Age
        const elementAge = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(4)`)
        const age = await page.evaluate(elementAge => elementAge.textContent, elementAge)

        // Club
        const elementClub = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(5) > a > img`)
        const club = await page.evaluate(elementClub => elementClub.title, elementClub)

        // Highest value
        const elementHighest = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(6) > span`)
        const highesValue = await page.evaluate(elementHighest => elementHighest.textContent, elementHighest)

        // Last update at
        const elementLast = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td:nth-child(7)`)
        const lastUpdate = await page.evaluate(elementLast => elementLast.textContent, elementLast)

        // Market value
        const elementMarket = await page.waitForSelector(`#yw1 > table > tbody > tr:nth-child(${index}) > td.rechts.hauptlink > a`)
        const marketValue = await page.evaluate(elementMarket => elementMarket.textContent, elementMarket)

        data.push({ playerId:index, name, position, nation, age, highesValue, lastUpdate, marketValue })
        if (index === 25) {
            // const jsonData = `{"player":${data}}`
            // const jsonObj = JSON.parse(jsonData)
            const jsonContent = JSON.stringify(data)
            fs.writeFile("page2.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }

                console.log("JSON file has been saved.");
            });
        }

    }

    // Close
    browser.close()
}
scrape()
