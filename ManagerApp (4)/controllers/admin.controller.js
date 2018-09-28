const Admin = require('../models/admin.model');

//Handle Login get Admin
exports.login_get = (req, res) => {
    if(req.session.username){
        res.redirect('/user/manager/1');
    } else{
        res.render('login.ejs');
    } 
};

//Handle Login post Admin
exports.login_post = (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    Admin.authentication(user, pass).then(() => {
        req.session.username = user;
        res.redirect('/user/manager/1');
    }, err => {
        res.render("login_err.ejs");
    })
}

//Handle Register get Admin
exports.register_get = (req, res) => {
    res.render('register.ejs');
}

//Handle Registet post Admin
exports.register_post = (req, res) => {
    Admin.create(req.body).then(() => {
        req.session.username = req.body.username;
        res.redirect('/user/manager/1');
    }, err => {
        console.log("ERROR: Create new admin account fail ");
    })  
}

// Handle Logout Admin account
exports.logout = (req, res) => {
    req.session.username = undefined;
    res.redirect('/admin/login');
}


