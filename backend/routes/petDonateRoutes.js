import express from 'express';
import upload from '../middleware/multer.js';
import { donatePet, getDonatedPets, getOtherDonatedPets, sendMailToPetOwner, searchPets } from '../controllers/petDonateController.js';

const router = express.Router();

router.post('/pet/:userId', upload.single('image'), donatePet);
router.get('/donatedPet/:userId', getDonatedPets);
router.get('/adoptablePets/:userId', getOtherDonatedPets)
router.post('/send-adoption-mail', sendMailToPetOwner)
router.post('/search-pet', searchPets)

export default router;
