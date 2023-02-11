import { Request, Response } from "express";
import { draws } from "../../models/draws";
import { draw_details } from "../../models/draw_details";
export const explore = async (req: Request, res: Response) =>{
    try {
        const {id} = req.body['decode'] || ''
        console.log(`user id: ${id}`);
        const collection = await draws.findAll({ include:[{
            model: draw_details,
            where: { authorId: !id}
        }] ,limit : 50})
        return res.status(200).json(collection)
    } catch (error) {
        return res.status(403).send('something went wrong, please try again later')
    }

}