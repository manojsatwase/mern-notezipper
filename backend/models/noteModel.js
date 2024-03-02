const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
         type:String,
         required:true
    },
    user:{
        // if i created notes then its going to have 
        // user information okay this user created this note
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },},{
        timestamps:true // timestamps see when the note was created and updated 
    })

    const Note = mongoose.model('Note',noteSchema);

    module.exports = Note;