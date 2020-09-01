const express = require('express');
const authController = require('./../controllers/authController');
const specificEventController = require('./../controllers/specificEventController');
const specificEventPhotoRouter = require('./../routes/specificEventPhotoRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:specificEventId/specificEventPhoto',specificEventPhotoRouter);

router
    .route('/')
    .get(specificEventController.getAllSpecificEvents)
    .post(authController.protect,authController.restrictTo('admin'),specificEventController.setEventId, specificEventController.uploadSpecificEventImage, specificEventController.resizeSpecificEventImage, specificEventController.createSpecificEvent);

router
    .route('/:id')
    .get(specificEventController.getSpecificEvent)
    .patch(authController.protect,authController.restrictTo('admin'),specificEventController.updateSpecificEvent)
    .delete(authController.protect,authController.restrictTo('admin'),specificEventController.deleteSpecificEvent);


module.exports = router;