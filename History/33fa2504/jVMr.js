import argon2 from "argon2";
import userDb from "../models/UserModel.js";
import sharp from "sharp";
import multer from "multer";
// import { userDb } from "../models/UserProductModel.js";

// disini
const upload = multer().single("image");

export const getAllUsers = async (req, res) => {
  try {
    const response = await userDb
      .find()
      .select("-_id uuid name email phone address gender role image");
    //dibawah ini opsi jika tidak ingin menyertakan field _id
    // .select("_id uuid name email phone address gender role");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await userDb
      .findOne({ uuid: req.params.uuid })
      .select("-_id uuid name email phone address gender image role");
    //dibawah ini opsi jika tidak ingin menyertakan field _id
    // .select("-_id uuid name email phone address gender role");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const editUserData = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "Terjadi kesalahan dalam unggahan file" });
    }

    try {
      const findUser = await userDb.findOne({ uuid: req.params.uuid });

      if (!findUser) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      const { name, email, address, phone, gender } = req.body;

      const updatedData = {
        name: name || findUser.name,
        email: email || findUser.email,
        address: address || findUser.address,
        phone: phone || findUser.phone,
        gender: gender || findUser.gender,
        image: req.file
          ? await sharp(req.file.buffer)
              .jpeg()
              .resize({
                width: 400,
                height: 400,
                fit: "inside",
              })
              .toBuffer()
          : undefined,
      };

      await userDb.findOneAndUpdate({ uuid: req.params.uuid }, updatedData, {
        new: true,
      });
      res.status(200).json({ msg: "Data berhasil diperbarui" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const editUserPassword = async (req, res) => {
  //   dibawah ini hanya sebuah opsi
  //   const findUser = await userDb.findOne({ uuid: req.params.uuid });
  //   if (!findUser) return res.status(404).json({ msg: "user tidak ditemukan" });

  const { password, confPassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = userDb.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: "maaf, password tidak sama..." });
  }
  try {
    await userDb.updateOne(
      { uuid: req.params.uuid },
      {
        password: hashPassword,
      }
    );
    res.status(200).json({ msg: "password berhasil diubah" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  //   dibawah ini hanya sebuah opsi
  //   const findUser = await userDb.findOne({
  //     uuid: req.params.uuid,
  //   });
  //   if (!findUser) return res.status(404).json({ msg: "user tidak ditemukan" });

  try {
    await userDb.deleteOne({
      uuid: req.params.uuid,
    });
    res.status(200).json({ msg: "user sukses dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
