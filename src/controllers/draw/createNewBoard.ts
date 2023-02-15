import { Request, Response } from "express";
import { draws } from "../../models/draws";
import { participants } from "../../models/participants";
import { v4 } from "uuid";

const storeAuthor = async ( authorId : string, drawId: string) =>{
    await participants.create({
        id : v4(),
        authorId : authorId,
        drawId : drawId
    })
}

export const createNewBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.body["decode"] || "";
    console.log(`user id: ${id}`);
    const { boardName } = req.body
    const newBoard = await draws.create({
        id : v4(),
        name : boardName
    });
    setTimeout(()=>{
        storeAuthor(id, newBoard.id)
    },0)
    return res.status(200).json(newBoard)
  } catch (error) {
    return res.status(403).send("something went wrong, please try again later");
  }
};
