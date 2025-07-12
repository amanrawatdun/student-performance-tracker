const jwt = require('jsonwebtoken') 
require('dotenv').config()


const secret=process.env.JWT_SECRET


function setUser(teacher){
    
    return jwt.sign({id:teacher._id , email:teacher.email} , secret)
}
function getUser(token){
    return jwt.verify(token , secret)
}

module.exports={
    setUser,
    getUser
}