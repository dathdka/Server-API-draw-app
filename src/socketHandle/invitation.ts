import { users  } from "../models/users";
import { participants } from "../models/participants";
import * as socketHandle from './socketHandle'
import { v4 } from "uuid";


export const invitation = async (data : socketHandle.dataInvitation)  =>{
    try {
        const findUserReceiveInvitation = await users.findOne({
            where : { email : data.emailReceiveInvitation}
        })
        if(!findUserReceiveInvitation){
            return {error : true, message : `email not exsist`};         
        }

        //check if invitation all ready exsist
        const isInvitationAlreadyExsist = await participants.findOne({
            where : {
                drawId : data.drawId,
                pending : true
            },
            include : [{
                model : users,
                where : {
                    email : data.emailReceiveInvitation
                }
            }]
        })
        if(isInvitationAlreadyExsist)
            return  { error: true, message : 'you are already sent'}

        // create new invitation if not exsist
        const invitation = await participants.create({
            id : v4(),
            pending : true,
            authorId : findUserReceiveInvitation.id,
            drawId : data.drawId
        })

        return {error : false, message: `invitation has been sent`, data : invitation}

        } catch (error) {
        console.error(error);
        return {error : true, message : 'something went wrong, please try again later'}
    }
}