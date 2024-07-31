const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;

// Example endpoint to get weather updates
app.get('/weather', async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        // Replace with actual weather API endpoint and key
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: location, // City name
                appid: 'e32ef9af7093256d26953a5cbcd48238', // Replace with your actual API key
                units: 'metric' // Optional: For temperature in Celsius
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Weather service listening on port ${PORT}`);
});
