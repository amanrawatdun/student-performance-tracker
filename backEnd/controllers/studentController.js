const {Student} = require('../models/studentModel')

async function createStudent(req ,res){
    
   const{firstName, lastName ,rollno , className,contactInfo ,grades , attendace,remarks , createdBy}=req.body;

  
  
    try{
        const student = await Student.create({
        firstName,
        lastName,
        rollno,
        className,
        contactInfo,
        grades , attendace,remarks , 
        createdBy:req.user.id
    })

    return res.status(200).json({status:200, message:"student create successfully" , student})
    }catch(err){
         return res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred during registration.',
            details: err.message
        });
    }
}

async function getAllStudents(req ,res){
    const id = req.user.id;
    
    try{
        const students = await Student.find({createdBy:id})
        res.status(200).json({status:200,message:"done" , students})
    }catch(err){
        console.log(err)
    }
}

async function deleteStudent(req ,res){
    const studentId=req.params.id;
    
    
   await Student.findByIdAndDelete({_id:studentId})

   return res.status(200).json({status:200,mess:"deleted successfully"})
}

async function getStudent(req ,res){
    const id =req.params.id;
   try{ 
    const student = await Student.findOne({_id:id})
    
    res.status(200).json({status:200,message:"student data send successfully",student})
    }
    catch(error){
        console.log("error occur",error)
    }

}

async function editStudent(req ,res){
    const {id}=req.params;
    const updateData=req.body;
 
    try{

        const updateStudent = await Student.findByIdAndUpdate(
            id,
            {$set:updateData},
            {
                new:true,
                runValidators:true
            }
        )
        res.status(200).json({message:'student update successfully' , student:updateStudent})
    }catch(error){
        console.log("error in updating" ,error);
        res.status(500).json({message:"server error"})
    }
}

module.exports={
    createStudent,
    getAllStudents,
    deleteStudent,
    editStudent,
    getStudent
}
