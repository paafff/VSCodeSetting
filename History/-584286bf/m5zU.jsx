import React from 'react';
import Layout from './Layout';
import ArticleEditForm from '../components/ArticleEditForm';
import LoginForm from '../components/LoginForm';

const EditArticle = () => {
  return (
    <Layout>
      <LoginForm />
      <br />
      <ArticleEditForm />
    </Layout>
  );
};

export default EditArticle;
