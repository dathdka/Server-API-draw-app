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
  
      //if account already connect with socket then
      // the account come after will be disconnect
      const userInfo : decodeType = socket.data.userDetails      
      const alreadyLogin = await this.RC.getValue(userInfo.id)
      if(alreadyLogin !== socket.id && alreadyLogin || alreadyLogin === undefined  )
        socket.emit('already-login' )
      await this.RC.setValue(userInfo.id, socket.id)
      console.log(`${userInfo.id} : ` + await this.RC.getValue(userInfo.id));
      
      //!send invitation to other user
      socket.on('send-invitation', async (data : socketHandle.dataInvitation) =>{
        data.sender = userInfo.email
        const result = await socketHandle.invitation(data)
        if(!result.error){
          const idReceiveInvitation = result.data?.authorId || ''
          const socketReceive = await this.RC.getValue(idReceiveInvitation) || ''
          console.log(`${idReceiveInvitation} : ` +socketReceive)
          
          socket.to(socketReceive).emit('receive-invitation',result.data?.dataValues)
        }
        socket.emit('notification',result.message)
      })

      //!accept the invitation
      socket.on('accept-invitation',async (data : socketHandle.dataAcceptInvitation) =>{
        const result = await socketHandle.acceptInvitation(data)
        socket.emit('notification', result.message)
      })

      //!reject the invitation
      socket.on('reject-invitation', async(data : socketHandle.dataAcceptInvitation)=>{
        const result = await socketHandle.rejectInvitation(data)
        socket.emit('notification', result.message)
      })


      socket.on('draw', async (data : socketHandle.dataDraw) =>{
        data['senderId'] = userInfo.id
        const result = await socketHandle.drawHandle(data)
        //!send draw data object to everyone are author
        if(!result.error){
          result.data?.forEach(async el => {
            const socketId = await this.RC.getValue(el) || ''
            socket.to(socketId).emit('receive-draw-data',data)
          })
        }else
          socket.emit('notification', result.message)
      })

      socket.once('disconnect', async() =>{
        const valueHadBeenSet = await this.RC.getValue(userInfo.id)
        console.log(userInfo.email + ' has disconnect');
        
        if(socket.id === valueHadBeenSet){
          console.log(`remove socket`);
          await this.RC.setValue(userInfo.id,'')
        }
      })
    });
  }
}