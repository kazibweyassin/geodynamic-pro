const express = require('express');
const router = express.Router();
const Contribution = require('../models/contribution');

router.post('/', async (req, res) => {
    const { user, content, location } = req.body;

    if (!user || !content || !location) {
        return res.status(400).json({ error: 'User, content, and location are required' });
    }

    try {
        const newContribution = new Contribution({ user, content, location });
        await newContribution.save();
        res.status(201).json(newContribution);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contribution' });
    }

});


router.get('/', async (req, res) => {
    try {
        const contributions = await Contribution.find();
        res.json(contributions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});


module.exports = router;
