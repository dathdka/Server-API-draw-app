import { participants } from "../models/participants"
import * as socketHandle from './socketHandle'
export const acceptInvitation = async (data : socketHandle.dataAcceptInvitation) =>{
    try {
        await participants.update({pending : false}, {
            where : {
                id : data.participantsId
            }
        })
        const invitation = await participants.findByPk(data.participantsId)
        return {error: false, message: `invitation has been accept`, data: invitation}
    } catch (error) {
        console.log(error);
        return {error: true, message: `something went wrong, please try again later`}
    }
}