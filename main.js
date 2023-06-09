import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';

const storeUrl = 'https://warehouse-theme-metal.myshopify.com/collections/sales';
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

const csv = parse(results);
writeFileSync('products.csv', csv);

