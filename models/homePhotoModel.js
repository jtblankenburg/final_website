const mongoose = require('mongoose');

const homePhotoSchema = new mongoose.Schema({
    name: String,
    position: Number,
    homePage: {
        type: mongoose.Schema.ObjectId,
        ref: 'homePage',
        required: [true, 'home photos must belong to a home page!']
    }
    
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

homePhotoSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'homePage'
    });
    next();
});

const HomePhoto = mongoose.model('HomePhoto', homePhotoSchema);

module.exports = HomePhoto;