const express=require('express')
const {sendMessage}= require("../routControllers/messageController")
const {getMessage}= require("../routControllers/messageController")
const isLogin=require('../middleware/isLogin')

const router=express.Router();

router.post("/send/:id",isLogin,sendMessage);
router.get("/:id",isLogin,getMessage);


module.exports=router
