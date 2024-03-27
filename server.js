const express = require ("express");
const app = express();
const port = process.env.port | 4000;

//routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});