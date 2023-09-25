import React from 'react';
import Layout from './Layout';

import { useSelector } from 'react-redux';

const Reports = () => {
  const reports = useSelector((state) => state.report); // 'report' sesuai dengan nama slice yang Anda gunakan

  console.log('Data Laporan:', reports);
  return (
    <Layout>
      <div>Reports</div>
    </Layout>
  );
};

export default Reports;
