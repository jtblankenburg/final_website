const rushPage = require('./../models/rushPageModel');
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

exports.getAllRushPage = factory.getAll(rushPage);

exports.getRushPage = factory.getOne(rushPage);

exports.createRushPage = factory.createOne(rushPage);

exports.updateRushPage = catchAsync( async (req,res,next) => {
    const filteredBody = filterObj(req.body, 'headingOne', 'paragraphOne', 'paragraphTwo', 'headingTwo', 'paragraphThree', 'headingThree');
    console.log(req.params.id);
    const updatedRushPage = await rushPage.findByIdAndUpdate(req.params.id, filteredBody, {new: true, runValidators:true});
    if(!updatedRushPage){
        return next(new AppError('No rush page found with that ID',404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            rushpage: updatedRushPage
        }
    });
});