const mongoose = require('mongoose');
const slugify = require('slugify');

const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Events must have a title!'],
    },
    caption: {
        type: String,
        required: false,
        trim: true
    },
    slug: String,
    semester: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    coverPhoto: String
    
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

//Virtual Populate
eventsSchema.virtual('specificEvents', {
    ref: 'specificEvent',
    foreignField: 'event',
    localField: '_id'
});

eventsSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Event = mongoose.model('Event',eventsSchema);

module.exports = Event;