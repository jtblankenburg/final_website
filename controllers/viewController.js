const Event = require('../models/eventsModel');
const homePage = require('../models/homePageModel');
const catchAsync = require('../utils/catchAsync');
const aboutPage = require('../models/aboutPageModel');
const User = require('./../models/userModel');
const SpecificEvent = require('./../models/specificEventModel');
const rushPage = require('./../models/rushPageModel');
const AppError = require('../utils/appError');

exports.getRushPage = catchAsync(async (req,res,next) => {
    const rushPages = await rushPage.findOne({slug: 'Rush'}).populate({path: 'rushPagePhotos', select: 'name'});

    if(!rushPages) {
        return next(new AppError('No rush pages found with that id',404));
    }
    res.render('rushPage', {
        title: 'Rush',
        rushPages
    });
});
exports.editRushPage = catchAsync(async (req,res,next)=> {
    const rushPages = await rushPage.findOne({slug: 'Rush'}).populate({path: 'rushPagePhotos', select: 'name'});
    if(!rushPages) {
        return next(new AppError('No rush pages found',404));
    }
    res.render('editRushPage', {
        title: 'Edit Rush Page',
        rushPages
    });
});

exports.getEventOverview = catchAsync( async (req,res,next)=>{

    //1) Get tour data from collection
    const events = await Event.find();
    //2) Build template

    //3) render template

    res.status(200).render('event', {
        title: 'All Events',
        events
    });
});

//HOME PAGE AND HOME PAGE ACTIONS
exports.getHomePage = catchAsync( async (req,res,next)=> {
    const homePages = await homePage.findOne({slug: 'Home'}).populate({path: 'HomePhotos', select: 'name'});
    res.render('homePage', {
        title: 'Home',
        homePages
    });
});

exports.getEditHomePage = catchAsync( async (req,res) => {
    const homePages = await homePage.findOne({slug: 'Home'}).populate({path: 'HomePhotos'});
    const users = await User.find();
    res.status(200).render('editHomePage', {
        title: 'Edit Home Page',
        homePages,
        users
    });
});




//ABOUT PAGE
exports.getAboutPage = catchAsync(async (req,res,next)=> {
    const aboutPages = await aboutPage.findOne({slug: 'about'});
    res.render('aboutPage', {
        title: 'About',
        aboutPages
    });
});


exports.editAboutPage = catchAsync(async(req,res,next)=> {
    const aboutPages = await aboutPage.findOne({slug: 'about'});
    const users = await User.find();
    res.render('editAboutPage', {
        title: 'Edit About Page',
        aboutPages,
        users
    });
});



//EVENTS AND SPECIFIC EVENTS
exports.getEvent = catchAsync( async (req,res,next)=>{
    const event = await Event.findOne({slug: req.params.slug}).populate({path: 'specificEvents', select: 'year semester coverPhoto photos specificSlug'});

    if(!event) {
        return next(new AppError('No event found with that ID',404));
    }
    res.status(200).render('specificEvent', {
        title: 'Example Event',
        event
    });
});

exports.getAddEventPage = (req,res)=> {
    res.status(200).render('addEvent', {
        title: 'Add Event'
    });
};

exports.getSpecificEvent = catchAsync( async (req,res) => {
    const specificEvent = await SpecificEvent.findById(req.params.id).populate({path: 'specificEventPhotos'});
    res.status(200).render('specificEventPage', {
        title:'example title',
        specificEvent
    });
});






exports.signUp = catchAsync( async (req,res) => {
    res.status(200).render('signUp', {
        title: 'Sign Up'
    });
});

exports.getLoginForm = (req,res)=> {
    res.status(200).render('login', {
        title: 'Log in',
    });
};

exports.getAccount = (req,res)=> {
    res.status(200).render('account', {
        title: 'Your Account'
    });
};

exports.getEditSpecificEventPage = catchAsync( async (req,res)=> {
    const specificEvent = await SpecificEvent.findById(req.params.id).populate({path: 'specificEventPhotos'});
    res.status(200).render('editSpecificEventPage', {
        title: 'edit specific event',
        specificEvent
    });
});



exports.getAdminPage = catchAsync( async (req, res) =>{
    const users = await User.find({applyForAdmin: true});
    res.status(200).render('adminPage', {
        title: 'Promote to admin',
        users
    });
});


exports.addSpecificEvent = catchAsync( async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.status(200).render('addSpecificEventPage', {
        title: 'add collection',
        event
    });
});

exports.manageUsers = catchAsync( async (req,res) => {
    const users = await User.find();
    res.status(200).render('manageUsers', {
        title: 'Manage Users',
        users
    });
});
