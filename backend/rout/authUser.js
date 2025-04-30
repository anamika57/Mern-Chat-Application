const express = require('express');
const {userRegister,userLogIn, userLogout}=require("../routControllers/userroutController");

const router = express.Router();

// POST /api/auth/register
router.post("/register", userRegister);


router.post('/login',userLogIn);
router.post("/logout",userLogout);

module.exports = router;