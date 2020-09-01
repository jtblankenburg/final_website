const express = require('express');
const authController = require('./../controllers/authController');
const homePhotoController = require('./../controllers/homePhotoController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(homePhotoController.getAllHomePhoto)
    .post(homePhotoController.setHomePageId, homePhotoController.createHomePhoto);

router
    .route('/:id')
    .get(homePhotoController.getHomePhoto)
    .patch(homePhotoController.uploadHomePhoto, homePhotoController.resizeHomePhoto, homePhotoController.updateHomePhoto)
    .delete(homePhotoController.deleteHomePhoto);

module.exports = router;