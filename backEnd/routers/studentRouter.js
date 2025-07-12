const express = require('express');
const { createStudent, getAllStudents, deleteStudent, editStudent, getStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/student', createStudent)
router.get('/allstudent',getAllStudents)
router.delete('/student/:id',deleteStudent)
router.get('/student/:id',getStudent)
router.patch('/student/:id',editStudent)



module.exports=router;