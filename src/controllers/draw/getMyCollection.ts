import { Request, Response } from "express";
import { participants } from "../../models/participants";
import { draws } from "../../models/draws";

export const getMyCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.body["decode"] || "";
    const drawList = await participants.findAll({
      where: { authorId: id, pending: false },
      include: draws,
    });
    return res.status(200).json(drawList);
  } catch (error) {
    console.log(error);
    return res.status(404).send("sonething went wrong, please try again later");
  }
};
