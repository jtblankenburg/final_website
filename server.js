const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNHANDLED EXCEPTION TERMINATING APPLICATION...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => { console.log('Connected to mongoDB...'); });



const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log(`Server started on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION TERMINATING APPLICATION...');
    server.close(()=> {
        process.exit(1);   
    });
});
