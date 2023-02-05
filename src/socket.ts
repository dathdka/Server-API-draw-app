import socketIO from 'socket.io'
export class socket {
  private io: socketIO.Server;

  constructor(server: any) {
    this.io = require("socket.io")(server,{
        cors :{
            origin : "*",
            method: ['GET','POST']
        }
    },()=>{
        console.log('socket server has been created')
    })
  }


  public getIO (){
    return this.io;
  }
}