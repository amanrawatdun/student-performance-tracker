import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { signup } from '../services/auth'; 
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            await signup(form);
            toast.success("Signup successful! Please log in.");
            navigate('/login'); 
        } catch (error) {
           
            const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
            toast.error(errorMessage);
            console.error("Signup error:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-md w-full mx-auto p-6 sm:p-8 md:p-10 bg-white shadow-xl rounded-lg"> 
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Create Account
                </h2>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Join us to manage your students effectively.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6"> 
                    <div>
                        <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="e.g., +1234567890"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'} 
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-700">
                    <p>Already have an account?</p>
                    <Link to="/login" className="text-blue-600 hover:underline font-medium text-lg mt-2 inline-block">
                        Log In Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;