const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema ({ 
    days: { type: String,
    required: true
},
opening: String,
closing: String,
closed: {
    type: Boolean,
    required: true
}
});

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const locationSchema = new mongoose.Schema({
    name: { type: String,
    required: true 
},
    address: String,
    rating: { type: Number,
    'default': 0,
    min: 0,
    max: 5
},
    facilities: [String],
    // Nikhitha used this Schema
    // coords: {
    //     type: [Number],
    //     index: '2dsphere'
    //   },
    coords: {
        type: { type: String },
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
 });
 locationSchema.index({coords: '2dsphere'}); //longitude (valid values(-180, 180)) latitude (valid values(-90, 90))

 mongoose.model('Location', locationSchema);