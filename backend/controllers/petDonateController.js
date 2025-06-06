import PetDonate from '../models/petDonateModel.js';
import cloudinary from '../utils/cloudinary.js';
import streamifier from 'streamifier';
import nodemailer from 'nodemailer'
import {AdoptionRequestHTML} from '../template/AdoptionRequestHTML.js'

const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_MAIL,       // replace with your email
    pass: process.env.SMPT_PASSWORD           // use app password if using Gmail
  }
});

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

export const sendMailToPetOwner = async (req, res) => {
  const {ownerName, ownerEmail, petName, adopterName, message, adopterEmail } = req.body;
  console.log("Request---->", req.body);
  const ownerFirstName = ownerName.split(' ')[0];
  const emailContent = AdoptionRequestHTML(ownerFirstName, adopterName, adopterEmail, message, petName);
  if (!ownerEmail || !petName || !adopterName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: ownerEmail,
    subject: `Someone wants to adopt ${petName}!`,
    html: emailContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Adoption email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const searchPets =  async (req, res) => {
  try {
    const { city, breed } = req.body;
    console.log(req.body);
    // Build dynamic filter object
    const filter = {};
    if (breed) filter.breed = breed;

    // First, find pets with the given breed (or all if no breed)
    const pets = await PetDonate.find(filter).populate("user");

    // Then filter by user.city if provided
    const filteredPets = city
      ? pets.filter((pet) => pet.user?.city?.toLowerCase() === city.toLowerCase())
      : pets;

    res.status(200).json({ success: true, data: filteredPets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

