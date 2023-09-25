// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Editor from './../../Editor';

const ArticleCreateForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [imgFilesOne, setImgFilesOne] = useState(null);
  const [imgFilesTwo, setImgFilesTwo] = useState(null);
  const [imgFilesThree, setImgFilesThree] = useState(null);

  const [userData, setUserData] = useState('');

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

  return (
    <div className="max-w-4xl mx-auto p-5 bg-slate-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Buat Artikel Baru</h2>
      <form onSubmit={articleCreate}>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2">
            <label className="block mb-1">Judul Artikel</label>
            <input
              className="bg-blue-100 w-full"
              type="text"
              placeholder={'Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Cover Artikel</label>
            <input
              type="file"
              onChange={(e) => {
                setImgFilesOne(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <br />
        <div className="mb-4">
          <label className="block mb-1">Ringkasan Artikel</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={summary}
            rows="5"
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Isi Artikel</label>
          <Editor value={content} onChange={(value) => setContent(value)} />
        </div>

        <br />
        <button>
          <a
            href="#_"
            class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Button Text
            </span>
          </a>
        </button>

        {/* hmmm */}
      </form>
    </div>
  );
};

export default ArticleCreateForm;
