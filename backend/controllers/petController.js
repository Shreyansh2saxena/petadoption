// controllers/petController.js
import cloudinary from '../utils/cloudinary.js';
import Pet from '../models/petModel.js';
import streamifier from 'streamifier';

export const createPet = async (req, res) => {
  try {
    const { name, city, age, breed, description } = req.body;
    const {userId} = req.params;
    console.log('userId--->', userId);
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // Upload buffer to Cloudinary using stream
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'pets' }, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const pet = new Pet({
      name,
      city,
      age,
      breed,
      description,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      user:userId
    });

    await pet.save();

    res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      pet,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Cloudinary upload failed', error });
  }
};

export const getAllPets = async(req, res) => {
  const {userId} = req.params;
  try {
    const pets = await Pet.find({user:userId}).sort({createdAt:-1});
    if(pets.length > 0){
      return res.status(200).json({pets, message:"All Pets List", success:true});
    }else{
      return res.status(404).json({message:"No Pets Found", success:false});
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error, message:"Internal Server Error", success:false});
  }
}