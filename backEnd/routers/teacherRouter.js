const express = require('express');
const { handleTeacherSignup, handleTeacherLogin, handleGetTeacher,handleUpdateTeacher, handleDeleteTeacher} = require('../controllers/teacherController');
const checkAuth = require('../middlewares/checkAuth')
const router = express.Router();


router.post('/signup' ,handleTeacherSignup)
router.post('/login' , handleTeacherLogin)
router.get('/', checkAuth,handleGetTeacher);
router.put('/update',checkAuth,handleUpdateTeacher );
router.delete('/delete',checkAuth,handleDeleteTeacher)

module.exports=router;