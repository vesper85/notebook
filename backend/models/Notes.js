const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
    },
    description:{
        type:String,
        unique:true,
    },
    tag:{
        type:String,
        default:'general'
    },
    date:{
        type:Date,
        default:Date.now
    }
})



module.exports = mongoose.model('notes',notesSchema)