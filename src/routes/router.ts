import { Router } from "express";
import { auth } from "../middleware/auth";
import * as authController from '../controllers/auth/authController';
const router = Router();
 
//auth router
router.post('/register',authController.register);
router.post('/login', authController.login);
router.post('/logout',authController.logout);


export default router