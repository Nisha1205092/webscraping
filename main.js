import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { parse } from 'json2csv';
import { appendFileSync } from 'fs';

const saveResults = (results) => {
    const jsonresults = JSON.stringify(results);
    appendFileSync('products.json', jsonresults);

    const csv = parse(results);
    appendFileSync('products.csv', csv);
}

const scrapeOnePage = async (storeUrl) => {
    const response = await gotScraping(storeUrl);
    const html = response.body;

    // Parse HTML with Cheerio
    const $ = cheerio.load(html);

    // Find all products on the page
    const products = $('.product-item');

    // Loop through all the products
    // and print their text to terminal
    const results = [];
    for (const product of products) {
        const titleElement = $(product).find('a.product-item__title');
        const title = titleElement.text().trim();

        const priceElement = $(product).find('span.price');
        const price = priceElement.contents()[2].nodeValue.trim();

        results.push({ title, price });
    }

    return results;
}

const scrapeMultiplePages = async () => {
    const pages = [
        'https://warehouse-theme-metal.myshopify.com/collections/sales',
        'https://warehouse-theme-metal.myshopify.com/collections/sales?page=2'
    ];

    let results = [];
    for (let i = 0; i < pages.length; i++) {
        let temp = await scrapeOnePage(pages[i]);
        results = results.concat(...temp); // flatten the array to single level
    }
    // console.log(results);
    saveResults(results);
}

scrapeMultiplePages();




