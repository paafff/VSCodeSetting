import userDb from "../models/UserModel.js";
// import { userDb } from "../models/UserProductModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.temporarySessionUuid) {
    return res.status(401).json({ msg: "Mohon login terlebih dahulu" });
  }

  const findUser = await userDb.findOne({
    uuid: req.session.temporarySessionUuid,
  });

  if (!findUser) return res.status(404).json({ msg: "user tidak ditemukan" });
  req.user_id = findUser._id;
  req.role = findUser.role;
  next();
};

export const verifyAdmin = async (req, res, next) => {
  const findAdmin = await userDb.findOne({
    uuid: req.session.temporarySessionUuid,
  });

  if (!findAdmin) return res.status(404).json({ msg: "admin tidak ditemukan" });
  if (findAdmin.role !== "admin")
    return res.status(403).json({ msg: "akses tidak sah" });
  next();
};
