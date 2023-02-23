import { Router } from "express";
import { auth } from "../middleware/auth";
import * as drawController from '../controllers/draw/drawController';
const drawRouter = Router();

//draw router
drawRouter.get('/explore',auth,drawController.explore)
drawRouter.post('/create-new-board',auth, drawController.createNewBoard)
drawRouter.get('/get-my-collection',auth, drawController.getMyCollection)


export default drawRouter