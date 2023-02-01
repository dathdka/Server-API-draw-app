import event from 'events'
import puppeteer from 'puppeteer';
import browserConfig from './browserConfig';
const getData = async() =>{
    let Browser = await puppeteer.launch(browserConfig);
    let page = (await Browser.pages())[0];
    await page.goto('https://www.google.com')
    let eventEmitter = new event.EventEmitter();
    
}

export default getData;