const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors=require("cors");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8000;


mongoose.set("bufferCommands", false);

async function startServer() {
  try {
    await mongoose.connect(process.env.MANGO_URI);
    console.log("MongoDB connected successfully");

    app.use(bodyParser.json());

    app.use('/vendor', vendorRoutes);
    app.use('/firm', firmRoutes);
    app.use('/product', productRoutes);
    app.use('/uploads', express.static('uploads'));

    app.get('/', (req, res) => {
      res.send("welcome to siva app");
    });

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection FAILED ❌", error);
    process.exit(1); // stop server if DB fails
  }
}

startServer();
