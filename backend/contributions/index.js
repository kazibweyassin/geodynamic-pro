const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3003;

// MongoDB connection setup
mongoose.connect('mongodb://mongo:27017/contributions', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for contributions
const contributionSchema = new mongoose.Schema({
    user: String,
    content: String,
    location: String
});

const Contribution = mongoose.model('Contribution', contributionSchema);

app.use(express.json());

// Endpoint to submit a contribution
app.post('/contributions', async (req, res) => {
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

// Endpoint to get all contributions
app.get('/contributions', async (req, res) => {
    try {
        const contributions = await Contribution.find();
        res.json(contributions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});

app.listen(PORT, () => {
    console.log(`Contributions service listening on port ${PORT}`);
});
