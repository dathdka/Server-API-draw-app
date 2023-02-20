import { Request, Response } from "express";
import { draws } from "../../models/draws";
import { v4 } from "uuid";
import { storeNewAuthor } from "../../jobQueue/storeNewAuthor";

export const createNewBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.body["decode"] || "";
    console.log(`user id: ${id}`);
    const { boardName } = req.body
    const newBoard = await draws.create({
        id : v4(),
        name : boardName
    });
    const jobQueue =  new storeNewAuthor();
    jobQueue.addJob({userId: id, boardId: newBoard.id})
    return res.status(200).json({newBoard})
  } catch (error) {
    console.log(error);
    return res.status(403).send("something went wrong, please try again later");
  }
};
