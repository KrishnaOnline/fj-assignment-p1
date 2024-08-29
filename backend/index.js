const express = require("express");
const app = express();
const dbConnect = require("./config/db.js");

app.use(express.json());
dbConnect();

app.get("/", (req, res) => {
    res.json({
        message: "Server is Up and Running"
    });
})

app.listen(5000, () => {
    console.log("Server is Running at: http://localhost:5000/");
});