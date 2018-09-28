const User = require('../models/userModel');



//Handle user login
exports.login_get = (req, res) => {
   res.render("userLogin1.ejs");
}
exports.login_post = (req, res) => {
    let customer ={};
    User.authentication(req.body.username, req.body.password).then((object)=>{
        req.session.user = req.body.username;
        customer.state = "ok";
        res.send(customer);
    }, (err)=>{
        customer.state = "fail";
        customer.username = req.body.username;
        customer.password = req.body.password;
        res.send(customer);
    })
}
//Handle user sign up
exports.signup_get = (req, res) => { 
    res.render("userSignup1.ejs");
}
exports.signup_post = async (req, res) => {
    let customer = {};
    try{
        let check_email = await User.checkEmail(req.body.email);
        let check_user = await User.checkUser(req.body.username);
        if(check_email){
            customer.state = "emailErr"; //Email already exists
        }  
        if( !check_email && check_user) {
            customer.state = "userErr";//User already exists
        } else if (!check_email && !check_user) {
            customer.state = "ok";
            const rs = await User.add(req.body);
            if(rs.id != 0) {
                req.session.user = req.body.username;
            }
        }
        return res.send(customer);
        
    }catch(e){
        console.log("Error signup_post");
    }
}

//user Logout
exports.userLogout = (req, res) => {
    req.session.user = undefined;
    res.redirect('/user/login');
}



