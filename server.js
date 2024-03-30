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
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Start the server

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});