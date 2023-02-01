import { Router } from "express";
const {getAllItem} = require("../controllers/getAllItem")
const router = Router();
 
router.get('/items',getAllItem)  

export default router