const express = require('express');
const router = express.Router();
const User = require('../models/users');

// User registration
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, location, preferences } = req.body;

        const newUser = new User({
            email,
            password,
            name,
            location,
            preferences
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Implement user authentication logic (e.g., compare passwords)
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Get user profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
});


// Update user profile
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({
            error: 'Error updating user profile'
        });
    }
});
// ... other user endpoints
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, content, location, categories } = req.body;
        const newContent = new Content({
            title,
            description,
            content,
            location,
            categories,
            author: req.user.id
        });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(400).json({ error: 'Error creating content' });
    }
});

router.get('/', async (req, res) => {
    try {
        const content = await Content.find();
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching content' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching content' });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description, location, categories } = req.body;
        const newPoi = new Poi({
            name,
            description,
            location,
            categories,
            user: req.user.id
        });
        const savedPoi = await newPoi.save();
        res.status(201).json(savedPoi);
    } catch (error) {
        res.status(400).json({ error: 'Error creating point of interest' });
    }
});

router.get('/nearby/:coordinates', async (req, res) => {
    try {
        const { coordinates } = req.params;
        const [longitude, latitude] = coordinates.split(',');
        const pointsOfInterest = await Poi.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 10000 // Adjust distance as needed
                }
            }
        });
        res.json(pointsOfInterest);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching nearby points of interest' });
    }
});




module.exports = router;
