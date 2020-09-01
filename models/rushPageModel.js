const mongoose = require('mongoose');

const rushPageSchema = new mongoose.Schema({
    headingOne: String,
    paragraphOne: String,
    paragraphTwo: String,
    headingTwo: String,
    paragraphThree: String,
    headingThree: String,
    ifcURL: String,
    slug: {
        type: String,
        default: 'Rush'
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

rushPageSchema.virtual('rushPagePhotos', {
    ref: 'RushPhoto',
    foreignField: 'rushPage',
    localField: '_id'
});

const rushPage = mongoose.model('rushPage', rushPageSchema);

module.exports = rushPage;