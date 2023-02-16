import { participants } from "../models/participants"
import * as socketHandle from './socketHandle'
export const rejectInvitation = async (data : socketHandle.dataAcceptInvitation) =>{
    try {
        await participants.destroy({
            where : {
                participantsId : data.participantsId
            }
        })
        return {error : false, message: `invitation has been ejected`}
    } catch (error) {
        console.log(error);
        return {error : true, message : `something went wrong, please try again later`}
    }
}