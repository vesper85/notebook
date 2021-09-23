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
      res.send(savednote)
    } catch (error) {
      res.status(500).send('error in trycatch block');
    }
  }
);



// ROUTE 3: update a existing note GET "/api/notes/updatenote"   --login required
// the id than is forwaded through endpoint ie."/update/:id" here id refers to the id of the note 
// and not of the user that is stored in the notes object
router.put('/updatenote/:id',fetchuser,[
    body('title', 'Empty fields not allowed').isLength({min:1}),
    body('description', 'Empty fields not allowed').isLength({ min: 3 }),
],async (req,res)=>{
    const {title, description, tag} = req.body;
    //create a new note
    const newNote = {};
    if(title){ newNote.title = title};
    if(description){ newNote.description = description};
    if(tag){ newNote.tag = tag};

    // find the note to be update and update it
    let note = await Notes.findById(req.params.id)
    if(!note){ return res.status(400).send('Not Found')}
    
     // To check if the request is comming from user who is the owner of the note
    // compare the userid stored in the note object to the userid we get from the JSON token
    if(note.user.toString() !== req.user.id ){
        return res.status(400).send("Not Found")
    }
    // to update the note we need to use findIdAndUpdate with the id of the note and not that of the user
    // findByIdAndUpdate ( note_id, dataToBeUpdated, new:true (if note doesnot exit it will create a new note) )
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{ new:true})
    res.json(note)
})



// ROUTE 4: delete a existing note GET "/api/notes/deletenote"   --login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

   
    try {
         // find the note to be deleted using the id of the note that is passed throught the path of the api
    let note =await Notes.findById(req.params.id)

    // display the error if the note doesnot exists
    if(!note){ return res.status(404).send('Not Found')}

    // To check if the request is comming from user who is the owner of the note
    // compare the userid stored in the note object to the userid we get from the JSON token
    if(note.user.toString() !== req.user.id )
    {
        return res.status(401).send("Not Found")
    }
    let delnote = await Notes.findByIdAndDelete(req.params.id)
    res.json({"sucess":'sucess the note has been deleted', delnote:delnote})
    console.log('note deleted');

        
    } catch (err) {
        console.error(err.message)
        res.send(err)
    }


})


module.exports = router;
