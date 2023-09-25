import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ppSaya from '../assets/ppSaya.png';

const ArticleCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imgFiles, setImgFiles] = useState([null, null, null]);
  const [imgFilesOne, setImgFilesOne] = useState(null);
  const [imgFilesTwo, setImgFilesTwo] = useState(null);
  const [imgFilesThree, setImgFilesThree] = useState(null);

  const [userData, setUserData] = useState('');

  const navigate = useNavigate();

  // const handleFileChangeOne = (e) => {
  //   // const files = Array.from(e.target.files);
  //   // setImgFiles(files);
  //   setImgFilesOne(e.target.files);
  // };
  // const handleFileChangeTwo = (e) => {
  //   // const files = Array.from(e.target.files);
  //   // setImgFiles(files);
  //   setImgFilesTwo(e.target.files);
  // };
  // const handleFileChangeThree = (e) => {
  //   // const files = Array.from(e.target.files);
  //   // setImgFiles(files);

  //   setImgFilesThree(e.target.files);
  // };

  // const handleInputChange = (index, e) => {
  //   const newImgFiles = [...imgFiles];
  //   // newImgFiles[index] = e.target.files[0];
  //   // setImgFiles(newImgFiles);
  //   newImgFiles[index] = e.target.files[0];
  //   setImgFilesOne(newImgFiles);
  //   newImgFiles[index] = e.target.files[1];
  //   setImgFilesTwo(newImgFiles);
  //   newImgFiles[index] = e.target.files[2];
  //   setImgFilesThree(newImgFiles);

  //   // setImgFilesTwo(imgFiles[1]);
  //   // setImgFilesThree(imgFiles[2]);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Lakukan pengiriman data ke backend di sini
  //   // articleCreateForm();
  //   console.log('Data yang akan dikirim:', {
  //     title: title,
  //     content: content,
  //     summary: summary,
  //     name: userData.name,
  //     email: userData.email,
  //     imgfiles: imgFiles,
  //     imgFilesOne: imgFilesOne,
  //     imgFilesTwo: imgFilesTwo,
  //     imgFilesThree: imgFilesThree,
  //   });
  // };

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
        imgFilesOne: imgFilesOne || ppSaya,
        imgFilesTwo: imgFilesTwo || ppSaya,
        imgFilesThree: imgFilesThree || ppSaya,
      });
      console.log(formArticleData);
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
        <p>nama : {userData.name}</p>
        <p>email : {userData.email}</p>
        <p>role : {userData.role}</p>
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
              onChange={(e) => (setSummary ? e.target.value : ppSaya)}
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
                setImgFilesOne(e.target.files[0]);
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesTwo(e.target.files[0]);
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesThree(e.target.files[0]);
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

export default ArticleCreateForm;
