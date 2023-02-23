import { Router } from "express";
import { auth } from "../middleware/auth";
import * as authController from '../controllers/auth/authController';
const authRouter = Router();
 
//auth router
authRouter.post('/register',authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/logout',auth,authController.logout);


export default authRouter