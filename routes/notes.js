const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require ("../helpers/fsUtils");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
});

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

module.exports = notes;
