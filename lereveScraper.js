import { gotScraping } from "got-scraping";
import * as cheerio from 'cheerio';

const pageUrl = 'https://www.lerevecraze.com/product-category/men/shirts/';

const response = await gotScraping(pageUrl);

const html = response.body;

// parse html with cheerio
const $ = cheerio.load(html);
/*
const headingElement = $('h1');
const headingText = headingElement.text();
console.log(headingText);
*/
const products = $('div.product-inner.clearfix');

for (const product of products) {
    const productDetails = $(product).contents()[3];
    const title = $($(productDetails).contents()[1]).text();
    const price = $(productDetails).find('span.price-bdt').text();
    const imageUrl = $($(product).contents()[1]).find('img.entered.lazyloaded').attr('src');
    // imageUrl is undefined because, probably the image is not loaded at that time
    // need to add some delay

    console.log(`${title}, ${price}, ${imageUrl}`);
}

/*
const products = document.querySelectorAll('div.product-inner.clearfix');

const results = []

for (const product of products) {
    const productDetails = product.childNodes[3];
    const title = productDetails.childNodes[1].textContent;
    const price = productDetails.querySelector('span.price-bdt').textContent;
    const imageUrl = product.childNodes[1].querySelector('img.entered.lazyloaded').src

    results.push({ title, price, imageUrl });
}

console.log(results);

// only the first 10 products' imageUrl loads on the first time page loading. 
// If we scroll, then slowly rest of the 
// imageUrls load. So, without loading them all, 
// when we try to iterate over all the product in the loop
// after the first 10, we get error for line#9

*/

