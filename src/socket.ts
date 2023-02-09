import socketIO, { Socket } from 'socket.io'
import { decodeToken } from './util/decodeToken';
import { DecodeToken as decodeType } from './util/decodeToken';
import { redisClient } from "./redis";
import * as redis from "redis";
interface userInfo
{
  id: string,
  username: string,
  token : string
}

export class socket {
  private io: socketIO.Server;
  RC = new redisClient();
  constructor(server: any) {
    this.io = require("socket.io")(server,{
        cors :{
            origin : "*",
            method: ['GET','POST']
        }
    });
    (async() =>{this.RC = await new redisClient().getClient()})
    //process authentication in socket middleware
    this.io.use((socket ,next)=>{
      const token = socket.handshake.auth?.token
      try {
        const decoded = decodeToken(token)
        if(!decoded)
          return next(new Error('NOT_AUTHORIZED'))
        socket.data.userDetails = decoded
        return next();
      } catch (error) {
        return next(new Error('NOT_AUTHORIZED'))
      }  
    })
    
  }


  public getIO (){
    return this.io;
  }

  public handleConnection  (){
    this.io.on("connection", async (socket) => {
  
      //if account already connect with socket socket then
      // the account come after will be disconnect
      const userInfo : decodeType = socket.data.userDetails      
      const alreadyLogin = await this.RC.getValue(userInfo.id)
      if(alreadyLogin !== socket.id && alreadyLogin || alreadyLogin === undefined  )
        socket.emit('already-login' )
      await this.RC.setValue(userInfo.id, socket.id)
      console.log(`${userInfo.email} has connected`);
      


      socket.on('disconnect', async() =>{
        if(socket.id === alreadyLogin){
          await this.RC.setValue(userInfo.id,'')
          console.log(`user ${userInfo.email} has disconnect`);
        }else
          console.log(`${userInfo.email} already login in another device`);
      })
    });
  }
}