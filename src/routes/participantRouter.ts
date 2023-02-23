import { Router } from "express";
import { auth } from "../middleware/auth";
import * as participantsController from '../controllers/participants/participantsController'
const participantRouter = Router();

//participants router
participantRouter.get('/get-invitation',auth, participantsController.getInvitation)

export default participantRouter