import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="">
        <Navbar />
        <div className="bg-slate-200 min-h-screen">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
