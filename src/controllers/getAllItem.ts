import { NextFunction, Request, RequestHandler, Response } from "express";
import { items } from "../models/items";
import  crawl from '../scraping/crawl';
import path from 'path'
const getAllItem : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    const itemList : items[] = await items.findAll();
    // return res.json(itemList) 
    // return res.sendFile(path.join(__dirname+'/../view/index.html'))
    await crawl();
    return
}

(module).exports = {getAllItem}

