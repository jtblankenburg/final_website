const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const eventRouter = require('./routes/eventsRoutes');
const userRouter = require('./routes/userRoutes');
const aboutPageRouter = require('./routes/aboutPageRoutes');
const viewRouter = require('./routes/viewRoutes');
const specificEventRouter = require('./routes/specificEventRoutes');
const homePageRouter = require('./routes/homePageRoutes');
const homePhotoRouter = require('./routes/homePhotoRoutes');
const specificEventPhotoRouter = require('./routes/specificEventPhotoRoutes');

const rushPageRouter = require('./routes/rushPageRoutes');
const rushPhotoRouter = require('./routes/rushPhotoRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//1) GLOBAL MIDDLEWARES
//Serving static files
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'dist')))

//BOOTSTRAP
app.use('/bootstrap',express.static(__dirname+ '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname+'/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname+'/node_modules/popper.js/dist/umd/'));
app.use('/bootstrapjs', express.static(__dirname+'/node_modules/bootstrap/dist/js/'));


//Securing HTTP Headers
app.use(helmet());

//Development Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Limit requests from same IP
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP please try again in an hour'
});
app.use('/api',limiter);


//Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
//Data Sanitization
app.use(mongoSanitize());

app.use(xss());

//Prevent paramater pollution
app.use(hpp());



//3) Routes

app.use('/', viewRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/aboutPage', aboutPageRouter);
app.use('/api/v1/specificEvents', specificEventRouter);
app.use('/api/v1/homePage', homePageRouter);
app.use('/api/v1/homePhoto', homePhotoRouter);
app.use('/api/v1/specificEventPhoto', specificEventPhotoRouter);
app.use('/api/v1/rushPage', rushPageRouter);
app.use('/api/v1/rushPhoto', rushPhotoRouter);

app.all('*', (req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;