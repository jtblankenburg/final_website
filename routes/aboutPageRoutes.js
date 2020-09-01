const express = require('express');
const aboutPageController = require('./../controllers/aboutPageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(aboutPageController.getAllAboutPage)
    .post(authController.protect, authController.restrictTo('admin'), aboutPageController.createAboutPage);

router
    .route('/:id')
    .get(aboutPageController.getAboutPage)
    .patch(authController.protect, authController.restrictTo('admin'), aboutPageController.updateAboutPage);

module.exports = router;