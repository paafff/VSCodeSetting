import userDb from '../models/UserModel.js';
import argon2 from 'argon2';

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
  const findUser = await userDb.findOne({
    where: { email: req.body.email },
    attributes: ['uuid', 'name', 'email', 'role'],
  });
  if (!findUser) return res.status(404).json({ msg: 'user tidak ditemukan' });

  //
  const matchPassword = await argon2.verify(
    findUser.password,
    req.body.password
  );
  if (!matchPassword)
    return res.status(400).json({ msg: 'maaf, password salah' });

  //
  req.session.temporarySessionUuid = findUser.uuid;
  // const name = findUser.name;
  // const email = findUser.email;
  // const role = findUser.role;

  res.status(200).json(findUser);
};

//tujuan ini reducer untuk mempersingkat pemanggilan setiap user pada setiap page/component
export const getMe = async (req, res) => {
  if (!req.session.temporarySessionUuid) {
    return res.status(401).json({ msg: 'harap login dulu...' });
  }

  const findUser = await userDb.findOne({
    where: { uuid: req.session.temporarySessionUuid },
    attributes: ['id', 'uuid', 'name', 'email', 'role'],
  });

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
