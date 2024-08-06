const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number]
    },
    categories: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Poi = mongoose.model('Poi', poiSchema);
module.exports = Poi;
