const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const  mongoose  = require('mongoose');


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
  
});

exports.updateOne = Model =>  catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
   
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });   
   
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
   
    const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const doc = await features.query;

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
    
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        const doc = await Model.findById(req.params.id);
        if(doc != null)
        {
            res.status(200).json({
                status: 'success',
                data: {
                    data: doc
                }
            });
        } else {
            //may not be necessary will test after deployment
            return next(new AppError('No document with this ID but ID is valid length',500));
        }
    } else {
        return next(new AppError('No document found with that ID.', 404));
    }
  
});