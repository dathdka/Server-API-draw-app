import cors from "cors";
import express from "express";
import http from "http";
import dbconfig from "./dbConfig/config";
import router from "./routes/router";
import { redisClient } from "./initRedis";
import "dotenv/config";

var app = express();


app.use(express.json());
app.use(cors({ origin: true }));
app.use("/home", router);
const server = http.createServer(app);
(async() => await new redisClient().getClient())()

dbconfig
  .sync()
  .then(() => {
    console.log("DB synced successfully");
    server.listen(`${process.env.EXPRESS_PORT}`, (): void => {
      console.log(`server listening port ${process.env.EXPRESS_PORT}`);
    });
  })
  .catch((err: Error) => {
    throw err;
  });


