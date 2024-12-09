const express = require('express')
const router = express.Router()

const apiController = require('../Controllers/apiController')







// Single Track route based on some endpoint or ID
router.get('/track/:trackEndPoint', apiController.getTrack)

router.get('/artist/:artistId/', apiController.getArtist);

module.exports = router