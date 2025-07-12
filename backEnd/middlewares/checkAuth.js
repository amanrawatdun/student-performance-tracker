const { getUser } = require("./auth");

 function checkAuth(req ,res ,next){
   const authHeader = req.headers.authorization;
   const token =authHeader.split(' ')[1];
   
   const user = getUser(token);
   
   req.user=user;
   next();
}


module.exports=checkAuth;