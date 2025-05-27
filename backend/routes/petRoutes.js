// routes/petRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import { createPet, getAllPets, getUserFeed, toggleLikePet } from '../controllers/petController.js';

const router = express.Router();

router.post('/addPet/:userId', upload.single('image'), createPet);
router.get('/getAllPets/:userId', getAllPets);
router.get('/feed/:userId', getUserFeed );
router.post('/like/:petId', toggleLikePet);

export default router;
