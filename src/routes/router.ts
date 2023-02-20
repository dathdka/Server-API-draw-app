import { Router } from "express";
import { auth } from "../middleware/auth";
import * as authController from '../controllers/auth/authController';
import * as drawController from '../controllers/draw/drawController';
import * as participantsController from '../controllers/participants/participantsController'
const router = Router();
 
//auth router
router.post('/register',authController.register);
router.post('/login', authController.login);
router.get('/logout',auth,authController.logout);

//draw router
router.get('/explore',auth,drawController.explore)
router.post('/create-new-board',auth, drawController.createNewBoard)
router.get('/get-my-collection',auth, drawController.getMyCollection)

//participants router
router.get('/get-invitation',auth, participantsController.getInvitation)

export default router