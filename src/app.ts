import cors from "cors";
import express from "express";
import http from "http";
import dbconfig from "./dbConfig/config";
import router from "./routes/router";
import { redisClient } from "./redis";
import { socket } from "./socket";
import { storeNewAuthor } from "./jobQueue/storeNewAuthor";
import "dotenv/config";

var app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(router);
const server = http.createServer(app);

dbconfig
.sync()
.then(async () => {
  server.listen(`${process.env.EXPRESS_PORT}`);
  const initIO = new socket(server);
  initIO.handleConnection()    
  await new redisClient().getClient()
  new storeNewAuthor().getJobQueue();
})
.catch((err: Error) => {
  throw err;
});
console.log(`server started`);

export default app;
