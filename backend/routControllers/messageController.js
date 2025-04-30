const Conversation=require('../Models/conversationModels')
const Message=require('../Models/messageSchema');

const  sendMessage=async(req,res)=>{

    try{
      console.log("📦 req.body in sendMessage =>", req.body);
const {message}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;

let chats=await Conversation.findOne({
    participants:{$all:[senderId ,receiverId]}
})
if(!chats){
   chats=await Conversation.create({
    participants:[senderId,receiverId]
   });
}
const newMessages=new Message({
senderId,
receiverId,
message,
conversationId:chats._id,
})

if(newMessages){
    chats.messages.push(newMessages._id)
}


await Promise.all([
chats.save(),
newMessages.save()
]);

//SOCKET.IO function

res.status(200).send(newMessages);
    }
    catch(error){
        res.status(500).send({
            success:false,
            message: error.message || "Internal Server Error",
        });
        console.log(error);

    }
}


// frontend
const getMessage=async (req,res)=>{
  
  try{
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
      const chats=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
      }).populate("messages")
      if(!chats) return res.status(200).send([]);
      const message=chats.messages;
      res.status(200).send(message)
  }   
  catch(error){
    res.status(500).send({
        success:false,
        message: error.message || "Internal Server Error",
    });
    console.log(error);

  }
}
module.exports={sendMessage,getMessage}