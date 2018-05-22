const puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://medium.freecodecamp.org/a-practical-guide-to-fetch-reduce-and-formatting-data-from-an-external-api-283ddd9bfdcb');
    await page.screenshot({path: '4pda.png'});

    await browser.close();
}

// getPic();

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');
    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    // await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let res = [];
        let books = document.querySelectorAll('.product_pod');
        books.forEach((book) => {
            console.log(book);
            
            let title = book.childNodes[5].innerText; 
            let price = book.childNodes[7].children[0].innerText;
            res.push({
                title, 
                price
            });

        
        })
        // let bookPrices = document.querySelectorAll('.product_pod > .price_color').innerText;
        // for (let i = 0 ; i < booksTitles.length; i++) {
        //     res.push({
        //         'title' : booksTitles[i],
        //         'price' : bookPrices[i]
        //     })
        // }
        return res;

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});