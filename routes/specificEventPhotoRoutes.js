const express = require('express');
const authController = require('./../controllers/authController');
const specificEventPhotoController = require('./../controllers/specificEventPhotoController');

const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(specificEventPhotoController.getAllSpecificEventPhotos)
    .post(specificEventPhotoController.setSpecificEventId, specificEventPhotoController.uploadSpecificEventPhoto, specificEventPhotoController.resizeSpecificEventPhoto, specificEventPhotoController.createSpecificEventPhoto);

router
    .route('/:id')
    .get(specificEventPhotoController.getSpecificEventPhoto)
    .patch(specificEventPhotoController.uploadSpecificEventPhoto, specificEventPhotoController.resizeSpecificEventPhoto, specificEventPhotoController.updateSpecificEventPhoto)
    .delete(specificEventPhotoController.deleteSpecificEventPhoto);

module.exports = router;