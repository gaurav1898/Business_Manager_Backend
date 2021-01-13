const mongoose = require('mongoose');

//Mongoose Config
mongoose.set('useCreateIndex', true);


//Connect with Database
mongoose.connect('mongodb://localhost:27017/businessManagement', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully Business Management');
}).catch(err => {
    console.log(err);   
});

//For Server Use
// mongoose.connect('mongodb://192.168.1.200:27017/mummeals-staging1?authSource=admin', {
//     user:'staging', 
//     pass:'stagingDB@WK',
//     keepAlive: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Database connected successfully mummeals-staging');
// }).catch(err => {
//     console.log(err);
// });
