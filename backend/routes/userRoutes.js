import express from 'express';
import upload from '../middleware/multer.js';


import { loginController, signUpController, getUserDetails, updateUserController } from "../controllers/userController.js";
const router = express.Router()
router.post('/signup', signUpController)
router.post('/login', loginController)
router.get('/userDetails/:userId', getUserDetails)
router.put('/updateUser/:userId', upload.single('image'), updateUserController)
export default router;