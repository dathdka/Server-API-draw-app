import { Request, Response } from "express";
import { draws } from "../../models/draws";
import { participants } from "../../models/participants";
export const explore = async (req: Request, res: Response) =>{
    try {
        const {id} = req.body['decode'] || ''
        const collection = await draws.findAll({ include:[{
            model: participants,
            where: { authorId: !id}
        }] ,limit : 100})
        return res.status(200).json(collection)
    } catch (error) {
        return res.status(403).send('something went wrong, please try again later')
    }

}