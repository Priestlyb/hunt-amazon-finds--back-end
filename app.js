const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const router = require("./routes/product-routes");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "https://huntamazonfinds.vercel.app", // https://huntamazonfinds.vercel.app , http://localhost:3000
    credentials: true,
  })
);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/products", router); // localhost:5000/books

/* Click connect at Database Deployments page */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => console.log(err));
