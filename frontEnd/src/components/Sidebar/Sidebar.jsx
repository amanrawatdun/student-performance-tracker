import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiStudentBold } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEmail, MdSpaceDashboard } from "react-icons/md";
import { FaHandPaper } from "react-icons/fa";
import API from '../../services/api';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const NAVBAR_HEIGHT_REM = '4.5rem';
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await API.get('/teacher');
        setEmail(res.data.email);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchTeacher();
  }, []);

  const navItemClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg mx-2 my-1 transition-colors duration-200 
     ${isActive ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-100'}
     ${isOpen ? '' : 'justify-center'}`;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`
        fixed top-[${NAVBAR_HEIGHT_REM}] left-0 z-50
        bg-white shadow-lg transition-transform duration-300 ease-in-out
        h-[calc(100vh-4.5rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
        md:translate-x-0 md:w-64
      `}
    >
      <nav className="flex flex-col justify-between h-full py-4">
        <div className={`${isOpen ? '' : 'hidden md:block'}`}>
          <NavLink to="/dashboards" className={navItemClasses} onClick={handleLinkClick}>
            <MdSpaceDashboard className="text-xl" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/students" className={navItemClasses} onClick={handleLinkClick}>
            <PiStudentBold className="text-xl" />
            <span>Students</span>
          </NavLink>
          <NavLink to="/attendance" className={navItemClasses} onClick={handleLinkClick}>
            <FaHandPaper className="text-xl" />
            <span>Attendance</span>
          </NavLink>
          <NavLink to="/settings" className={navItemClasses} onClick={handleLinkClick}>
            <IoSettingsSharp className="text-xl" />
            <span>Settings</span>
          </NavLink>
        </div>

        <div className={`mx-2 text-center text-gray-700 ${isOpen ? '' : 'hidden md:block'}`}>
          <div className="flex flex-col items-center">
            <MdEmail className="text-xl mb-1" />
            <span className="text-sm font-medium break-all">{email}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
