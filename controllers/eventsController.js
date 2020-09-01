const Event = require('./../models/eventsModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');

const filterObj = (obj, ...allowedFields) => {
    const newObj ={};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image, please upload images only', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadCoverPhoto = upload.single('coverPhoto');

exports.resizeCoverPhoto = catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `event-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(1920,1080).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/events/${req.file.filename}`);
    next();
});


exports.getAllEvents = factory.getAll(Event);

exports.getEvent = catchAsync(async (req,res,next)=> {
    const event = await (Event.findById(req.params.id)).populate({path: 'specificEvents', populate: {path: 'specificEventPhotos'}});

    if(!event){
        return next(new AppError('No event found with that ID', 404));

    }

    res.status(200).json({
        status: 'success',
        data: {
            event
        }
    });
});

exports.createEvent = catchAsync(async (req,res,next)=> {
    const filteredBody = filterObj(req.body, 'title', 'caption', 'semester', 'coverPhoto');
    if(req.file) filteredBody.coverPhoto = req.file.filename;

    const newEvent = await Event.create(filteredBody);

    res.status(201).json({
        status: 'success',
        data: {
            event: newEvent
        }
    });
});

exports.updateEvent = factory.updateOne(Event);

exports.deleteEvent = factory.deleteOne(Event);