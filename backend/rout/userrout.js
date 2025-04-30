const express=require('express')
const isLogin=require('../middleware/isLogin')
const {getUserBySearch}=require('../routControllers/userroutHandler')
const {getCurrentChatters}=require('../routControllers/userroutHandler')
const router=express.Router()
router.get("/search",isLogin,getUserBySearch)
router.get("/currentChatters",isLogin,getCurrentChatters)
module.exports=router