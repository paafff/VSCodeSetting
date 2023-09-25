import { articleDb, articleImgDb } from '../models/ArticleModel.js';
import sharp from 'sharp';
import multer from 'multer';

// const upload = multer().single('imgFilesOne');
const upload = multer().fields([
  { name: 'imgFilesOne', maxCount: 1 },
  { name: 'imgFilesTwo', maxCount: 1 },
  { name: 'imgFilesThree', maxCount: 1 },
]);

export const createArticle = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf,terjadi kesalahan dalam unggahan file' });
    }

    const { name, email, title, content, summary } = req.body;

    try {
      // const imgFilesOne = req.file
      //   ? await sharp(req.file.buffer[0]).png().toBuffer()
      //   : undefined;
      // const imgFilesTwo = req.file
      //   ? await sharp(req.file.buffer[1]).png().toBuffer()
      //   : undefined;
      // const imgFilesThree = req.file
      //   ? await sharp(req.file.buffer[2]).png().toBuffer()
      //   : undefined;

      const imgFilesOne = req.files['imgFilesOne']
        ? await sharp(req.files['imgFilesOne'][0].buffer)
            .png()
            .resize({ width: 1920, height: 1080, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesTwo = req.files['imgFilesTwo']
        ? await sharp(req.files['imgFilesTwo'][0].buffer)
            .png()
            .resize({ width: 1920, height: 1080, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesThree = req.files['imgFilesThree']
        ? await sharp(req.files['imgFilesThree'][0].buffer)
            .png()
            .resize({ width: 1920, height: 1080, fit: 'inside' })
            .toBuffer()
        : undefined;

      await articleImgDb.create({
        userId: req.userId,
        title: title,
        img1: imgFilesOne,
        img2: imgFilesTwo,
        img3: imgFilesThree,

        // img2: imgFilesTwo
        //   ? await sharp(imgFilesTwo).png().toBuffer()
        //   : undefined,
        // img3: imgFilesThree
        //   ? await sharp(imgFilesThree).png().toBuffer()
        //   : undefined,
      });

      await articleDb.create({
        name: name,
        email: email,
        userId: req.userId,
        title: title,
        content: content,
        summary: summary,
      });

      res.status(200).json({ msg: 'artikel sukses dibuat bang' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

//perlu perbaikan nang
export const updateArticle = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf terjadi kesalahan pada unggahan file' });
    }

    try {
      const filterArticle = { title: req.params.title, userId: req.userId };

      const { title, content, summary } = req.body;

      //penanganan image(misal ada yang kosong)
      let imgFilesOne, imgFilesTwo, imgFilesThree;
      if (req.files) {
        imgFilesOne = req.files['imgFilesOne']
          ? await sharp(req.files['imgFilesOne'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;

        imgFilesTwo = req.files['imgFilesTwo']
          ? await sharp(req.files['imgFilesTwo'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;

        imgFilesThree = req.files['imgFilesThree']
          ? await sharp(req.files['imgFilesThree'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;
      }
      // const { imgFilesOne, imgFilesTwo, imgFilesThree } = req.file || {};

      await articleDb.update(
        {
          title: title,
          content: content,
          summary: summary,
        },
        { where: filterArticle }
      );

      await articleImgDb.update(
        {
          title: title,
          img1: imgFilesOne || undefined,
          img2: imgFilesTwo || undefined,
          img3: imgFilesThree || undefined,
        },
        { where: filterArticle }
      );

      res.status(200).json({ msg: 'artikel sukses diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

export const getArticleByTitle = async (req, res) => {
  try {
    const findArticle = await articleDb.findOne({
      where: { title: req.params.title },
      attributes: ['title', 'content', 'summary', 'name', 'email'],
    });
    const findArticleImg = await articleImgDb.findOne({
      where: { title: req.params.title },
      attributes: ['img1', 'img2', 'img3'],
    });

    //digabungkan isi data array nya dengan spread operator
    const articleData = {
      ...findArticle.toJSON(),
      ...findArticleImg.toJSON(),
    };

    if (!findArticle)
      return res.status(404).json({ msg: 'article tidak ditemukan' });

    res.status(200).json(articleData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getArticleImgByTitle = async (req, res) => {
//   try {
//     const findArticleImg = await articleImgDb.findOne({
//       where: { title: req.params.title },
//       attributes: ['img1', 'img2', 'img3'],
//     });

//     res.status(200).json(findArticleImg);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const getArticleByTitle = async (req, res) => {
//   try {
//     const findArticle = await articleDb.findOne({
//       where: { title: req.params.title },
//       attributes: ['title', 'content', 'summary', 'name', 'email'],
//     });

//     res.status(200).json(findArticle);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const getArticles = async (req, res) => {
//   try {
//     const findArticle = await articleDb.findAll({
//       attributes: ['name', 'title', 'content', 'summary', 'email'],
//     });

//     const findArticleImg = await articleImgDb.findAll({
//       attributes: ['img1', 'img2', 'img3'],
//     });

//     // const articleData = {
//     //   ...findArticle.toJSON(),
//     //   ...findArticleImg.toJSON(),
//     // };

//     const articleData = findArticles.map((article, index) => {
//       return {
//         ...article.toJSON(),
//         ...findArticleImgs[index].toJSON(),
//       };
//     });

//     res.status(200).json(articleData);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getArticles = async (req, res) => {
  try {
    const findArticle = await articleDb.findAll({
      attributes: ['name', 'title', 'content', 'summary', 'email'],
    });

    const findArticleImg = await articleImgDb.findAll({
      attributes: ['img1', 'img2', 'img3'],
    });

    //ingat, mapping parameter fungsi di awal adalah hasil/isi dari object yang sedang di mapping
    //misalnya berikut isi findArticleFunc = findArticle
    const articleData = findArticle.map((findArticleFunc, index) => {
      return {
        ...findArticleFunc.toJSON(),
        ...findArticleImg[index].toJSON(),
      };

      // const articleObj = findArticleFunc.toJSON();
      // const imgObj = findArticleImg[index].toJSON();

      // // Periksa apakah img1, img2, img3 ada atau tidak
      // if (imgObj.img1) {
      //   articleObj.img1 = imgObj.img1;
      // }
      // if (imgObj.img2) {
      //   articleObj.img2 = imgObj.img2;
      // }
      // if (imgObj.img3) {
      //   articleObj.img3 = imgObj.img3;
      // }

      // return articleObj;
    });

    res.status(200).json(articleData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
