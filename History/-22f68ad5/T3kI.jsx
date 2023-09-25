import React from 'react';
import Layout from './Layout';

import { useSelector } from 'react-redux';

const reports = useSelector((state) => state.report); // 'report' sesuai dengan nama slice yang Anda gunakan
const Reports = () => {
  return (
    <Layout>
      <div>Reports</div>
    </Layout>
  );
};

export default Reports;
