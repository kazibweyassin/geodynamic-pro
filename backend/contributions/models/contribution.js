const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
    user: String,
    content: String,
    location: String
});

module.exports = mongoose.model('Contribution', contributionSchema);
