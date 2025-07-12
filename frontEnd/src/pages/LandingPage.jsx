import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-3xl rounded-3xl p-8 sm:p-12 lg:p-16 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-center leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800 animate-fade-in-down">
          Elevate Academic Excellence
        </h1>

        <p className="text-lg sm:text-xl text-center mb-10 max-w-2xl mx-auto text-gray-700 animate-fade-in delay-200">
          Seamlessly track student performance, manage classes, and gain powerful insights
          with our intuitive and comprehensive Student Performance Tracker. Empowering
          educators for a brighter future.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-700 to-purple-800 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 animate-fade-in-up delay-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login Securely</span>
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 border-2 border-purple-700 text-purple-800 font-bold rounded-full hover:bg-purple-700 hover:text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 animate-fade-in-up delay-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-6.14 0-10 3.5-10 7h20c0-3.5-3.86-7-10-7z" />
            </svg>
            <span>Get Started Free</span>
          </Link>
        </div>

        <p className="text-center text-gray-600 text-base sm:text-lg animate-fade-in delay-600">
          Join a growing community dedicated to <strong>optimizing student potential</strong>.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
