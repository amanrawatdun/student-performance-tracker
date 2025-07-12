import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        rollno: '',
        className: '',
        contactInfo: {
            phone: '',
            email: ''
        },
        grades: [],
        attendance: [],
        remarks: []
    });

    const fetchStudent = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/student/${id}`);
            
            setForm({
                ...res.data.student,
                contactInfo: res.data.student.contactInfo || { phone: '', email: '' },
                grades: res.data.student.grades || [],
                attendance: res.data.student.attendance || [],
                remarks: res.data.student.remarks || []
            });
            toast.success('Student data loaded successfully!');
        } catch (error) {
            console.error('Failed to load student:', error);
            toast.error('Failed to load student details. Please try again or check the URL.');
            navigate('/students'); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStudent();
        } else {
            toast.error('No student ID provided.');
            navigate('/students'); 
        }
    }, [id, navigate]); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContactInfoChange = (e) => {
        setForm({
            ...form,
            contactInfo: {
                ...form.contactInfo,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleAddGrade = () => {
        setForm(prevForm => ({
            ...prevForm,
            grades: [...prevForm.grades, { subject: '', score: '' }]
        }));
    };

    const handleGradeChange = (index, e) => {
        const newGrades = [...form.grades];
        newGrades[index] = {
            ...newGrades[index],
            [e.target.name]: e.target.value
        };
        setForm(prevForm => ({ ...prevForm, grades: newGrades }));
    };

    const handleRemoveGrade = (indexToRemove) => {
        setForm(prevForm => ({
            ...prevForm,
            grades: prevForm.grades.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleAddAttendance = () => {
        setForm((prevForm) => ({
            ...prevForm,
            attendance: [...prevForm.attendance, { date: new Date().toISOString().split('T')[0], status: 'Present' }] // Pre-fill with current date
        }));
    };

    const handleAttendanceChange = (index, e) => {
        const newAttendance = [...form.attendance];
        newAttendance[index] = {
            ...newAttendance[index],
            [e.target.name]: e.target.value
        };
        setForm((prevForm) => ({ ...prevForm, attendance: newAttendance }));
    };

    const handleRemoveAttendance = (indexToRemove) => {
        setForm(prevForm => ({
            ...prevForm,
            attendance: prevForm.attendance.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleAddRemark = () => {
        setForm(prevForm => ({
            ...prevForm,
            remarks: [...prevForm.remarks, { date: new Date().toISOString().split('T')[0], text: '' }] // Initialize date
        }));
    };

    const handleRemarkChange = (index, e) => {
        const newRemarks = [...form.remarks];
        newRemarks[index] = {
            ...newRemarks[index],
            [e.target.name]: e.target.value
        };
        setForm(prevForm => ({ ...prevForm, remarks: newRemarks }));
    };

    const handleRemoveRemark = (indexToRemove) => {
        setForm(prevForm => ({
            ...prevForm,
            remarks: prevForm.remarks.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.patch(`/student/${id}`, form);
            toast.success('Student updated successfully!');
            navigate('/students');
        } catch (error) {
            console.error('Error updating student:', error);
            toast.error('Failed to update student. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-8 px-4">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-4 sm:mt-6 lg:mt-8 p-4 sm:p-6 lg:p-8 shadow-lg rounded-xl bg-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">Edit Student</h2>
            <form className='space-y-6' onSubmit={handleSubmit}> 

             
                <div className="border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Personal Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="rollno" className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                            <input
                                type="text"
                                id="rollno"
                                name="rollno"
                                value={form.rollno}
                                onChange={handleChange}
                                placeholder="Enter roll number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input
                                type="text"
                                id="className"
                                name="className"
                                value={form.className}
                                onChange={handleChange}
                                placeholder="Enter class name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.contactInfo.phone}
                                onChange={handleContactInfoChange}
                                placeholder="Enter phone number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.contactInfo.email}
                                onChange={handleContactInfoChange}
                                placeholder="Enter email address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Grades Section */}
                <div className="border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Grades</h3>
                    <div className="space-y-4">
                        {form.grades.map((grade, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-2 items-end">
                                <div className="flex-1 w-full">
                                    <label htmlFor={`grade-subject-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id={`grade-subject-${index}`}
                                        name="subject"
                                        value={grade.subject}
                                        onChange={(e) => handleGradeChange(index, e)}
                                        placeholder="Subject"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <div className="flex-none w-full sm:w-24">
                                    <label htmlFor={`grade-score-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Score</label>
                                    <input
                                        type="number"
                                        id={`grade-score-${index}`}
                                        name="score"
                                        value={grade.score}
                                        onChange={(e) => handleGradeChange(index, e)}
                                        placeholder="Score"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveGrade(index)}
                                    className="flex-none bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddGrade}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mt-6 shadow-md text-sm"
                    >
                        + Add Grade
                    </button>
                </div>

                {/* Attendance Section */}
                <div className="border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Attendance</h3>
                    <div className="space-y-4">
                        {form.attendance.map((att, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-2 items-end">
                                <div className="flex-1 w-full">
                                    <label htmlFor={`attendance-date-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                                    <input
                                        type="date"
                                        id={`attendance-date-${index}`}
                                        name="date"
                                        value={att.date}
                                        onChange={(e) => handleAttendanceChange(index, e)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <div className="flex-none w-full sm:w-28">
                                    <label htmlFor={`attendance-status-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                                    <select
                                        id={`attendance-status-${index}`}
                                        name="status"
                                        value={att.status}
                                        onChange={(e) => handleAttendanceChange(index, e)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAttendance(index)}
                                    className="flex-none bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddAttendance}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mt-6 shadow-md text-sm"
                    >
                        + Add Attendance
                    </button>
                </div>

                {/* Remarks Section */}
                <div className="border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Remarks</h3>
                    <div className="space-y-4">
                        {form.remarks.map((remark, index) => (
                            <div key={index} className="flex flex-col gap-2"> 
                                <div>
                                    <label htmlFor={`remark-date-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                                    <input
                                        type="date"
                                        id={`remark-date-${index}`}
                                        name="date"
                                        value={remark.date}
                                        onChange={(e) => handleRemarkChange(index, e)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`remark-text-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                                    <textarea
                                        id={`remark-text-${index}`}
                                        name="text"
                                        value={remark.text}
                                        onChange={(e) => handleRemarkChange(index, e)}
                                        placeholder="Enter remark"
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRemark(index)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm text-sm self-end sm:self-auto" // Align remove button
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddRemark}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mt-6 shadow-md text-sm"
                    >
                        + Add Remark
                    </button>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                    <button
                        type="button"
                        onClick={() => navigate('/students')}
                        className='w-full sm:w-auto bg-gray-500 text-white py-2 px-5 rounded-md font-semibold hover:bg-gray-600 transition duration-300 shadow-md text-base'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className='w-full sm:w-auto bg-blue-600 text-white py-2 px-5 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md text-base'
                    >
                        Update Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;