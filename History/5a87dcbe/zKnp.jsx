import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ArticleList = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [infoImg1, setInfoImg1] = useState(null);

  const navigate = useNavigate();

  const getPublicArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');

      setArticlesData(response.data);
      response.data.forEach((article) => {
        if (article.img1 && article.img1.data) {
          const buffer = article.img1.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/png',
          });

          const imageUrl1 = URL.createObjectURL(blob);
          article.img1 = imageUrl1;
          setInfoImg1(imageUrl1);
          console.log('ini article image', article.img1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPublicArticles();
  }, [navigate]);

  const Card1 = ({ article }) => {
    return (
      <>
        <div className="lg:flex lg:flex-col lg:justify-between lg:max-h-96 px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-2 md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-0 lg:px-5 lg:pt-0 lg:pb-0 lg:max-w-lg bg-white">
          <img
            className="h-64 sm:h-52 sm:w-full sm:object-cover lg:hidden object-center mt-2 rounded-lg shadow-2xl"
            src={article.img1}
            alt="kecil"
          />
          <h1 className="mt-5 font-bold text-lg lg:mt-1">{article.title}</h1>

          {/* <br /> */}
          <h1 className="text-lg text-gray-600 text-justify line-clamp-6 ">
            summary, Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </h1>
          {/* <br /> */}
          <Link to={"/article/:title"}>
            <button className="mb-2 bg-gray-600 p-3 shadow-2xl rounded-xl text-white font-bold hover:bg-gray-800">
              Read More
            </button>
          </Link>
        </div>

        <div className="hidden relative lg:block max-h-80 lg:col-span-3">
          <img
            className="h-full inset-0 w-full object-cover object-center"
            src={article.img1}
            alt="besarKanan"
          />
        </div>
      </>
    );
  };

  const Card2 = ({ article }) => {
    return (
      <>
        <div className="hidden relative lg:block  lg:col-span-3">
          <img
            className="h-full inset-0 w-full max-h-80 object-cover object-center"
            src={article.img1}
            alt="besarKiri"
          />
        </div>

        <div className="lg:flex lg:flex-col  lg:justify-between lg:max-h-96  px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-2  md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-0 lg:px-5 lg:pt-0 lg:pb-0 lg:max-w-lg bg-white">
          <img
            className="h-64 sm:h-52 sm:w-full sm:object-cover lg:hidden object-center mt-2 rounded-lg shadow-2xl"
            src={article.img1}
            alt="kecil"
          />
          <h1 className="mt-5 font-bold text-lg lg:mt-1">{article.title}</h1>

          <br />
          <h1 className="text-lg text-gray-600 text-justify line-clamp-6 ">
            summary, Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </h1>
          <br />
          <button className="mb-2 bg-gray-600 p-3 shadow-2xl rounded-xl text-white font-bold hover:bg-gray-800">
            Read More
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-3/5">
          {/* {articlesData.map((article, index) => (
            <div>
            // mapping
            {index % 2 === 0 ? (<Card1 article= {article}/>) :( <Card2 article={article}/>)}
            </div>
          ))} */}

          {articlesData.map((article, index) => (
            <div className="sm:mb-10 lg:grid lg:grid-cols-5 md:grid-cols-none md:bg-none bg-none lg:bg-white lg:h-80 lg:max-w-5xl">
              {index % 2 === 0 ? (
                <Card1 article={article} />
              ) : (
                <Card2 article={article} />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <img src={infoImg1}/> */}
    </>
  );
};

export default ArticleList;
