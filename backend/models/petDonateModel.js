import mongoose from 'mongoose';

const petDonateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ownerName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  image: {
    url:{
        type:String
    },
    public_id:{
        type:String
    }
  },
}, {timestamps:true});

const PetDonate = mongoose.model('PetDonate', petDonateSchema);
export default PetDonate;