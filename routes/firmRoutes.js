const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();
const path = require('path');

router.post('/add-firm', verifyToken, firmController.upload.single('image'), firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId',verifyToken,firmController.deleteFirmById);
module.exports = router;