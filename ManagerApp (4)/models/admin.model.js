
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase1', { useNewUrlParser: true });
const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:String
})

const admin = mongoose.model ('admin', adminSchema);

// Create new Admin account
module.exports.create  = (object) => {
    return new Promise((resolve, reject) => {
        admin.create(object, (err, result) => {
            //console.log("Result:", result);
            if(!err){
                return resolve();
            } else {
                return reject();
            }
        });
    })           
};

// account authentication
module.exports.authentication = (user, pass) =>{
    return new Promise((resolve, reject) => {
       admin.find({username:user, password:pass}, (err, result) => {
            const len = result.length;
            if(len == 1){
                return resolve(true);
            } else {
                return reject("Authentication failed! ");
            }
       })
    })    
}



