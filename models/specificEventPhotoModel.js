const mongoose = require('mongoose');

const specificEventPhotoSchema = new mongoose.Schema({
    name: String,
    specificEvent: {
        type: mongoose.Schema.ObjectId,
        ref: 'specificEvent',
        required: [true, 'specific event photos must belong to a specific Event']
    }
    
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

specificEventPhotoSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'specificEvent'
    });
    next();
});

const specificEventPhoto = mongoose.model('specificEventPhoto', specificEventPhotoSchema);

module.exports = specificEventPhoto;