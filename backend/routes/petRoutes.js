// routes/petRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import { createPet, getAllPets } from '../controllers/petController.js';

const router = express.Router();

router.post('/addPet/:userId', upload.single('image'), createPet);
router.get('/getAllPets/:userId', getAllPets);

export default router;
