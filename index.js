const puppeteer = require('puppeteer');
const $ = require('cheerio');
const prompt = require('prompt-sync')();

const search = prompt('which stock you want to search?');
inputURL = `https://www.google.com/search?q=${search.replace(/\s+/g, '')}+share`;
// console.log(inputURL);
const url = inputURL;
puppeteer
    .launch()
    .then(function (browser) {
        return browser.newPage();
    })
    .then(function (page) {
        return page.goto(url).then(function () {
            return page.content();
        });
    })

    .then(function (html) {
        if (   $('.aviV4d', html).length > 0) { 
            // it exists 
            $('.aviV4d', html).each(function () {
                console.log("Name : "+ $(this).find('.oPhL2e').text());
                console.log("Stock Exchange :  "+ $(this).find('.HfMth').text());
                console.log("Price : "+ $(this).find('.XcVN5d').text() + $(this).find('.knFDje').text());
                // console.log("kadel "+ $(this).find('.oPhL2e').text());
                console.log($(this).find(".IsqQVc > span:nth-child(2)").attr("aria-label")+ " ( "+$(this).find(".IsqQVc > span:nth-child(1)").text()+" ) ");
                console.log($(this).find('.TgMHGc').text());
                process.exit(1);
            });
        } else{
            // CLOSE THE PROGRAM
            console.log("not found");
            console.log('exit();');
            process.exit(1);
        }
        })



    .catch(function (err) {
        //handle error

    });