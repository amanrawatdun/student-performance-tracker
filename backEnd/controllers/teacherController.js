const mongoose = require('mongoose')
const Teacher = require('../models/teacherModel')
const bcrypt = require('bcrypt')
const { setUser } = require('../middlewares/auth')
const checkAuth = require('../middlewares/checkAuth')
async function handleTeacherSignup(req, res) {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
        return res.status(400).json({ status: 400, message: "invalid credencial" })
    }

    try {
        const saltRounds = 10;
        const hashpass = await bcrypt.hash(password, saltRounds)



        const newTeacher = await Teacher.create({
            firstName,
            lastName,
            email,
            password: hashpass,
            phone
        })



        return res.status(201).json({
            status: 'success',
            message: 'Teacher registered successfully.',
            data: {
                teacherId: newTeacher._id,
                email: newTeacher.email,
                firstName: newTeacher.firstName,

            }
        });
    } catch (err) {

        return res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred during registration.',
            details: err.message
        });
    }
}

async function handleTeacherLogin(req, res) {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 400, message: "invalid credencial" })
    }
    try {

        const teacher = await Teacher.findOne({ email })

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            return res.status(401).json({ status: 400, message: "invalid password" })
        }
        const token = setUser(teacher);

        res.cookie("token", token)

        return res.status(200).json({ status: 200, message: "user login", token })

    } catch (err) {

        return res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred during registration.',
            details: err.message
        });
    }
}

async function handleGetTeacher(req, res) {

    const id = req.user.id
    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

async function handleUpdateTeacher(req, res) {

    try {
        const { firstName, lastName, email, phone } = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, email, phone },
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) return res.status(404).json({ error: 'Teacher not found' });

        res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
 


async function handleDeleteTeacher(req, res) {

    try {
        const teacherId = req.user.id; 

       
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            return res.status(404).json({ error: 'Teacher account not found or already deleted.' });
        }

        return res.status(200).json({
            message: 'Teacher account deleted successfully.',
            deletedTeacherId: deletedTeacher._id,
        });

    } catch (error) {
        console.error('Error deleting teacher account:', error);
        return res.status(500).json({ error: 'Internal server error while deleting account.' });
    }
}

module.exports = {
    handleTeacherSignup,
    handleTeacherLogin,
    handleGetTeacher,
    handleUpdateTeacher,
    handleDeleteTeacher
}

