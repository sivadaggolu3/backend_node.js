const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

addProduct = async (req, res) => {
  try {
    const { productName, productPrice, category, bestSeller, description } = req.body;

    const image = req.file ? req.file.filename : null;

    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "firm not found" });
    }

    const product = new Product({
      productName, productPrice, category, bestSeller, description, firm: firm._id
    })

    const savedProduct = await product.save();
    if (!firm.product) {
      firm.product = [];
    }

    firm.product.push(savedProduct._id);
    await firm.save();
    return res.status(201).json(savedProduct);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal server error' });
  }

}

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await product.findByIdAndDelete(productId);

    if (!deletedproduct) {
      return res.status(404).json({ error: "No product found" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }

}

module.exports = { addProduct, upload, deleteProductById };