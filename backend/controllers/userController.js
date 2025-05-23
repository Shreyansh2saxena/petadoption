import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import cloudinary from '../utils/cloudinary.js';
import streamifier from 'streamifier';



export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Provide all credentials" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name 
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const signUpController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "New user created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  const {userId} = req.params;
  console.log('User id--->', userId);
  if(!userId) return res.status(400).json({message:"Please Provide userId", success:false});
  try {
    const user = await User.findById(userId).select('-password');
    console.log('user--->', user);
    if(user){
      return res.status(200).json({message:"User Details", success:true, user})
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const updateUserController = async (req, res) => {
  try {
    const { name, city, bio } = req.body;
    console.log('Request body-->', req.body);
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let updateFields = { name, city, bio };

    if (req.file) {
      if (user.profilePic?.public_id) {
        await cloudinary.uploader.destroy(user.profilePic.public_id);
      }

      const uploadStreamToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "user_profiles" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const uploadResult = await uploadStreamToCloudinary(req.file.buffer);
      updateFields.profilePic = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
