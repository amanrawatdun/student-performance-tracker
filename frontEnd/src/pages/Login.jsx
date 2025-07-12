import React, { useState } from 'react';
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'; 
const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
           
            if (res.data.userData) {
                sessionStorage.setItem('userData', JSON.stringify(res.data.userData));
            }
            toast.success("Login successful!");
            navigate('/dashboards'); 
        } catch (error) {
            
            const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
            console.error('Login error:', error); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-md w-full mx-auto p-6 sm:p-8 md:p-10 bg-white shadow-xl rounded-lg"> 
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Log in to your account to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6"> 
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
                        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={loading} 
                    >
                        {loading ? 'Logging In...' : 'Log In'} 
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-700">
                    <p>Don't have an account?</p>
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium text-lg mt-2 inline-block">
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;