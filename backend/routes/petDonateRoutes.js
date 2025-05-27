import express from 'express';
import upload from '../middleware/multer.js';
import { donatePet, getDonatedPets, getOtherDonatedPets } from '../controllers/petDonateController.js';

const router = express.Router();

router.post('/:userId', upload.single('image'), donatePet);
router.get('/donatedPet/:userId', getDonatedPets);
router.get('/adoptablePets/:userId', getOtherDonatedPets)

export default router;
