import * as socketHandle from './socketHandle'
import { participants } from '../models/participants'

export const drawHandle = async (data : socketHandle.dataDraw) =>{
    //!get all author id of draw
    try {
        const {senderId , drawId} = data
    const authors = await participants.findAll({
        where : {
            drawId : drawId,
            authorId : !senderId,
            pending : false
        }
    })

    const authorsId = authors.map(el => el.authorId)
    return {error : false, message: '', data : authorsId}
    } catch (error) {
        console.log(error);
        return {error : true, message: 'something went wrong, please try again later'}
    }
    
}