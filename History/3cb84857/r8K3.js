import userDb from '../models/UserModel.js';
// import { userDb } from "../models/UserProductModel.js";
import argon2 from 'argon2';

export const registerUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: 'maaf, password tidak sama...' });

  try {
    const findUser = await userDb.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(400).json({ msg: 'maaf, email sudah digunakan...' });
    }

    const hashPassword = await argon2.hash(password);

    await userDb.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.status(201).json({ msg: 'registrasi berhasil...' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  // const {email,password} = req.body;
  // const findUser = await userDb.findOne({
  //     email: email,
  //   });

  const findUser = await userDb.findOne({
    where: { email: req.body.email },
  });

  if (!findUser)
    return res.status(404).json({ msg: 'user tidak ditemukan...' });

  const matchPassword = await argon2.verify(
    findUser.password,
    req.body.password
  );
  if (!matchPassword)
    return res.status(400).json({ msg: 'maaf, password salah...' });

  req.session.temporarySessionUuid = findUser.uuid;
  // req.session.temporarySessionId = findUser.id;
  const uuid = findUser.uuid;
  const id = findUser.id;
  const name = findUser.name;
  const email = findUser.email;
  const address = findUser.address;
  const phone = findUser.phone;
  const gender = findUser.gender;
  const role = findUser.role;
  const image = findUser.image;

  // console.log(req.session.temporarySessionUuid);
  res
    .status(200)
    .json({ id, uuid, name, email, address, phone, gender, role, image });
};

//tujuan ini reducer untuk mempersingkat pemanggilan setiap user pada setiap page/component
export const getMe = async (req, res) => {
  if (!req.session.temporarySessionUuid) {
    return res.status(401).json({ msg: 'harap login dulu...' });
  }

  const findUser = await userDb.findOne({
    where: { uuid: req.session.temporarySessionUuid },
    attributes: [
      'id',
      'uuid',
      'name',
      'email',
      'phone',
      'address',
      'gender',
      'role',
      'image',
    ],
  });
  // .select("id uuid name email address image phone gender role ");

  res.status(200).json(findUser);
  if (!findUser)
    return res.status(404).json({ msg: 'maaf, user tidak ditemukan' });
};

export const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: 'logout error' });
    res.status(200).json({ msg: 'logout berhasil...' });
  });
};
