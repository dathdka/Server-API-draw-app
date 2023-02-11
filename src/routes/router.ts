import { Router } from "express";
import { auth } from "../middleware/auth";
import * as authController from '../controllers/auth/authController';
import * as drawController from '../controllers/draw/drawController';
const router = Router();
 
//auth router
router.post('/register',authController.register);
router.post('/login', authController.login);
router.get('/logout',auth,authController.logout);

//draw router
router.get('/explore',auth,drawController.explore)
router.post('/create-new-board',auth, drawController.createNewBoard)
export default router