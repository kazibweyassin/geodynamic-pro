const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

//serce statis files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.json({location: 'Your Current Location'});
});

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});