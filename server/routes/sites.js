const express = require('express')
const Site = require('../models/Sites.js')
const router = new express.Router()
tourRoutes = require('./tours');
router.post('/sites', (req, res) => {
    const site = new Site(req.body);

    site.save().then(site=>
        res.status(201).send(site)
    ).catch(e=>res.status(400).send(e))
})

router.get('/sites', tourRoutes.get_sites)
module.exports = router;