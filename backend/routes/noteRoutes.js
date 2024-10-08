import express from "express";
import notesModel from "../models/notes.model.js";

const noteRoute = express.Router();

// POST request to create a new note
noteRoute.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if a note with the same title and description already exists
    const existingNote = await notesModel.findOne({ title });
    if (existingNote && existingNote.description === description) {
      return res
        .status(409)
        .send("A note with the same title and description already exists.");
    }

    // Create and save the new note
    const newNote = new notesModel({ title, description });
    await newNote.save();

    res.status(201).send({ message: "Note created successfully.", newNote });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "An error occurred while creating the note.",
        error: error.message,
      });
  }
});

// GET request to retrieve all notes
noteRoute.get("/notes", async (req, res) => {
  try {
    // Fetch all notes from the database
    const allNotes = await notesModel.find();

    // Check if there are no notes in the database
    if (allNotes.length === 0) {
      return res
        .status(404)
        .send({ message: "No notes available at the moment." });
    }

    // Return the notes if they are found
    res.status(200).send(allNotes);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while retrieving the notes.",
      error: error.message,
    });
  }
});

// GET request to retrieve a single note by its ID
noteRoute.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await notesModel.findById(id);

    if (!note) {
      return res.status(404).send({ message: "Note not found." });
    }

    res.status(200).send(note);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while retrieving the note.",
      error: error.message,
    });
  }
});

// PUT request to update a note by its ID
noteRoute.put("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    // Find the note by its ID
    const note = await notesModel.findById(id);

    // If note doesn't exist, return 404
    if (!note) {
      return res.status(404).send({ message: "Note not found." });
    }

    // Update the note fields
    note.title = title || note.title;
    note.description = description || note.description;

    // Save the updated note
    await note.save();

    res.status(200).send({ message: "Note updated successfully.", note });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while updating the note.",
      error: error.message,
    });
  }
});

// DELETE request to delete a note by its ID
noteRoute.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Note ID is required." });
    }

    const note = await notesModel.findById(id);
    if (!note) {
      return res.status(404).send({ message: "Note not found." });
    }

    await notesModel.findByIdAndDelete(id);

    res.status(200).send({ message: "Note deleted successfully.", note });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "An error occurred while deleting the note.",
        error: error.message,
      });
  }
});

export default noteRoute;
