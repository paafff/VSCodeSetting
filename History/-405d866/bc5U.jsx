import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <GetMeCard />
      <ArticleByTitle />
    </Layout>
  );
};

export default DetailArticle;
