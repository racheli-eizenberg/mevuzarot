const express = require('express'),
    tourRoutes = require('./tours');

var router = express.Router();

router.get('/tours', tourRoutes.get_tours);
router.post('/tours', tourRoutes.create_tour);
router.put('/tours/:id', tourRoutes.update_tour);
router.delete('/tours/:id', tourRoutes.delete_tour);

router.get('/tours/:site_id', tourRoutes.get_tours);
router.put('/tours/addSite/:id', tourRoutes.AddSiteToTourpath);

router.put('/tours/addCoupun/:id', tourRoutes.AddCuponToTour);

router.delete('/tours/deleteCoupun/:id/:codeCoupon', tourRoutes.deleteCopunFromTour);



router.get('/tours/:id', tourRoutes.get_tour);
module.exports = router;
// const express = require('express')
// const Tour = require('../models/Tours')
// const router = new express.Router()


// router.post('/tours', (req, res) => {
//     const tour = new Tour(req.body)
//     tour.save().then(tour => {
//         console.log("in then - save");
//         res.status(201).send(tour)
//     }).catch(e => {
//         res.status(400).send(e)
//     });
  
// });

// router.get('/tours', (req, res) => {
//     User.find().then(tours =>
//         res.send(users)
//     ).catch(e => res.status(500).send())
// })


// router.put('/tours/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['id', 'date', 'cost', 'duration','siteId','coupons']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(tour => {
//         if (!tour) {
//             return res.status(404).send()
//         }
//         else {
//             console.log(tour)
//             res.send(tour)
//         }
//     }).catch(e => res.status(400).send(e))
// })

// module.exports = router