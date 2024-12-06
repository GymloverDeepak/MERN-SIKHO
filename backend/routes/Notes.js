const express = require('express');
const router = express.Router();
const fetchDetails = require('../middleware/FetchUser');
const mongoose = require('mongoose');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Get notes
router.get('/fetchallnotes', fetchDetails, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Add notes
router.post(
    '/addnote',
    fetchDetails,
    [
        body("description", "Description must be at least 5 characters long").isLength({ min: 5 }),
        body("title", "Title must be at least 3 characters long").isLength({ min: 3 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag ,author } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title,
                description,
                tag,author,
                user: req.user.id,
            });

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// Update note
router.put(
    '/updatenote/:id',
    fetchDetails,
    async (req, res) => {
        try {
            const { title, description, tag, author } = req.body;

            // Create a newNote object with updated fields
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;
            if (author) newNote.author = author;

            // Find the note by ID
            let note = await Notes.findById(req.params.id);

            // Check if note exists
            if (!note) {
                return res.status(404).send("Note not found");
            }

            // Verify if the user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send(" चल भाग तू किसी और की नोट अपडेट कर रहा हे ");
            }

            // Update the note
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );

            res.json(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


// delete note
router.delete(
    '/deletenote/:id',
    fetchDetails,
    async (req, res) => {
        try {
            // Validate if the ID is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).send("Invalid Note ID");
            }

            // Find the note by ID
            let note = await Notes.findById(req.params.id);

            // Check if the note exists
            if (!note) {
                return res.status(404).send("Note not found");
            }

            // Verify if the user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("चल भाग तू किसी और की नोट डिलीट कर रहा हे ");
            }

            // Delete the note
            await Notes.findByIdAndDelete(req.params.id);

            res.json({ success: "Note has been deleted successfully" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);





module.exports = router;
