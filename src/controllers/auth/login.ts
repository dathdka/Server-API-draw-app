import { Request, RequestHandler, Response } from "express";
import { users } from "../../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isCreate = await users.findOne({ where: { email: `${email}` } });
  if (!isCreate) return res.status(401).send("email not exsist");
  if (await bcrypt.compare(`${password}`, isCreate.password)) {
    const token = jwt.sign(
      { email: isCreate.email, username: isCreate.username },
      `${process.env.SECRET_JWT}`,
      { expiresIn: `365d` }
    );
    return res.status(200).json({ token: token, username: isCreate.username });
  } else return res.status(401).send("wrong password");
};
