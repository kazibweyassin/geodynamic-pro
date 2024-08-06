const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const userRoutes = require('./routes/users');  

const contentRoutes = require('./routes/content');
const poiRoutes = require('./routes/poi');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// ...
app.use('api/users', userRoutes);
app.use('api/content', contentRoutes);
app.use('api/poi', poiRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
