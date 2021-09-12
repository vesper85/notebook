const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');




// ROUTE 1: fetch all notes using GET "/api/notes/fetchallnotes"   --login required
// using ID fetch all the notes of the user in the database
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("some error occured")
    }
});




// ROUTE 2: add note using POST "/api/notes/addnote"   --login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Empty fields not allowed').isLength({min:1}),
    body('description', 'Empty fields not allowed').isLength({ min: 3 }),
  ],
  async (req, res) => {
      const {title, description, tag} = req.body;
    //code to display the errors in the res body
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.error(error.message)
      return res.status(400).send('some errors');
    }
    //using try catch block to catch errors
    try {
        // creating notes using .create and clg them
      const note =  new Notes({
          // this is the id of the user to which the note belong to dont confuse it with id in database
        user:req.user.id,
        title: title,
        description: description,
        tag: tag,
      });
      const savednote = await note.save()
      res.json(savednote)
    } catch (error) {
      res.status(500).send('error in trycatch block');
    }
  }
);

module.exports = router;
