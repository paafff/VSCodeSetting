import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/Auth.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logoutUser);

export default authRouter;
