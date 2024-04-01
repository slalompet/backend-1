const { Client } = require("pg");
const express = require ("express");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Connect to the database
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning: ", + err);
    } else {
        console.log("Ansluten till databasen!");
    }
});

// Route
app.get("/", async(req, res) => {

    // read date from the database
    client.query("select * from courses", (err, result) => {
        if (err) {
            console.log("Fel vid db-fråga");
        } else {
            res.render("index", {courses: result.rows});
        }
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/course", (req, res) => {
    res.render("course");
});

app.post("/course", async(req, res) => {
    const courseCode = req.body.code;
    const courseName = req.body.name;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;

    //SQL query
    const result = await client.query("insert into courses (courseCode, courseName, syllabus, progression) values ($1, $2, $3, $4) returning *", 
    [courseCode, courseName, syllabus, progression]);

    res.redirect("course");
});

// Start the server

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});