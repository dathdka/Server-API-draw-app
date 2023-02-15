import socketIO, { Socket } from 'socket.io'
import { decodeToken } from './util/decodeToken';
import { DecodeToken as decodeType } from './util/decodeToken';
import { redisClient } from "./redis";
import * as socketHandle from './socketHandle/socketHandle'

export class socket {
  private io: socketIO.Server;
  RC = new redisClient();
  constructor(server: any) {
    this.io = require("socket.io")(server,{
        cors :{
            origin : true,
            method: ['GET','POST']
        },
    });

    //initial redis client
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
      console.log(`user ${userInfo.email} has connected`)
      
      socket.on('send-invitation', async (data : socketHandle.dataInvitation) =>{
        const result = await socketHandle.invitation(data)
        if(!result.error){
          const idReceiveInvitation = result.data?.id || ''
          const socketReceive = await this.RC.getValue(idReceiveInvitation) || ''
          socket.to(socketReceive).emit('receive-invitation')
        }
      })

      socket.on('invitation',async (data) =>{
        const message = await socketHandle.invitation(data)
      })


      socket.once('disconnect', async() =>{
        const valueHadBeenSet = await this.RC.getValue(userInfo.id)
        if(socket.id === valueHadBeenSet)
          await this.RC.setValue(userInfo.id,'')
      })
    });
  }
}