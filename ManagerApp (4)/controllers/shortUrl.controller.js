const ShortUrl = require('../models/shortUrl.model');
const md5 = require('md5');


//Handle get short URL
exports.shortUrl_get = (req, res) => {
    res.render('shortenUrl.ejs');
};
//Handle post short Url
exports.shortUrl_post = (req, res) => {   
    let random = Math.floor(100000 +  Math.random() * 900000);
    let base62 = convertBase62(random);
    let url = mapping(base62);
    let oldUrl = req.body.url;
    let hash = md5(oldUrl);
    let newUrl = "localhost:3000/" + url;
    const objectUrl = {random: random,md5: hash, oldUrl: oldUrl, newUrl : newUrl};

    ShortUrl.checkExistUrl(hash).then((exist_url) =>{
        // console.log("URL moi cua ban la:", exist_url);
        res.render('shortUrlResult.ejs', {oldUrl: exist_url.oldUrl, newUrl:exist_url.newUrl });
        //res.redirect('/short/abc');
    },(reject) => {
            ShortUrl.saveUrl(objectUrl).then((result) => {
            res.render('shortUrlResult.ejs', {oldUrl: result.oldUrl, newUrl:result.newUrl });
            //res.redirect('/short/abc');
        }, (err) => {
            console.log("Can not create new url");
        })
    } )
    
};

// Get oldUrl

exports.get_oldUrl = (req, res) => {
    let url = req.host + ":3000" + req.url;
    //console.log("URL:", url);
    ShortUrl.get_oldUrl(url).then((result) => {
        res.redirect(result.oldUrl);
    }, (reject) => {
        //console.log("Url dosen't exist in database!");
    })
}






//Algorithm convert base10 to base62
let convertBase62 = (number) => {
    let digits = [];
    let num = Number(number);
    while ( num > 0 ) {
        digits.push(num%62);
        num = parseInt(num/62);
    }
    return digits.reverse();
}
// mapping a...zA..Z0..9     with    0...61
let mapping = (arr) => {
    let url ="";
    for ( i = 0; i < arr.length; i++){
        if( Number(arr[i]) >=0 &&  Number(arr[i]) <= 25 ){
            url =  url +  String.fromCharCode( Number(arr[i]) + 97 );
        }
        if( Number(arr[i]) >= 26 &&  Number(arr[i]) <= 51 ) {
            url = url +  String.fromCharCode( Number(arr[i]) + 39 );
        }
        if( Number(arr[i]) >= 52 &&  Number(arr[i]) <= 61){
            url = url + (Number(arr[i]) - 52);
        }
    }
    return url;
}




