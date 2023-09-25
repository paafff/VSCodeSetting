import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="bg-gray-800 min-h-screen">
        <Navbar />
        <div className="h-full">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
