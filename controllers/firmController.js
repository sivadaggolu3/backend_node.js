const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Path2D.extname(file.originalname));
  }
});

const upload = multer({ storage });


addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : null;

    const vendor = await Vendor.findById(req.vendorId);

    const firm = new Firm({
      firmName, area, category, region, offer, vendor: vendor._id
    })

    const savedFirm = await firm.save();
    if (!vendor.firm) {
      vendor.firm = [];
    }

    vendor.firm.push(savedFirm._id);
    await vendor.save();



    return res.status(200).json({ message: 'firm added succesfully' })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }

}

 deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const deletedProduct = await product.findByIdAndDelete(firmId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }

}

module.exports = { addFirm, upload,deleteFirmById};