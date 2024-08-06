const express = require('express');
const router = express.Router();
const Poi = require('../models/Poi');

// Create point of interest
router.post('/', async (req, res) => {
  // ...
});

// Get nearby points of interest
router.get('/nearby/:coordinates', async (req, res) => {
  // ...
});

// ... other poi endpoints

module.exports = router;
