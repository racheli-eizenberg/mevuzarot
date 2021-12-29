const express = require('express')
const Site = require('../models/Sites.js');
const { addSiteToDb } = require('./tours');
const router = new express.Router()
tourRoutes = require('./tours');
router.post('/sites', tourRoutes.addSiteToDb)

router.get('/sites', tourRoutes.get_sites)
module.exports = router;