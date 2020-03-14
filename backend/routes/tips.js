const express = require('express');
const multer = require('multer');
const TipController = require('../controllers/tip');

const Tip = require('../models/tip');

const checkAuth = require('../middleware/check-auth');

const extractFile = require('../middleware/file');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

// Create a tip
router.post('', extractFile, TipController.createTip);

// Get array of tips for tip list
router.get('', TipController.getTipList);

// Get single tip for tip edit
router.get('/:id', TipController.getSingleTip);

// Update a tip
// router.put('/:id', checkAuth, extractFile, TipController.updateTip);

// Delete a tip
router.delete('/:id', TipController.deleteTip);

module.exports = router;
