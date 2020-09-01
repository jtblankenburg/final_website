const homePage = require('./../models/homePageModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj ={};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


exports.getAllHomePage = factory.getAll(homePage);

exports.getHomePage = factory.getOne(homePage);

exports.createHomePage = factory.createOne(homePage);

exports.updateHomePage = catchAsync( async (req,res,next) => {
    const filteredBody = filterObj(req.body, 'rushHeading', 'rushParagraph', 'aboutHeading', 'aboutParagraph', 'userOneTitle', 'userTwoTitle', 'userOne', 'userTwo');
    //(req.params.id);
    const updatedHomePage = await homePage.findByIdAndUpdate(req.params.id, filteredBody, {new: true, runValidators:true});
    if(!updatedHomePage){
        return next(new AppError('No home page found with that ID',404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            homepage: updatedHomePage
        }
    });
});

