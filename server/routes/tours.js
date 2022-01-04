const fs = require('fs');
const Site = require('../models/Sites.js')
const Tour = require('../models/Tours.js')
const mongoose = require('mongoose')
var validateDate = require("validate-date");
var isPositiveInteger = require('is-positive-integer');
const { deleteOne } = require('../models/Sites.js');

// variables
const dataPath = './server/data/tours.json';

//helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data === null) data = "{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
        if (o2[key] !== "")
            o1[key] = o2[key];
    }
    return o1;
}
function validate(res, req) {
    if (req.body.date && !(validateDate(req.body.date, responseType = "boolean"))) {
        res.status(400).send("required date format");
        return false;
    }
    if (req.body.duration && !isPositiveInteger(parseFloat(req.body.duration))) {
        res.status(400).send("duration must be positive integer");
        return false;
    }
    if (req.body.id && !isPositiveInteger(parseFloat(req.body.id))) {
        res.status(400).send("id must be positive integer");
        return false;
    }
    if (req.body.cost && req.body.cost <= 0) {
        res.status(400).send("cost must be positive number");
        return false;
    }

    return true;
}

module.exports = {

    //READ

    get_tourSites:function(req,res){
        
        Tour.findOne({id:req.params.id}).then(tour=>{
            var sites=[];
            var flag=false;
            tour.sites.map((site)=>{
                Site.findOne({_id:site.toString()}).then(mySite=>{
                    console.log(mySite);
                    sites.push(mySite);
                    console.log(sites);
                  
                }).catch()  
                flag=true;
            })
            if(flag===true)
                res.status(200).send(sites)
           
        }).catch(e=> res.status(404).send(e))
            
        
    },
    get_tours: function (req, res) {
        Tour.find().then(tours => res.send(tours)
        ).catch(e => res.status(400).send())
    },
    get_sites: function (req, res) {
        Site.find().then(sites => res.send(sites)
        ).catch(e => res.status(400).send())
    },
    get_tour: function (req, res) {
        Tour.find({ id: req.params.id }).then(tour => { res.status(200).send(tour) }
        ).catch(e => res.status(400).send("not found"))

    },
    // CREATE
    create_tour: function (req, res) {
        const tour = new Tour(req.body);
        tour.save().then(tour =>
            res.status(201).send(tour + "tour created")

        ).catch(e => res.status(400).send())
        // readFile(data => {

        //     if(data[req.body.id])//if id exists
        //     {
        //        res.status(400).send("id already exists");
        //        return;
        //     }   
        //      // create a tour
        //      if(req.body.id===null||req.body.date===null||req.body.cost===null||req.body.duration===null) 
        //      {res.status(400).send("all fields are required");return;} 
        //     if(!validate(res,req))
        //         return;
        //     data[req.body.id] = req.body;

        //     writeFile(JSON.stringify(data, null, 2), () => {
        //         res.status(200).send('tour created');
        //         return;
        //     });
        // },
        //     true);
    },

    // UPDATE
    update_tour: function (req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id', 'date', 'duration', 'cost']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Tour.findOne({ id: req.params.id }).then(tour => {
            Tour.findByIdAndUpdate(tour._id, req.body, { new: true, runValidators: true }).then(tour => {
                res.status(200).send("tour updated successfuly")
            }).catch(e => { console.log(e), res.status(400).send() })
        }).catch(e => res.status(404).send())



    },
    AddSiteToTourpath: function (req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['site_id', 'index']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        console.log(req.body.site_id)
        Tour.findOne({ id: req.params.id }).then(tour=>{
            tour.sites.push(req.body.site_id);
            tour.save();
            res.status(200).send()
        }).catch(e => res.status(500).send())
        
    //     Tour.findOneAndUpdate({ id: req.params.id }, {$push: {  'sites': '5' }
    // }
    // ).then(e => res.status(200).send(e)).catch(e => res.status(500).send())

        // readFile(data => {

        //     // add the new tour
        //     const tourId = req.params["id"];

        //     if (data[tourId]) {

        //         if (req.body.index === null || req.body.siteDetails === null || req.body.siteDetails.siteName === null || req.body.siteDetails.countryName === null) {
        //             res.status(400).send("all fields are required");
        //             return;
        //         }

        //         else if ((req.body.index) < 0) {
        //             res.status(400).send("invalid index");
        //             return;
        //         }

        //         else if (!data[tourId]["site"]) {
        //             data[tourId]["site"] = [];
        //             data[tourId]["site"].splice(req.body.index, 0, req.body.siteDetails)
        //         }
        //         else
        //             data[tourId]["site"].splice(req.body.index, 0, req.body.siteDetails)
        //     }
        //     else { res.status(400).send("tour id doesn't exist"); return; };

        //     writeFile(JSON.stringify(data, null, 2), () => {
        //         res.status(200).send(`tours id:${tourId} updated`);
        //     }
        //     );
        // },
        //     true);
    },
    addSiteToDb: function (req, res) {
        const site = new Site(req.body);
        site.save().then(site =>
            res.status(201).send(site)
        ).catch(e => res.status(400).send(e))
    },
    AddCuponToTour: function (req, res) {
        
        const updates = Object.keys(req.body)
        const allowedUpdates = ['codeCoupon', 'startDate', 'expiryDate', 'discountPercentage']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Tour.findOne({ id: req.params.id }).then(tour=>{
            tour.coupons.push(req.body);
            tour.save();
            res.status(200).send()
        }).catch(e => res.status(500).send())
        // Tour.findOneAndUpdate({ id: req.params.id },  { new: true, runValidators: true },{ $push: { 'coupons': req.body } 
        // }).then(e => {console.log("heloooooooooooo",e);res.status(200).send("coupon added")}).catch(e => res.status(404).send("tour not found"))


    },

    // DELETE
    delete_tour: function (req, res) {
        Tour.findOneAndDelete({ id: req.params.id }, { new: true, runValidators: true }).then(tour => {
            res.status(200).send("tour removed successfuly")
        }).catch(e => { console.log(e), res.status(404).send() })



    },
    deleteCopunFromTour: function (req, res) {
        Tour.findOneAndUpdate( 
            { id : req.params.id} , 
            { "$pull" : { coupons : { codeCoupon : req.params.codeCoupon } } } , 
            { "multi" : true }  
        ).then(e => {res.status(200).send()}).catch(e => {res.status(400).send()}) 
    },
}

