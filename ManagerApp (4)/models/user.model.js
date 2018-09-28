
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase1',{ useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String
})


const user = mongoose.model('user1', userSchema);

// Export the model
module.exports.add  = (object) => {
    return new Promise((resolve, reject) => {
        user.create(object,(err, result) => {
            if(!err){
                return resolve();
            } else {
                return reject();
            }
        });
    })           
};
//get all database with page
module.exports.getAllData = (page) => {
    return new Promise((resolve, reject) => {
        var pagesize = 10;
        user.find().skip(pagesize*(page-1)).limit(pagesize).exec((err, users) =>{
            if(!err){
                return resolve(users);
            }else{
                return reject();
            }
        }); 
    })  
};

// get total record
module.exports.getTotalRecord = () => {
    return new Promise((resolve, reject) => {
        user.countDocuments({},( err, count) =>{
            if(!err){
                return resolve(count);
            } else {
                return reject();
            }
        }); 
    })   
}

//find by ID
module.exports.findByID = (id) => {
    return new Promise((resolve, reject) => {
        user.findById(id, (err, user) => {
            if(!err){
                return resolve(user);
            } else {
                return reject();
            }
        } );  
    })
}

// Update record by ID
module.exports.update = (id, object) => {
    return new Promise((resolve, reject) => {
        user.updateOne({_id:id}, object, (err, result) => {
            if(!err){
                return resolve(true);
            } else {
                return reject(false);
            }
        })
    })
}

// Delete
module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        user.deleteOne({_id:id}, (err, result) => {
            if(!err){
                return resolve(result);
            } else {
                return reject(err);
            }
        })
    })
}

//