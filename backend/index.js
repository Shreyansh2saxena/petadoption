import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import petRoutes from './routes/petRoutes.js'
import cors from 'cors'
dotenv.config()
connectDB();

const app = express() 
app.use(express.json())
app.use(cors('*'));
app.use('/api/user', userRoutes);
app.use('/api/pet',petRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
    
})