const express = require('express');
const { getNotes,createNote,getSingleNoteById,updateNote,deleteNote } = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
// passing thorugh this protect routes
router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote);
// get the perticular note then updated the note and then delete then note
router.route('/:id').get(protect,getSingleNoteById).put(protect,updateNote).delete(protect,deleteNote)

module.exports = router;