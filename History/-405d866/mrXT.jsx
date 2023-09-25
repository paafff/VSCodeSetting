import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className="flex flex-row w-full justify-center">
        {/* <div className=" w-full"> */}
        <div className="max-w-xs">
          <GetMeCard />
        </div>
        <div className="w-full">
          <ArticleByTitle />
        </div>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default DetailArticle;
