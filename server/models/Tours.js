const mongoose = require('mongoose')
const express = require('express')
const validator = require('validator');
const Site = require('../models/Sites.js')
//var site= new siteChema;
// const site=require('./Sites')
//console.log(site)
var couponSchema = new mongoose.Schema({
  codeCoupon: {
    type: String,
    required: true,
    trim: true,
    // validate(value) {
    //   if (value.length == 0) {
    //     throw new Error('code coupon must be a value')
    //   }
    //   console.log("value",value)
      // if(codeCoupon===null) {
      // res.status(400).send("code cupon required");
      // return;
      // if (tour.coupon && tour.coupon[`cupon${codeCoupon}`])//if coupon exists update
      // {
      // tour.coupon[`cupon${codeCoupon}`].update(req.body);
      // }
//}

  },
  startDate: {
    type: String,
    required: true,
    trim: true,
    // validate(value) {
    //   //     if (value.length==0) {
    //   //         throw new Error('site name must be full')
    //   //     }
    //   if (value && !(validateDate(value, responseType = "boolean")) || expiryDate && !(validateDate(expiryDate, responseType = "boolean"))) {
    //     res.status(400).send("date must be in date format");
    //     return;
    //   }

    // }
  },
    expiryDate: {
      type: String,
      required: true,
      trim: true,
      // validate(value) {
      //   //     if (value.length==0) {
      //   //         throw new Error('site name must be full')
      //   //     }
      //   if (startDate && value && startDate > value) {
      //     res.status(400).send("expiry date can't be before start date");
      //     return;
      //   }
      //   if (Tour.find < value) {
      //     return res.status(400).send("expiry date can't be after the tour begins");
      //   }


      // }
    },
    discountPercentage: {
      type:Number,
      required: true,
      trim: true,
      // validate(value) {
      //   //     if (value.length==0) {
      //   //         throw new Error('site name must be full')
      //   //     }
      //   if (discountPercentage && isNaN(discountPercentage) || Number(discountPercentage) < 0 || Number(discountPercentage) > 100) {
      //     res.status(400).send("discountPercentage must be valid percentage");
      //     return;
      //   }
      // }

    },},
 {timestamps: true }
);


var tourSchema = new mongoose.Schema({


  id: {
    type: String,
    required: true,
    digits: true,
    // idExist: true,
    // validate(value) {
    //     if (Tour.find(value)) {
    //         throw new Error('country name must be full')
    //     }
    // }

  },
  date: {
    type: String,
    required: true,

  },
  duration: {
    type: Number,
    required: true,
    digits: true,
  },
  cost: {
    type: Number,
    required: true,
    digits: true,
  },
  coupons: [couponSchema],
  sites:[ {type: mongoose.Schema.Types.ObjectId, ref: 'Site'}]
  
}, { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour