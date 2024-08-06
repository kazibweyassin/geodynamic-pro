const express = require('express');
const router = express.Router();
const Content = require('../models/content');

// Create content
router.post('/', async (req, res) => {
    // ...
});

// Get all content
router.get('/', async (req, res) => {
    // ...
});

// Get specific content
router.get('/:id', async (req, res) => {
    // ...
});

// ... other content endpoints

module.exports = router;
