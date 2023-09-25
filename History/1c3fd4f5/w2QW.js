import userDb from '../models/UserModel.js';
import argon2 from 'argon2';

export const registerUser = async(req,res) => {

  const {name, email,password,confPassword} = req.body;

  if(password !== confPassword)
  return res.status(400).json({msg : 'maaf, password tidak sama'})

  try {
    const 
  } catch (error) {
    
  }

}
