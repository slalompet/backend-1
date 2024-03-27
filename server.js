const express = require ("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
const port = process.env.port | 4000;

// Route
app.get("/", (req, res) => {
    res.render("index", {title: "Backend Moment 1!"});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});