const HomePhoto = require('./../models/homePhotoModel');
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

exports.uploadHomePhoto = upload.single('name');

exports.resizeHomePhoto = catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `home-${req.params.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(1920,1080).toFormat('jpeg').jpeg({ quality: 100 }).toFile(`public/img/home/${req.file.filename}`);
    next();
});


exports.setHomePageId = (req,res,next) => {
    if(!req.body.homePage) req.body.homePage = req.params.homePageId;
    next();
};

exports.createHomePhoto = factory.createOne(HomePhoto);

exports.getHomePhoto = factory.getOne(HomePhoto);

exports.getAllHomePhoto = catchAsync(async(req,res,next)=> {
    let filter = {};
    if(req.params.homePageId) filter = {homePage: req.params.homePageId};

    const homePhotos= await HomePhoto.find(filter);

    res.status(200).json({
        status: 'success',
        results: homePhotos.length,
        data: {
            homePhotos
        }
    });
});

exports.updateHomePhoto = catchAsync( async (req,res,next)=> {
    const filteredBody = filterObj(req.body, 'name');
    if(req.file) filteredBody.name = req.file.filename;
    const updatedHomePhoto = await HomePhoto.findByIdAndUpdate(req.params.id, filteredBody, {new:true,runValidators:true});
    if(!updatedHomePhoto){
        return next(new AppError('No home photo found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            homePhoto: updatedHomePhoto
        }
    });
});

exports.deleteHomePhoto = factory.deleteOne(HomePhoto);