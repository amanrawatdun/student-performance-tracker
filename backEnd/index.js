const express=require("express");
const { connectDB } = require("./connection");
const teacherRouter  = require('./routers/teacherRouter')
const studentRouter = require('./routers/studentRouter')
require('dotenv').config()
const cors=require('cors');
const checkAuth = require("./middlewares/checkAuth");


const app=express(); 


const PORT=process.env.PORT || 8000;

const mongo_url=process.env.MONGODB_URL;



//mongodb connection
connectDB(mongo_url)
.then(()=>console.log("mongoDB connected successfully"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'https://student-performance-tracker-frontend.onrender.com',
  credentials: true,
}));



app.use('/teacher',teacherRouter)
app.use('/' ,checkAuth, studentRouter)

app.listen(PORT , ()=>console.log(`Server started at Port ${PORT}`))



