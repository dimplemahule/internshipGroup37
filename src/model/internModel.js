const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name:{
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email is required',
        unique: true,
    },
    mobile:{
        type: Number,
        trim: true,
        required: 'Mobile No. is required',
        unique: true,
    },
    collegeId:{ 
        type: ObjectId, 
        ref: 'college'
    },

    isDeleted: {
        type: Boolean, 
        default: false
    }

},{timestamps:true})
module.exports = mongoose.model("intern", internSchema)