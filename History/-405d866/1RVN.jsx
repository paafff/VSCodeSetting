import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className="flex flex-row w-10/12 justify-center">
        <div className=' justify-center'>
          <div className="">
            <GetMeCard />
          </div>
          <div className="w-full">
            <ArticleByTitle />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailArticle;
