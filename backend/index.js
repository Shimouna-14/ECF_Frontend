const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const recipesRoutes = require('./routes/recipesRoutes.js');
const filtresRoutes = require('./routes/filtresRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", recipesRoutes);
app.use("/filtres", filtresRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));
