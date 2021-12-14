import { Server as SocketServer } from "socket.io"
import {RTCServerSocket} from "rtc-socket-connector-types"

interface HandlerOption {
  debug: boolean;
}

function addRTCConnectionHandlers(socketServer: SocketServer, option: HandlerOption){
  const log = option.debug ? console.log : function(){}

  socketServer.on("connection", (socket:RTCServerSocket) => {
    socket.on('offer', arg => {
      // @ts-expect-error
      socket.emit("hi");
      socketServer.to(arg.answerSocketId).emit('offer', arg);
      log("offer :::" + JSON.stringify(arg))
    })
  
    socket.on('answer', arg => {
      log("answer :::" + JSON.stringify(arg));
      socketServer.to(arg.offerSocketId).emit('answer', arg);
    })
  
    socket.on('candidate', arg => {
      log("candidate ::: " + JSON.stringify(arg));
      socketServer.to(arg.destSocketId).emit('candidate', arg)
    })
  })
}

export {
  addRTCConnectionHandlers,
  RTCServerSocket
}