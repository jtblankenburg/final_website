const aboutPage = require('./../models/aboutPageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const  mongoose  = require('mongoose');
const factory = require('./handlerFactory');

exports.getAllAboutPage = factory.getAll(aboutPage);

exports.getAboutPage = factory.getOne(aboutPage);

exports.createAboutPage = factory.createOne(aboutPage);

exports.updateAboutPage = factory.updateOne(aboutPage);