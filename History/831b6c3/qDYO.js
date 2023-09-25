import userDb from '../models/UserModel.js';

export const verifyUser = async (req, res, next) => {
  if (!req.session.temporarySessionUuid) {
    return res.status(401).json({ msg: 'mohon login terlebih dahulu' });
  }

  const findUser = await userDb.findone({
    where: { uuid: req.session.temporarySessionUuid },
  });

  if (!findUser) return res.status(404).json({ msg: 'user tidak ditemukan' });
  req.userId = findUser.id;
  req.role = findUser.role;
  next();
};
