const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();




//router.get('/', viewController.getOverview);
router.use(authController.isLoggedIn);

router.get('/', viewController.getHomePage);
router.get('/events', viewController.getEventOverview);
router.get('/about', viewController.getAboutPage);
router.get('/login',viewController.getLoginForm);
router.get('/rush', viewController.getRushPage);
router.get('/editRushPage', authController.protect, authController.restrictTo('admin'), viewController.editRushPage);
router.get('/adminpage', authController.protect, authController.restrictTo('admin'), viewController.getAdminPage);
router.get('/events/:slug', viewController.getEvent);
router.get('/events/:slug/:id', viewController.getSpecificEvent);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/signup', viewController.signUp);
router.get('/editHomePage',authController.protect, authController.restrictTo('admin'), viewController.getEditHomePage);
router.get('/addEvent', viewController.getAddEventPage);
router.get('/specificEvents/:id', viewController.getEditSpecificEventPage);
router.get('/addCollection/:id', viewController.addSpecificEvent);
router.get('/editAboutPage', authController.protect, authController.restrictTo('admin'), viewController.editAboutPage);
router.get('/manageUsers', authController.protect, authController.restrictTo('admin'), viewController.manageUsers);
module.exports = router;