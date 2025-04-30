const Conversation = require('../Models/conversationModels');
const User=require('../Models/userModel')
const getUserBySearch=async(req,res)=>{
    try{
const search =req.query.search || '';
const currentUserID=req.user._id;
const user=await User.find({
    $and:[
        {
            $or:[
                {username:{$regex:'.*'+search+'.*',$options:'i'}},
                {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
            ]
        },{
            _id:{$ne:currentUserID}
        }
    ]
}).select("-password").select("email")
res.status(200).send(user)
    }
    catch(error){
        res.status(500).send({
            success:false,
            message: error.message || "Internal Server Error",
        });
        console.log(error);
    }
}


const getCurrentChatters=async(req,res)=>{
try{
const currentUserID=req.user._id;
const currentChatters=await Conversation.find({
    participants:currentUserID
}).sort({
    updatedAt:-1
});
if(!currentChatters || currentChatters.length===0) return res.status(200).send([]);
const participantsIDS=currentChatters.reduce((ids,conversations)=>{
    
    const otherParticipants=conversations.participants.filter(id=>id.toString()!==currentUserID.toString());
        return [...ids ,...otherParticipants];
},[])

const uniqueParticipantIDs = [...new Set(participantsIDS.map(id => id.toString()))];
const user=await User.find({
    _id:{$in:uniqueParticipantIDs}}).select("-password").select("email");
    
res.status(200).send(user);


}
catch(error){
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
}
}
module.exports={getUserBySearch,getCurrentChatters};