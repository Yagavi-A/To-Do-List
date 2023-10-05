import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uID : {
        type: String,
        unique: true,
        required: true
    },
    uName: {
        type: String,
        required: true
    },
    uEmail: {
        type: String,
        unique: true,
        required: true
    },
    uPassword: {
        type: String,
        required: true
    },
    uToken:{
        type:String
    }
})

const User = mongoose.model('User', userSchema)

export { User }