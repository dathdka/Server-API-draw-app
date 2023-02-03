import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../../models/users";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import "dotenv/config";

export const register: RequestHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const isDuplicate = await users.findAll({ where: { email: `${email}` } });
  if (isDuplicate.length > 0)
    return res.status(400).send("Email already exsist");
  let encryptPass = await bcrypt.hash(`${password}`, 5);
  await users
    .create({
      id: `${v4()}`,
      email: `${email}`,
      username: `${username}`,
      password: `${encryptPass}`,
    }).then((storedUser : users) =>{
        const token = jwt.sign(
          { email: storedUser.email, username: storedUser.username },
          `${process.env.SECRET_JWT}`,
          { expiresIn: "365d" }
        );
        return res.status(201).json({token : token, username : storedUser.username});
    })
    .catch((err: Error) => {
      console.error(err);
      return res.status(400).send("something went wrong");
    });
};
