
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase1', { useNewUrlParser: true });
const urlSchema = new mongoose.Schema({
    random: String,
    md5: String,
    oldUrl: String,
    newUrl: String,
    user: Object
})

const url = mongoose.model ('url', urlSchema);

// Save url ( old and new )
module.exports.saveUrl = (objectURl) => {
    return new Promise((resolve, reject) => {
        url.create(objectURl, (err, result) => {
            if(!err){
                //console.log("resultCreate:", result);
                return resolve(result);
            } else {
                return reject(false);
            }
        }) 
    })   
}
// Check url already exists in database
module.exports.checkExistUrl = (md5) => {
    return new Promise((resolve, reject) => {
        url.find({md5:md5}, (err, result) => {
            const len = result.length;
            //console.log("Result:", result);
            if(len == 1){
                return resolve(result[0]);
            } else {
                return reject(false);
            }
        })
     })    
}

//get oldUrl by newUrl

module.exports.get_oldUrl = (url1) => {
    return new Promise((resolve, reject) => {
        url.find({newUrl: url1}, (err, result) => {
            const len = result.length;
            //console.log("Result:", result);
            if(len == 1){
                return resolve(result[0]);
            } else {
                return reject(false);
            }
        })
     })     
}

