import { NextFunction, Request, Response } from "express";
import { redisClient } from "../redis";
import { decodeToken } from "../util/decodeToken";


export const auth = async (req : Request, res: Response, next: NextFunction) =>{
    const {token} = req.body;
    const client = await new redisClient().getClient();
    const decoded = decodeToken(token)
    if(token !== await client.getValue(decoded.id))
        return res.status(401).send('Account already login in another Device or Browser')
    req.body['decode'] = decoded;
    return next();
}