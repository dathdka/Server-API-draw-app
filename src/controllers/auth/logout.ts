import { Request, Response } from "express";
import { decodeToken } from "../../util/decodeToken";
import { redisClient } from "../../redis";

export const logout = async(req : Request, res: Response) =>{
    const {token} = req.body;
    //set empty token for user
    const client = await new redisClient().getClient();
    const decoded = decodeToken(token);
    await client.setValue(decoded.id,'');
    return res.status(200).send('logout success')
}