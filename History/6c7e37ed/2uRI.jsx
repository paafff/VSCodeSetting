// import React from 'react'

// const ArticleEditForm = () => {
//   return (
//     <div>ArticleEditForm</div>
//   )
// }

// export default ArticleEditForm

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ppSaya from '../assets/ppSaya.png';

const ArticleEditForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imgFiles, setImgFiles] = useState({ ppSaya });
  const [imgFilesOne, setImgFilesOne] = useState(null);
  const [imgFilesTwo, setImgFilesTwo] = useState(null);
  const [imgFilesThree, setImgFilesThree] = useState(null);

  const [userData, setUserData] = useState('');

  const navigate = useNavigate();

  const articleCreate = async (e) => {
    e.preventDefault();

    console.log(imgFilesOne, imgFilesTwo, imgFilesThree);

    try {
      const formArticleData = new FormData();
      formArticleData.append('title', title);
      formArticleData.append('content', content);
      formArticleData.append('summary', summary);
      formArticleData.append('name', userData.name);
      formArticleData.append('email', userData.email);

      formArticleData.append('imgFilesOne', imgFilesOne);
      formArticleData.append('imgFilesTwo', imgFilesTwo);
      formArticleData.append('imgFilesThree', imgFilesThree);

      // Append imgFilesOne, imgFilesTwo, imgFilesThree if they exist, otherwise, use ppSaya
      // if (imgFilesOne) {
      //   formArticleData.append('imgFilesOne', imgFilesOne);
      // } else {
      //   formArticleData.append('imgFilesOne', ppSaya);
      // }

      // if (imgFilesTwo) {
      //   formArticleData.append('imgFilesTwo', imgFilesTwo);
      // } else {
      //   formArticleData.append('imgFilesTwo', ppSaya);
      // }

      // if (imgFilesThree) {
      //   formArticleData.append('imgFilesThree', imgFilesThree);
      // } else {
      //   formArticleData.append('imgFilesThree', ppSaya);
      // }

      await axios.post(
        'http://localhost:5000/article/create',
        formArticleData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // navigate('/');
      console.log('Data yang akan dikirim:', {
        title: title,
        content: content,
        summary: summary,
        name: userData.name,
        email: userData.email,
        imgFilesOne: imgFilesOne,
        imgFilesTwo: imgFilesTwo,
        imgFilesThree: imgFilesThree,
      });
      console.log(formArticleData);
      // console.log(imgKosong);
      console.log(imgFilesOne);
      console.log('artikel sukses dibuat');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  const getMe = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getme');

      setUserData(response.data);
    } catch (error) {
      //dibawah ini opsi tampilkan error
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  // const handleFileChangeOne = (e) => {
  //   setImgFilesOne(e.target.files[0]);
  // };

  return (
    <>
      <div>
        <button
          // onClick={getMe}
          className="mb-3 inline-block max-w-md rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          style={{
            background:
              'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
          }}
        >
          dibawah ini useefect
        </button>
        <p>nama : {userData ? userData.name : ''} </p>
        <p>email : {userData ? userData.name : ''}</p>
        <p>role : {userData ? userData.name : ''}</p>
      </div>
      <div className="max-w-4xl mx-auto p-5 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Buat Artikel Baru</h2>
        <form onSubmit={articleCreate}>
          <div className="mb-4">
            <label className="block mb-1">Judul Artikel</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Konten Artikel</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={content}
              rows="40"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ringkasan Artikel</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={summary}
              rows="10"
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block mb-1">Penulis Artikel</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email Penulis</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}

          {/* upload gambar */}
          <div className="mb-4">
            <label className="block mb-1">Gambar Artikel </label>

            <input
              type="file"
              className="w-full"
              name="imgFilesOne"
              accept="image/*"
              // onChange={handleFileChangeOne}
              onChange={(e) => {
                setImgFilesOne(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesTwo(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesThree(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
          </div>
          {/* upload gambar */}

          {/* upload gambar */}
          {/* <div className="mb-4">
            <label className="block mb-1">Gambar Artikel </label>
            {imgFiles.map((imgFile, index) => (
              <input
                key={index}
                type="file"
                className="w-full"
                accept="image/*"
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            ))}
          </div> */}
          {/* upload gambar */}

          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buat Artikel
          </button>
        </form>
      </div>
    </>
  );
};

export default ArticleEditForm;
