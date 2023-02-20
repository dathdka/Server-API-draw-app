import { participants } from "../../models/participants"
import { v4 } from "uuid"
export const storeAuthor = async ( authorId : string, drawId: string) =>{
    await participants.create({
        id : v4(),
        authorId : authorId,
        drawId : drawId
    })
}