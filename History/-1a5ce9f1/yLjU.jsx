import React from 'react';
import Layout from './Layout';
import ArticleCreateForm from '../components/ArticleCreateForm';
import LoginForm from '../components/LoginForm';

const CreateArticle = () => {
  return (
    <Layout>
      <LoginForm />
      <br />
      <ArticleCreateForm />
    </Layout>
  );
};

export default CreateArticle;
