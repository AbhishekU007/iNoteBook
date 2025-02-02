const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator'); 

// ROUTE 1 : Get all the notes using : GET "api/notes/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'some server error occured'});
    }

})

// ROUTE 2 : Add a New note using : POST "api/notes/addnote"

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({min: 3}), // Name should be between 3 and 15 characters
    body('description', 'Description must be at least 5 characters long').isLength(
        {min: 5}
    )
], async (req, res) => { 

    try {
        const {title, description, tag} = req.body;

        //If there are error Return Bad request along with the error
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()}); 
        }

        const note = new Note({title, description, tag, user: req.user.id})

        const savedNote = await note.save();

        res.json(savedNote); // Calling saved notes
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'some server error occured'});
    }
})

// ROUTE 3 : UPDATE an existing note using : PUT "api/notes/updatenote/:id"  {Thunder client ki API request me ":id" ki jgh actual id daalna }

router.put('/updatenote/:id', fetchuser,async (req, res) => { 
    
    try {
        const { title , description , tag } = req.body;
    // create a 'NewNote' object.
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description}; 
    if(tag){newNote.tag = tag };

    //Find the note to be updated and then update it.
    let note = await Note.findById(req.params.id);
    if(!note){ res.status(404).send("Not Found !")}
    
    if(note.user.toString() !== req.user.id ){
        return res.status(401).send("Not Allowed !");
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote} ,{ new : true});
    res.json({note});
      }
  catch (error) {
    console.error(error.message);
    res.status(500).json({error: 'some server error occured'});
   }
})

// ROUTE 4 : DELETE an existing note using : DELETE "api/notes/deletenote/:id"

router.delete('/deletenote/:id', fetchuser,async (req, res) => { 
    
    try {
    let note = await Note.findById(req.params.id);
    if(!note){ res.status(404).send("Not Found !")}
    
    if(note.user.toString() !== req.user.id ){
        return res.status(401).send("Not Allowed !");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success : Note has been deleted !" : note });

} catch (error) {
    console.error(error.message);
    res.status(500).json({error: 'some server error occured'});
   
    }
})

module.exports = router   