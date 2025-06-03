const express = require('express');
const mongoose = require ('mongoose')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const router = require("./routes/product-routes")
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors({
  origin: 'https://huntamazonfinds.vercel.app',  // https://huntamazonfinds.vercel.app , http://localhost:3000
  credentials: true, 
}));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/products", router) // localhost:5000/books


/* Click connect at Database Deployments page */
mongoose.connect(
    "mongodb+srv://mernApp:p%40ssw0rd%279%27%21@mernbookstore.iwzp06a.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(()=>console.log("Connected to Datebase"))
        .then(() => {
            app.listen(process.env.PORT || 5001);
        }).catch((err) =>console.log(err));