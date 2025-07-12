
import React from 'react';
import { Outlet } from 'react-router-dom';

const NAVBAR_HEIGHT_REM = '4.5rem';

const MainContent = () => {
  return (
    <div
      className="px-4 md:px-6 md:ml-64 w-full"
      style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT_REM})` }}
    >
      <Outlet />
    </div>
  );
};

export default MainContent;
