const express = require('express');
const rushPageController = require('./../controllers/rushPageController');
const authController = require('./../controllers/authController');
const rushPhotoRouter = require('./../routes/rushPhotoRoutes');

const router = express.Router();

router.use('/:rushPageId/rushPhoto', rushPhotoRouter);

router
    .route('/')
    .get(rushPageController.getAllRushPage)
    .post(authController.protect, authController.restrictTo('admin'), rushPageController.createRushPage);

router
    .route('/:id')
    .get(rushPageController.getRushPage)
    .patch(authController.protect, authController.restrictTo('admin'), rushPageController.updateRushPage);

module.exports = router;