const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})



module.exports = mongoose.model('notes',notesSchema)