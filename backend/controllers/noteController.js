const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');

// get request
const getNotes = asyncHandler(async (req, res) => {
  try {
    // Find notes belonging to the user with req.user._id
    const notes = await Note.find({ user: req.user._id });
   if (!notes || notes?.length === 0) {
    return res.status(200).json([]); // Return an empty array if no notes are found
  }
    res.status(200).json(notes); // Changed status code to 200 for success
  } catch (error) {
    res.status(404);
    throw new Error('Error occurred while fetching notes');
  }
});

// post request
const createNote = asyncHandler(async(req, res) => {
  const { title, content, category } = req.body;

  // Check if any required field is missing
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    try {
      // Create a new note using the create method
      const createdNote = await Note.create({
        user: req.user._id,
        title,
        content,
        category
      });

      res.status(201).json(createdNote);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to create note");
    }
  }
});

// post create single note
const getSingleNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note); // Send the found note as response
  } else {
    res.status(404).json({
      message: "Note not found"
    });
  }
});

// get update note

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
   
  // Update the note directly in the database and get the updated document
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content, category },
    { new: true, runValidators: true } // To return the updated document and run validators
  );
  // Check if the note exists and the user owns it
  if (!updatedNote || updatedNote.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action or note not found");
  }

  // Send the updated note as response
  res.json(updatedNote);
});


// delete request detele note

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the note by ID and check if the current user owns it
  const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

  // If note is not found or user doesn't own it, throw error
  if (!note) {
    res.status(404);
    throw new Error("Note not found or you don't have permission to delete it");
  }

  // Send success response
  res.json({ message: "Note deleted successfully" });
});


module.exports = {
    getNotes,
    createNote,
    getSingleNoteById,
    updateNote,
    deleteNote
}


// const updateNote = asyncHandler(async (req, res) => {
//   const { title, content, category } = req.body;

//   // Find the note by ID
//   const note = await Note.findById(req.params.id);

//   // Check if the note exists
//   if (!note) {
//     res.status(404);
//     throw new Error("Note not found");
//   }

//   // Check if the current user owns the note
//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   // Update the note with new data
//   note.title = title;
//   note.content = content;
//   note.category = category;

//   // Save the updated note
//   const updatedNote = await note.save();

//   // Send the updated note as response
//   res.json(updatedNote);
// });



// old way 

// const createNote = asyncHandler(async(req,res)=>{
//   const {title,content,category} = req.body;

//   if(!title || !content || category){
//     res.status(400);
//     throw new Error("Please Fill all the Fields");
//   }else{
//     // create new variable note
//     const note = new Note({user:req.user._id,title,content,category});

//     const createNote = await note.save();
   
//     res.status(201).json(createNote);
//   }
// })

// const deleteNote = asyncHandler(async(req,res)=> {
//   const note = await Note.findById(req.params.id);

//   if(note.user.toString() !== req.user._id.toString()){
//     res.status(401);
//     throw new Error("You can't perform this action")
//   }
// if(note){
//   await note.remove();
//   res.json({message:"Note Removed"})
// }else{
//   res.status(401);
//     throw new Error("You can't perform this action")
// }
// })
