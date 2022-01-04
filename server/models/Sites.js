const mongoose = require('mongoose')
const express = require('express')
 const validator = require('validator')

  
  
var siteSchema = new mongoose.Schema({
    
    index:{
        type:Number,
        required: true,

    },
    countryName: {
        type:String,
        required: true,
        trim:true,
        // validate(value) {
        //     if (value.length==0) {
        //         throw new Error('country name must be full')
        //     }
        // }
    },
    siteName: {
        type:String,
        required: true,
        trim:true,
        // validate(value) {
        //     if (value.length==0) {
        //         throw new Error('site name must be full')
        //     }
        // }
        
    },

}, { timestamps: true }
);

const Site = mongoose.model('Site', siteSchema);

module.exports = Site