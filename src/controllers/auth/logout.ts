import { Request, Response } from "express";
import { decodeToken } from "../../util/decodeToken";
import { redisClient } from "../../redis";

interface decodedToken {
    id: string,
    email: string,
    username: string
}

export const logout = async(req : Request, res: Response) =>{
    const userDetail : decodedToken = req.body['decode'];
    //set empty token for user
    const client = await new redisClient().getClient();
    await client.setValue(userDetail.id,'');
    return res.status(200).send('logout success')
}