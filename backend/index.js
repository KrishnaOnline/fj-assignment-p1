const express = require("express");
const app = express();
const dbConnect = require("./config/db.js");

const userRoutes = require("./routes/user.js");
const movieRoutes = require("./routes/movie.js");
const actorRoutes = require("./routes/actor.js");
const producerRoutes = require("./routes/producer.js");

dbConnect();

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/actors", actorRoutes);
app.use("/api/v1/producers", producerRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Server is Up and Running"
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is Running at: http://localhost:"+PORT);
});