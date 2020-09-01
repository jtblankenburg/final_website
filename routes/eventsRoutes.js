const express = require('express');
const eventsController = require('./../controllers/eventsController');
const authController = require('./../controllers/authController');
const specificEventRouter = require('./../routes/specificEventRoutes');

const router = express.Router();

router.use('/:eventId/specificEvent', specificEventRouter);

router
    .route('/')
    .get(eventsController.getAllEvents)
    .post(authController.protect, authController.restrictTo('admin'), eventsController.uploadCoverPhoto, eventsController.resizeCoverPhoto, eventsController.createEvent);
router
    .route('/:id')
    .get(eventsController.getEvent)
    .patch(authController.protect, authController.restrictTo('admin'), eventsController.updateEvent)
    .delete(authController.protect, authController.restrictTo('admin'), eventsController.deleteEvent);



module.exports = router;