import userDb from '../models/UserModel.js';
import argon2, { hash } from 'argon2';

export const registerUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  if (password !== confPassword)
    return res.status(400).json({ msg: 'maaf, password tidak sama' });

  try {
    //
    const findUser = await userDb.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(400).json({ msg: 'maaf,email sudah digunakan' });
    }

    const hashPassword = await argon2.hash(password);
    await userDb.create({ name: name, email: email, password: hashPassword });
    res.status(201).json({ msg: 'registrasi berhasil' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  const findUser = await userDb.findOne({ where: { email: req.body.email } });
  if (!findUser) return res.status(404).json({ msg: 'user tidak ditemukan' });

  //
  const matchPassword = await argon2.verify(
    findUser.password,
    req.body.password
  );
  if (!matchPassword)
    return res.status(400).json({ msg: 'maaf, password salah' });

  //
  req.ses
};
