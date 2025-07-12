import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Settings = () => {
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const fetchTeacher = async () => {
        try {
            setLoading(true);
            const res = await API.get('/teacher');
            setTeacher(res.data);
            setFormData({
                firstName: res.data.firstName || '',
                lastName: res.data.lastName || '',
                email: res.data.email || '',
                phone: res.data.phone || '',
            });
        } catch (err) {
            toast.error('Failed to fetch teacher details.');
            console.error('Fetch teacher error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await API.put('/teacher/update', formData);
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error('Profile update failed. Please try again.');
            console.error('Update teacher error:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        try {
            await API.delete('/teacher/delete');
            localStorage.removeItem('token');
            sessionStorage.removeItem('userData');
            toast.success('Account deleted successfully!');
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to delete account. Please try again.';
            toast.error(errorMessage);
            console.error('Delete account error:', err);
        } finally {
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-8 px-4">
                <Loader />
            </div>
        );
    }

    if (!teacher) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)] p-4">
                <p className="text-xl text-gray-600 text-center">No teacher data found. Please log in.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="ml-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-4 sm:mt-6 lg:mt-8 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">Settings</h2>

            <form onSubmit={handleUpdate} className="space-y-5 sm:space-y-6 mb-8">
                <div>
                    <label htmlFor="firstName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={updating}
                >
                    {updating ? 'Updating...' : 'Update Profile'}
                </button>
            </form>

            <div className="border border-red-200 p-4 sm:p-6 rounded-lg bg-red-50 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">Danger Zone</h3>
                <p className="text-gray-700 mb-6">
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                    onClick={handleDeleteClick}
                    className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold text-base hover:bg-red-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    disabled={deleting}
                >
                    {deleting ? 'Deleting...' : 'Delete Account'}
                </button>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
                        <h3 className="text-xl font-bold text-red-700 mb-4">Confirm Account Deletion</h3>
                        <p className="text-gray-700 mb-6">
                            Are you absolutely sure you want to delete your account? This action is irreversible.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300 font-medium"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-300 font-semibold"
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
