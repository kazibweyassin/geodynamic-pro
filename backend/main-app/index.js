// backend/contributions/index.js
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');

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

        // Broadcast new contribution to WebSocket clients
        if (wsServer) {
            wsServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newContribution));
                }
            });
        }

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

// WebSocket server setup
const wsServer = new WebSocket.Server({ noServer: true });
app.server = app.listen(PORT, () => {
    console.log(`Contributions service listening on port ${PORT}`);
});

// Handle WebSocket upgrade requests
app.server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
});

wsServer.on('connection', ws => {
    console.log('WebSocket connection established');
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', wsClients: wsServer.clients.size });
});


