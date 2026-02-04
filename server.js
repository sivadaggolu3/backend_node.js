const express = require("express");
const vendorRoutes = require('./routes/vendorRoutes');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const app = express();
dotEnv.config();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MANGO_URI)
    .then(() => console.log("mangodb connected succesfully"))
    .catch((error) => console.log(error));
app.use(bodyparser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("welcome to siva app");
});

