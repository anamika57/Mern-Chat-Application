const jwt=require('jsonwebtoken')

const jwtwebToken =(userId , res)=>{
   try{ 
   // Check if JWT_SECRET is defined
       if (!process.env.JWT_SECRET) {
         console.error("JWT_SECRET is not defined in environment variables!");
         return null;
       }
  const token =jwt.sign({userId},process.env.JWT_SECRET,{
   expiresIn:'365d'
});
   res.cookie('jwt',token,{
    maxAge:30 *24 *60 *60 *1000,
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV === "production" // Only secure in production
   }) ;
   console.log("JWT cookie set successfully");

   return token;
}catch(error) {
   console.error("Error setting JWT cookie:", error);
   return null;
 }
};
module.exports=jwtwebToken;