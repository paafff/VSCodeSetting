import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className="flex flex-row w-full justify-center">
        {/* <div className=" w-full"> */}
        <div className="w-2/5">
          <GetMeCard />
        </div>
        <div className="w-3/5">
          <ArticleByTitle />
        </div>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default DetailArticle;
