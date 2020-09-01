const mongoose = require('mongoose');
const slugify = require('slugify');

const specificEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Events must have a title!'],
    },
    caption: {
        type: String,
        required: false,
        trim: true
    },
    specificSlug: String,
    semester: {
        type: String
    },
    year: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    coverPhoto: String,
    photos: [String],
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: [true, 'This event must belong to a specific collection of events']
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});


specificEventSchema.pre('save', function(next) {
    this.specificSlug = slugify(this.title, { lower: true });
    next();
});

specificEventSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'event',
        select: 'title coverPhoto slug'
    });
    next();
});

specificEventSchema.virtual('specificEventPhotos', {
    ref: 'specificEventPhoto',
    foreignField: 'specificEvent',
    localField: '_id'
});

const specificEvent = mongoose.model('specificEvent',specificEventSchema);

module.exports = specificEvent;