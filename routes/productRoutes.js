const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/add-product/:firmId', productController.upload.single('image'), productController.addProduct);

router.get('/uploads/:imageName', (req, res) => {
     const imageName = req.params.imageName;
     res.setHeader('content-Type', 'image/jpeg');
     res.sendFile(Path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:productId', productController.deleteProductById);
module.exports = router;