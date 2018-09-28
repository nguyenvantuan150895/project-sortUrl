const shortUrlController = require('../controllers/shortUrl.controller');
const express = require('express');
const router = express.Router();



// a simple test url to check that all of our files are communicating correctly.
router.get('/shortUrl',shortUrlController.shortUrl_get );
router.post('/shortUrl',shortUrlController.shortUrl_post);
router.get('/*',shortUrlController.get_oldUrl);

//export
module.exports = router;