const RushPhoto = require('./../models/rushPhotoModel');
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
        cb(new AppError('Not an image, please upload images only', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadRushPhoto = upload.single('name');

exports.resizeRushPhoto = catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `rush-${req.params.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(1920,1080).toFormat('jpeg').jpeg({ quality: 100 }).toFile(`public/img/rush/${req.file.filename}`);
    next();
});


exports.setRushPageId = (req,res,next) => {
    if(!req.body.rushPage) req.body.rushPage = req.params.rushPageId;
    next();
};

exports.createRushPhoto = factory.createOne(RushPhoto);

exports.getRushPhoto = factory.getOne(RushPhoto);

exports.getAllRushPhoto = catchAsync(async(req,res,next)=> {
    let filter = {};
    if(req.params.rushPageId) filter = {rushPage: req.params.rushPageId};

    const rushPhotos= await RushPhoto.find(filter);

    res.status(200).json({
        status: 'success',
        results: rushPhotos.length,
        data: {
            rushPhotos
        }
    });
});

exports.updateRushPhoto = catchAsync( async (req,res,next)=> {
    const filteredBody = filterObj(req.body, 'name');
    if(req.file) filteredBody.name = req.file.filename;
    const updatedRushPhoto = await RushPhoto.findByIdAndUpdate(req.params.id, filteredBody, {new:true,runValidators:true});
    if(!updatedRushPhoto){
        return next(new AppError('No rush photo found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            rushPhoto: updatedRushPhoto
        }
    });
});

exports.deleteRushPhoto = factory.deleteOne(RushPhoto);