const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();


app.get("/", (req, res) => {
    res.send("Microservice okay ")
});

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur ok sur ${PORT}`);
});