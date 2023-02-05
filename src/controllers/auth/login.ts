import { Request, RequestHandler, Response } from "express";
import { users } from "../../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { redisClient } from "../../redis";
import "dotenv/config";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isCreate = await users.findOne({ where: { email: `${email}` } });
  if (!isCreate) return res.status(401).send("email not exsist");

  //check if user already login
  const client = await new redisClient().getClient();
  const isLogin = (await client.getValue(isCreate.id)) || '';
  if (isLogin.length > 0)
    return res
      .status(401)
      .send("Account already login in another Device or Browser");

  if (!(await bcrypt.compare(`${password}`, isCreate.password)))
    return res.status(401).send("wrong password");

  //login and store user to redis if password is true
  const token = jwt.sign(
    { id: isCreate.id, email: isCreate.email, username: isCreate.username },
    `${process.env.SECRET_JWT}`,
    { expiresIn: `365d` }
  );
  console.log(token)
  await client.setValue(isCreate.id, token);
  return res.status(200).json({ token: token, username: isCreate.username });
};
