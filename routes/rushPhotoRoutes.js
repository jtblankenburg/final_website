const express = require('express');
const authController = require('./../controllers/authController');
const rushPhotoController = require('./../controllers/rushPhotoController');

const router = express.Router({ mergeParams:true });

router
    .route('/')
    .get(rushPhotoController.getAllRushPhoto)
    .post(rushPhotoController.setRushPageId, rushPhotoController.createRushPhoto);

router
    .route('/:id')
    .get(rushPhotoController.getRushPhoto)
    .patch(rushPhotoController.uploadRushPhoto, rushPhotoController.resizeRushPhoto, rushPhotoController.updateRushPhoto)
    .delete(rushPhotoController.deleteRushPhoto);

module.exports = router;