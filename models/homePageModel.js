const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
    carouselPhotos: [String],
    rushHeading: String,
    rushParagraph: String,
    aboutHeading: String,
    aboutParagraph: String,
    userOneTitle: String,
    userTwoTitle: String,
    userOne: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Must link a user']
    },
    userTwo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Must link a second user']
    },
    slug: {
        type: String,
        default: 'Home'
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

homePageSchema.pre(/^find/, function(next){
    this.populate({
        path: 'userOne',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userTwo',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    next();
});

homePageSchema.virtual('HomePhotos', {
    ref: 'HomePhoto',
    foreignField: 'homePage',
    localField: '_id'
});

const homePage = mongoose.model('homePage', homePageSchema);

module.exports = homePage;