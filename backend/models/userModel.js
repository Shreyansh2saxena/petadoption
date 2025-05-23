import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    city:{
        type: String,
        default:"Lucknow"
    },
    bio:{
        type: String,
        default: "Pet Lover"
    },
    profilePic:{
        url:{
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        },
        public_id:String,
    }
},{timestamps:true})

const userModel = mongoose.model('User',userSchema);
export default userModel;