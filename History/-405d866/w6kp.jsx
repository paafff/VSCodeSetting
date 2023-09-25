import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className='flex flex-row'> 

      <GetMeCard />
      <ArticleByTitle />
      </div>
    </Layout>
  );
};

export default DetailArticle;
