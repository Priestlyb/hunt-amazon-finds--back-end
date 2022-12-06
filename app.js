const express = require('express');
const mongoose = require ('mongoose')
const router = require("./routes/book-routes")
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/books", router) // localhost:5000/books


/* Click connect at Database Deployments page */
mongoose.connect(
    "Your Mongo DB connector"
        )
        .then(()=>console.log("Connected to Datebase"))
        .then(() => {
            ;app.listen(process.env.PORT || 3000)
        }).catch((err) =>console.log(err));