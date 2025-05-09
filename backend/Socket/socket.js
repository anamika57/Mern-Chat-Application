import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app=express();

const server =http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:["GET","POST"],
        credentials: true
    }
});
const userSocketmap={}; //userId,receiverId
export const getReceiverSocketId=(receiverId)=>{
    return userSocketmap[receiverId];

};

io.on('connection',(socket)=>{
  console.log("New socket connection:", socket.id);
  const userId =socket.handshake.query.userId;
  if(userId && userId!=="undefined"){
    userSocketmap[userId]=socket.id;
  }  
  io.emit("getOnlineUsers",Object.keys(userSocketmap));

     // Listen for sendMessage event
     socket.on('sendMessage', (data) => {
      console.log("Message received:", data);
      
      const receiverSocketId = userSocketmap[data.receiverId];
      
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", data);
      }
  });
  
   socket.on('disconnect',()=>{
    console.log(`User disconnected: ${socket.id}`);
        
        // Find and remove the disconnected user from userSocketmap
        for (const [userId, socketId] of Object.entries(userSocketmap)) {
            if (socketId === socket.id) {
                delete userSocketmap[userId];
                break;
            }
        }
        
        // Update the list of online users
    io.emit('getOnlineUsers', Object.keys(userSocketmap));
   });

})
export {app,io,server};
