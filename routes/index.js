// This entire page serves as an express router to the notes.js page. This code represents transit and is the url localhost:3001/api, which itself has no endpoints and routes us on to localhost:3001/api/notes, and the routes for those endpoints are described in notes.js.
const express = require("express");

const notesRouter = require("./notes");

const app = express();

app.use("/notes", notesRouter);

module.exports = app;