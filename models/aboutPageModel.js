const mongoose = require('mongoose');


const aboutPageSchema = new mongoose.Schema({
    headingOne: String,
    paragraphOne: String,
    headingTwo: String,
    userOneTitle: String,
    userTwoTitle: String,
    userThreeTitle: String,
    userFourTitle: String,
    userFiveTitle: String,
    userSixTitle: String,
    userSevenTitle: String,
    userEightTitle: String,
    userOne: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userTwo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userThree: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userFour: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userFive: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userSix: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userSeven: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userEight: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        default: 'about'
    }, 
    paragraphTwo: String

});

aboutPageSchema.pre(/^find/, function(next){
    this.populate({
        path: 'userOne',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userTwo',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userThree',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userFour',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userFive',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userSix',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userSeven',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    this.populate({
        path: 'userEight',
        select: 'firstname lastname major year favoritePhrase pledgeClass photo'
    });
    next();
});

const AboutPage = mongoose.model('AboutPage', aboutPageSchema);

module.exports = AboutPage;