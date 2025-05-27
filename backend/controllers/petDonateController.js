import PetDonate from '../models/petDonateModel.js';
import cloudinary from '../utils/cloudinary.js';
import streamifier from 'streamifier';

export const donatePet = async (req, res) => {
  try {
    const { name, age, breed, type, ownerName, email } = req.body;
    const {userId} = req.params;
    if(!userId){
        res.status(400).json({message:'Provide userId', success:false});
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'pet_donations' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadResult = await streamUpload(req.file.buffer);

    const newPet = new PetDonate({
      user:userId,
      name,
      age,
      breed,
      type,
      ownerName,
      email,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      }
    });

    await newPet.save();

    res.status(201).json({ message: 'Pet donated successfully', pet: newPet });
  } catch (error) {
    console.error('Error donating pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDonatedPets = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('userIdd-->', userId);
    if (!userId) {
      return res.status(400).json({ message: 'Provide userId', success: false });
    }
    const pets = await PetDonate.find({ user: userId })

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: 'No pet donations found for this user', success: false });
    }

    res.status(200).json({
      message: 'Pet donations retrieved successfully',
      success: true,
      pets,
    });
  } catch (error) {
    console.error('Error retrieving pet donations:', error);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
};

export const getOtherDonatedPets = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'Provide userId', success: false });
    }
    const pets = await PetDonate.find({ user: { $ne: userId } })
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: 'No pets found from other users', success: false });
    }
    res.status(200).json({
      message: 'Pets from other users retrieved successfully',
      success: true,
      pets,
    });
  } catch (error) {
    console.error('Error retrieving other users\' pets:', error);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
};