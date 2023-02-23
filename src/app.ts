import cors from "cors";
import express from "express";
import http from "http";
import dbconfig from "./dbConfig/config";
import authRouter from "./routes/authRouter";
import drawRouter from './routes/drawRouter'
import participantRouter from "./routes/participantRouter";
import { redisClient } from "./redis";
import { socket } from "./socket";
import { storeNewAuthor } from "./jobQueue/storeNewAuthor";
import "dotenv/config";

var app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use('/auth',authRouter);
app.use('/draw',drawRouter);
app.use('/participant',participantRouter)

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
