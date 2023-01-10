// Importing required libraries
const express = require("express");
const path = require("path");
const api = require("./routes/index");

// Establishing port and middleware

const PORT = process.env.PORT || 3001;

const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// Route describing how get requests to the base url will return index.html in the public folder

app.get("/", (req, res) =>
    res.sendFild(path.join(__dirname, "/public/index.html"))
);

// Route describing how get requests to base url/notes will return notes.html in the public folder

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Wildcard route returning 404.html error page for all bad requests to url

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "public/404.html"))
);

// Activating the server at the port established earlier.

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);