import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className="flex flex-row max-w-4/5 justify-center">
        <div>
          <GetMeCard />
        </div>
        <div>
          <ArticleByTitle />
        </div>
      </div>
    </Layout>
  );
};

export default DetailArticle;
