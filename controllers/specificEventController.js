const specificEvent = require('./../models/specificEventModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');


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
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadSpecificEventImage = upload.single('coverPhoto');

exports.resizeSpecificEventImage= catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `specificEvent-cover-${req.params.eventId}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/specificEvents/${req.file.filename}`);
    next();
});


exports.getAllSpecificEvents = catchAsync(async( req,res,next)=> {
    let filter = {};
    if(req.params.eventId) filter = {event: req.params.eventId};
    
    const specificEvents = await specificEvent.find(filter);

    res.status(200).json({
        status: 'success',
        results: specificEvents.length,
        data: {
            specificEvents
        }
    });
});

exports.setEventId = catchAsync( async (req,res,next)=> {
    if(!req.body.event) req.body.event = req.params.eventId;
    next();
});

exports.createSpecificEvent = catchAsync( async (req,res,next) => {
    const filteredBody = filterObj(req.body, 'title', 'caption', 'semester', 'year', 'coverPhoto', 'event');
    if(req.file) filteredBody.coverPhoto = req.file.filename;
    filteredBody.event = req.params.eventId;
    const newSpecificEvent = await specificEvent.create(filteredBody);
    if(!newSpecificEvent) {
        return next(new AppError('Error creating specific event', 424));
    }
    res.status(200).json({
        status: 'success',
        data: {
            specificEvent: newSpecificEvent
        }
    }); 
});

exports.getSpecificEvent = factory.getOne(specificEvent);

exports.updateSpecificEvent = factory.updateOne(specificEvent);

exports.deleteSpecificEvent = factory.deleteOne(specificEvent);