import { Request, Response } from "express";
import { participants } from "../../models/participants";

export const getInvitation = async (req : Request, res: Response) =>{
    const {id} = req.body['decode'] || ''
    try {
        const invitations = await participants.findAll({
            where : {
                authorId : id,
                pending : true,
                sender : null || ''
            }
        })
        return res.status(200).json(invitations)
    } catch (error) {
        console.log(error);
        return res.status(403).send('something went wrong, please try again later')
    }
}