const User = require('./../models/userModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const mongoose  = require('mongoose');


// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });
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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async(req,res,next) => {
    if(!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/users/${req.file.filename}`);
    next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj ={};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.updateMe = catchAsync( async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    //1) Create error if user posts password data
    if(req.body.password || req.body.passwordConfirm)
    {
        return next(new AppError('Cannot update password through this link!',400));
    }

    const filteredBody = filterObj(req.body, 'firstname','lastname','email','major','year','favoritePhrase','pledgeClass','pin', 'applyForAdmin', 'photo');
    if(req.file) filteredBody.photo = req.file.filename;
    //2) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true});

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync( async (req,res,next)=> {
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
        status: 'sucess',
        data: null
    });
});

exports.getMe = (req,res,next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUserByName = catchAsync(async (req,res,next)=> {
    const fname = req.params.firstname;
    const user = await User.findOne({firstname: req.params.firstname, lastname: req.params.lastname});
    if(user != undefined)
    {
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } else {
        return next(new AppError('No users found with that name!', 404))
    }
});

exports.getUser = factory.getOne(User);



exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);


