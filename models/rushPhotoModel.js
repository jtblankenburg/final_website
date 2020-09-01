const mongoose = require('mongoose');

const rushPhotoSchema = new mongoose.Schema({
    name: String,
    position: Number,
    rushPage: {
        type: mongoose.Schema.ObjectId,
        ref: 'rushPage',
        require: [true, 'rush photos must belong to a rush page']
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

rushPhotoSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'rushPage'
    });
    next();
});

const RushPhoto = mongoose.model('RushPhoto', rushPhotoSchema);

module.exports = RushPhoto;