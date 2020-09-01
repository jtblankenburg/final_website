const express = require('express');
const homePageController = require('./../controllers/homePageController');
const authController = require('./../controllers/authController');
const homePhotoRouter = require('./../routes/homePhotoRoutes');

const router = express.Router();

router.use('/:homePageId/homePhoto', homePhotoRouter);

router
    .route('/')
    .get(homePageController.getAllHomePage)
    .post(authController.protect, authController.restrictTo('admin'), homePageController.createHomePage);
router
    .route('/:id')
    .get(homePageController.getHomePage)
    .patch(authController.protect, authController.restrictTo('admin'), homePageController.updateHomePage);

module.exports = router;