
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => { 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('userData');
        console.log("logout");
        navigate('/login');
        if (isSidebarOpen && window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
       
        <nav className='fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg z-50'> 
            <div className='container mx-auto flex justify-between items-center'>
                <div 
                    className="md:hidden flex items-center text-white cursor-pointer mr-4"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                >
                    {isSidebarOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </div>

                <div
                    className='flex items-center text-white text-2xl font-bold rounded-lg transition-transform duration-300'
                >
                    Student Tracker
                </div>

                <div className='hidden md:flex items-center'>
                    <button
                        onClick={handleLogout}
                        className='bg-white text-blue-600 px-5 py-2 rounded-full font-medium shadow-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;