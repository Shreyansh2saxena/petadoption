import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'username is required']
    },
    city:{
        type:String,
        required:[true, 'city is required']
    },
    age:{
        type:String,
        required:[true,'age is required']
    },
    breed:{
        type:String,
        required:[true,'breed is required']
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        public_id:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // who liked the pet
        }
    ],
},{timestamps:true})

const petModel = mongoose.model('Pet',petSchema);
export default petModel;