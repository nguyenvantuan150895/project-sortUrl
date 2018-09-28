const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const shortUrlRoute = require('./routes/shortUrl.route') ;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//set session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*24}
}))
//import file css 
app.use(express.static(__dirname + '/public/library/bower_components'));
app.use(express.static(__dirname + '/public/library/plugins'));
app.use(express.static(__dirname + '/public/library/dist'));
app.use(express.static(__dirname + '/public/image'));
app.use(express.static(__dirname + '/public/library'));

//path redirections
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/', shortUrlRoute);

// Start server
app.listen(3000, () => {
    console.log("Server start on port::3000");
})


 