const {Client} = require('pg');
require("dotenv").config();

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

client.query (`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses (
        courseId SERIAL PRIMARY KEY,
        courseCode VARCHAR(50) NOT NULL,
        courseName VARCHAR(255) NOT NULL,
        syllabus VARCHAR(255) NOT NULL,
        progression VARCHAR(1) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);