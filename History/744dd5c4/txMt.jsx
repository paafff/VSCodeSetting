// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const ArticleByTitle = () => {

//   // State untuk menyimpan data artikel dari backend
//   const [articleData, setArticleData] = useState({
//     title: '',
//     summary: '',
//     content: '',
//     // Jika Anda mengambil gambar dari backend, Anda dapat menambahkan tiga properti berikut:
//     image1: null,
//     image2: null,
//     image3: null,
//   });
//   const [articleDataImg, setArticleDataImg] = useState();

//   const navigate = useNavigate();
//   const { title } = useParams();

//   useEffect(() => {
//     const getArticleByTitle = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/articles/${title}`
//         );
//         // const datas = response.data;

//         console.log(articleData.summary);

//         setArticleData({
//           title: response.data.title,
//           summary: response.data.summary,
//           content: response.data.content,
//           // image1: response.data.img1,
//           // image2: response.data.img2,
//           // image3: response.data.img3,
//         });
//         //=======================================================
//         // const imgBuffer1 = response.data.img1.data;
//         // const imgBuffer2 = response.data.img2.data;
//         // const imgBuffer3 = response.data.img3.data;
//         // const blob1 = new Blob([new Uint8Array(imgBuffer1)], {
//         //   type: 'image/png',
//         // });
//         // const blob2 = new Blob([new Uint8Array(imgBuffer2)], {
//         //   type: 'image/png',
//         // });
//         // const blob3 = new Blob([new Uint8Array(imgBuffer3)], {
//         //   type: 'image/png',
//         // });

//         // const imgUrl1 = URL.createObjectURL(blob1);
//         // const imgUrl2 = URL.createObjectURL(blob2);
//         // const imgUrl3 = URL.createObjectURL(blob3);

//         // setArticleData({
//         //   image1: imgUrl1,
//         //   image2: imgUrl2,
//         //   image3: imgUrl3,
//         // });

//         //=======================================================
//         // Inisialisasi objek untuk menyimpan gambar
//         const imageUrls = {};

//         // Loop untuk mengambil setiap gambar dari respons
//         for (let i = 1; i <= 3; i++) {
//           const imgBuffer = response.data[`img${i}`].data;
//           const blob = new Blob([new Uint8Array(imgBuffer)], {
//             type: 'image/png',
//           });
//           const imgUrl = URL.createObjectURL(blob);
//           imageUrls[`image${i}`] = imgUrl;
//         }

//         // Menetapkan semua URL gambar ke state
//         setArticleData(imageUrls);
//       } catch (error) {
//         alert(error.response.data.msg);
//       }
//     };
//     getArticleByTitle();
//   }, []);

//   return (
//     <div>

//       {/* //////////////// */}
//       <div>
//         {/* <img src={articleDataImg} /> */}
//         <img src={articleData.image1} />
//         <img src={articleData.image2} />
//         <img src={articleData.image3} />
//       </div>
//       <div>
//         <h1>{articleData.summary}</h1>
//       </div>
//     </div>
//   );
// };

// export default ArticleByTitle;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleByTitle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    summary: '',
    content: '',
    images: [], // Menyimpan URL gambar dalam array
  });

  const [currentIndex, setCurrentIndex] = useState(0); // Indeks gambar saat ini
  const navigate = useNavigate();
  const { title } = useParams();

  useEffect(() => {
    const getArticleByTitle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/articles/${title}`
        );

        // Inisialisasi objek untuk menyimpan gambar
        const imageUrls = [];

        // Loop untuk mengambil setiap gambar dari respons
        for (let i = 1; i <= 3; i++) {
          const imgBuffer = response.data[`img${i}`].data;
          const blob = new Blob([new Uint8Array(imgBuffer)], {
            type: 'image/png',
          });
          const imgUrl = URL.createObjectURL(blob);
          imageUrls.push(imgUrl);
        }

        setArticleData({
          title: response.data.title,
          summary: response.data.summary,
          content: response.data.content,
          images: imageUrls, // Menetapkan URL gambar ke dalam array
        });
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    getArticleByTitle();
  }, [title]);

  const goNext = () => {
    // Memastikan currentIndex tidak melewati batas maksimum gambar
    setCurrentIndex((prevIndex) =>
      prevIndex === articleData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goPrev = () => {
    // Memastikan currentIndex tidak kurang dari 0
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articleData.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="relative max-w-6xl w-full h-96 flex flex-row justify-center bg-blue-300">
        <button
          onClick={goPrev}
          className="  transform h-10 place-self-center bg-white bg-opacity-50 p-2 rounded-full"
        >
          &lt;
        </button>
        <div className="flex w-3/5 justify-center">
          <img
            src={articleData.images[currentIndex]}
            alt="Article Image"
            className="object-cover object-center place-self-center max-h-96 "
          />
        </div>
        <button
          onClick={goNext}
          className="  transform h-10 place-self-center bg-white bg-opacity-50 p-2 rounded-full"
        >
          >
        </button>
      </div>
      <div>
        <h1>{articleData.summary}</h1>
      </div>
    </div>
  );
};

export default ArticleByTitle;
