const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");
const jwtwebToken = require("../utils/jwtwebToken.js");
const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, password, gender, profilepic } =
      req.body;
    console.log(req.body);
    const user = await User.findOne({ username, email });
    if (user)
      return res
        .status(500)
        .send({ success: false, message: "Username or Email already exists" });
    const hashPassword = bcrypt.hashSync(password, 10);
    const profileBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? profileBoy : profileGirl,
    });
    if (newUser) {
      // Create JWT

      await newUser.save();
      jwtwebToken(newUser._id, res);
    } else {
      res.status(500).send({ success: false, message: "Invalid User Data" });
    }
    res.status(201).send({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,

      profilepic: newUser.profilepic,
    });
  } catch (error) {
    console.error("Error in userRegister:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    console.log(error);
  }
};


// Login
const userLogIn = async(req, res) => {
  try {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
    if (!user)
      return res.status(500).send({ success: false, message: "Email Doesn't Exist Register" });

    const comparePass = bcrypt.compareSync(password, user.password || "");
    if (!comparePass)
      return res.status(400).send({
        success: false,
        message: "Email Or Password doesn't Matching",
      });
    jwtwebToken(user._id, res);
   return res.status(200).send({
    success: true,
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      message: "Successfully Login",
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    console.log(error);
  }
};



//Logout
 const userLogout=async(req,res)=>{
  try{
     res.cookie('jwt','',{
      maxAge:0
  })
  res.status(200).send({message:"Use Logout"})
  }catch(error){

    console.error("Error in userLogout:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    console.log(error);

  }

 }
module.exports={userRegister ,userLogIn ,userLogout};