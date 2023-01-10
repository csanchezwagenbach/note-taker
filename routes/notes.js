const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require ("../helpers/fsUtils");

//Route describing how get requests to /api/notes will read the data stored in db/db.json and return it to users

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
});

//Route describing how post requests to /api/notes will read the data stored in db/db.json, parse it and push in a new note, then rewrite that data back onto db/db.json.

notes.post("/", (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`New note successfully added`);
    } else {
        res.errored(`Error in adding new note`)
    }
});

//Route describing how delete requests to /api/notes will find the note with the same id as the delete-request, filter through db/db.json and remove the note with the same id as the delete-request, then rewrite that modified data back to db/db.json

notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) =>
            note.id !== noteId);

            writeToFile("./db/db.json", result);

            res.json(`Note with id ${noteId} has been deleted`);
        });
});

module.exports = notes;
