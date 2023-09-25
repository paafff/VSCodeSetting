import React from 'react';
import Layout from './Layout';
import ArticleCreateForm from '../components/ArticleCreateForm';
import LoginForm from '../components/LoginForm';

const ArticleCreate = () => {
  return (
    <Layout>
      {/* <LoginForm /> */}
      <br />
      <ArticleCreateForm />
    </Layout>
  );
};

export default ArticleCreate;
