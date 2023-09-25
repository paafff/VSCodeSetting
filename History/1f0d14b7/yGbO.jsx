import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="bg-gray-800 h-full">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
