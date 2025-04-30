const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const isLogin = async (req, res, next) => {
  try {
   

    const token = req.cookies.jwt;
    console.log(token);
    if (!token)
      return res
        .status(500)
        .send({ success: false, message: "unauthorised user" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res
        .status(500)
        .send({ success: false, message: "unauthorised user-Invalid Token" });
    const user = await User.findById(decode.userId).select("-password");
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "user not found" });
    (req.user = user);
     next();
  } catch (error) {
    console.log(`error in isLogin middleware : ${error.message}`);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
module.exports=isLogin;
