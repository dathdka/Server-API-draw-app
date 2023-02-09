import { NextFunction, Request, Response } from "express";
import { redisClient } from "../redis";
import { decodeToken } from "../util/decodeToken";


export const auth = async (req : Request, res: Response, next: NextFunction) =>{
    let token : string = req.body.token || req.headers['authorization'] || '' ;
    token = token.replace(`Bearer `,"")
    if(!token)
        return res.status(403).send('invalid token')
    const client = await new redisClient().getClient();
    const decoded = decodeToken(token)
    if(!decoded)
        return res.status(401).send('Invalid token')
    if(token !== await client.getValue(decoded.id))
        return res.status(401).send('Account already login in another Device or Browser')
    req.body['decode'] = decoded;
    return next();
}