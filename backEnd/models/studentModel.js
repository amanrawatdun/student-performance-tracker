const mongoose = require('mongoose')

const gradeSchema=new mongoose.Schema({
    subject:{type:String,required:true},
    score:{type:Number , required:true}
},{_id:false});

const attendanceSchema=new mongoose.Schema({
    date:{type:String , required:true},
    status:{type:String ,enum:['Present' , 'Absent'], required:true}
},{_id:false})

const remarkSchema=new mongoose.Schema({
    date:{type:String,required:true},
    text:{type:String , required:true}
},{_id:false})

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    contactInfo:{
        phone:{type:String},
        email:{type:String}
    },
    grades:[gradeSchema],
    attendance:[attendanceSchema],
    remarks:[remarkSchema],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
    }
},{timestamps:true});

const Student=mongoose.model('Student' , studentSchema)

module.exports={
    Student
}


