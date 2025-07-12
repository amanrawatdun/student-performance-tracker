import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const AddStudent = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        rollno: '',
        className: '',
        contactInfo: {
            phone: '',
            email: ''
        }
    });
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/student', form);
            toast.success('Student added successfully!');
            navigate('/students');
            console.log('Student added successfully');
        } catch (error) {
            toast.error('Failed to add student. Please try again.');
            console.error('Error adding student:', error); 
        }
    };

    return (
        <div className='max-w-md mx-auto mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-6 md:p-8 shadow-xl rounded-xl bg-white'>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Add New Student</h2> 
            <form onSubmit={handleSubmit} className='space-y-5'> 

                {/* Personal Information Group */}
                <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Personal Details</h3>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
                                placeholder="Enter class (e.g., 10A)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information Group */}
                <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4"> 
                    <button
                        type="button" 
                        onClick={() => navigate('/students')}
                        className="w-full sm:w-auto bg-gray-500 text-white py-2 px-5 rounded-md font-semibold hover:bg-gray-600 transition duration-300 shadow-md text-base"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white py-2 px-5 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md text-base"
                    >
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;