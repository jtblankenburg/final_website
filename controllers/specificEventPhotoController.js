const specificEventPhoto = require('./../models/specificEventPhotoModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const SpecificEvent = require('./../models/specificEventModel');

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

exports.uploadSpecificEventPhoto = upload.single('name');

exports.resizeSpecificEventPhoto = catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `specificEvent-${req.params.specificEventId}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/specificEvents/${req.file.filename}`);
    next();
});

exports.setSpecificEventId = catchAsync( async (req,res,next) => {
    if(!req.body.specificEvent) req.body.specificEvent = req.params.specificEventId;
    next();
});

exports.getAllSpecificEventPhotos = catchAsync(async (req,res,next)=> {
    let filter = {};
    if(req.params.specificEventId) filter = {specificEvent: req.params.specificEventId};

    const specificEventPhotos = await specificEventPhoto.find(filter);
    if(!specificEventPhotos){
        return next(new AppError('Error no specific event photos with that specific event id', 404));

    }
    res.status(200).json({
        status: 'success',
        data: {
            specificEventPhotos
        }
    });
});

exports.updateSpecificEventPhoto = catchAsync( async (req,res,next)=> {
    const filteredBody = filterObj(req.body, 'name');
    if(req.file) filteredBody.name = req.file.filename;
    const updatedSpecificEventPhoto = await specificEventPhoto.findByIdAndUpdate(req.params.id, filteredBody, {new: true, runValidators:true});
    if(!updateSpecificEventPhoto) {
        return next( new AppError('No specific event photo found with that id!', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            specificEventPhoto: updatedSpecificEventPhoto
        }
    });
});

exports.deleteSpecificEventPhoto = factory.deleteOne(specificEventPhoto);

exports.createSpecificEventPhoto = catchAsync( async (req,res,next) => {
    const filteredBody = filterObj(req.body, 'name', 'specificEvent');
    if(req.file) filteredBody.name = req.file.filename;
    filteredBody.specificEvent = req.params.specificEventId;
    const newSpecificEventPhoto = await specificEventPhoto.create(filteredBody);
    if(!newSpecificEventPhoto){
        return next(new AppError('Error creating specific event', 424));
    }
    res.status(200).json({
        status: 'success',
        data: {
            specificEventPhoto: newSpecificEventPhoto
        }
    });
});

exports.getSpecificEventPhoto = factory.getOne(specificEventPhoto);