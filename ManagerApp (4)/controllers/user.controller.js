const User = require('../models/user.model');
let id;

//Handle get Add
exports.add_get = (req, res) => {
    if(req.session.username){
        res.render('add_user.ejs',{admin: req.session.username });
    } else {
        res.render("EOS.ejs");
    }
    
};

//Handle post Add ( create new user);
exports.add_post = (req, res) => {
    User.add(req.body).then(() => {
        User.getTotalRecord().then((count) => {
            var index_page = Math.ceil(count/10);
            var text = '/user/manager/' + index_page.toString();
            res.redirect(text);
        }, () => {
            console.log("ERROR:while try get total record ! ");
        });
    }, () => {
        console.log("ERROR: create new account");
    });
};

//manager get all data
exports.manager = (req, res) => {
    if(req.session.username){
        page = req.params.page;
        User.getTotalRecord().then((count) => {
            User.getAllData(page).then((data) => {
                res.render('manager.ejs',{mydata: data, admin:req.session.username, count: count, page: page});
            },(err) => {
                res.send("ERROR: Can not get data!");
            }) 
        }, (reject) => {
            console.log("ERROR:while try get total record ! ")
        });
    } else {
        res.render("EOS.ejs");
    }
   
};

//handel get Update
exports.update_get = (req, res) =>  {
    if(req.session.username){
        id = req.params.id;
        User.findByID(id).then( (user) => {
            res.render('update.ejs', {user: user, admin:req.session.username});
        }, (err) => {
            console.log("ERROR: try get data by id")
        });
    }else {
        res.render("EOS.ejs");
    }
};

//handel post Update
exports.update_post = (req, res) => {
    User.update(id, req.body).then((resolve) => {
        var text = '/user/manager/' + page.toString();
        res.redirect(text);
    }, (reject) => {
        console.log("ERROR: Update fail");
    })
}
//handle Delete User
exports.delete = (req, res) => {
    if(req.session.username){
        const idDele = req.params.id;
        User.delete(idDele).then(() => {
            var text1 = '/user/manager/' + page.toString();
            res.redirect(text1);
        }, (err) => {
            console.log("ERROR: Delete fail")
        })
    }else {
        res.render("EOS.ejs");
    }
   
}
//handle Detail User
exports.detail = (req, res) => {
    if(req.session.username){
        const idDetail = req.params.id;
        User.findByID(idDetail).then((user) => {
            //console.log("Page_Detail:", page);
            res.render('detail.ejs', {user:user, admin:req.session.username, page: page});
        }, (err) => {
            console.log("ERROR: Get data by id fail");
        })
    }else {
        res.render("EOS.ejs");
    } 
}

//Handle user login_Get
exports.login_get = (req, res) => {
   //res.send("Login User"); 
   res.render("userLogin.ejs");
}
//Handle user sign up
exports.signup_get = (req, res) => { 
    res.render("userSignup.ejs");
}
exports.signup_post = (req, res) => { 
    //res.render("userSignup.ejs");
    User.add(req.body);
    res.send(req.body);
}
