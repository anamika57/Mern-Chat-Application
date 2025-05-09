const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const {app ,server} =  require("./Socket/socket")
dotenv.config();


const dbConnect = require("./DB/dbConnect");
const authRouter = require("./rout/authUser");
const messageRouter=require('./rout/messagerout')
const userRouter=require('./rout/userrout')
app.set("views", path.join(__dirname, "views"));
const port = process.env.PORT || 3000;

// Connect to DB
dbConnect();

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
// Routes

app.use("/api/auth",authRouter)

app.use("/api/message",messageRouter)
app.use("/api/user",userRouter)


app.get("/", (req, res) => {
  res.send("hello");
});


server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
