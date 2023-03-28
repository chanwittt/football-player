const puppeteer = require('puppeteer')
async function scrape() {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto('https://www.transfermarkt.com/premier-league/marktwerte/wettbewerb/GB1/pos//detailpos/0/altersklasse/alle/plus/1')

    // Image
    const elementImg = await page.waitForSelector("#yw1 > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.hauptlink > a")
    const img = await page.evaluate(elementImg => elementImg., elementImg)
    // elementImg.forEach(element => {
    //     // const imgProfile = await page.evaluate(elementImg => elementImg, elementImg)
    //     console.log(element)
    // });
    console.log(img)
    // Close
    browser.close()
}
scrape()
