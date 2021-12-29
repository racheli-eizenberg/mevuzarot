const mongoose = require('mongoose')
const express = require('express')
 const validator = require('validator')

 
  
var tourSchema = new mongoose.Schema({
    
    
    id: {
        type:String,
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
        type:String,
        required: true,
        
      },
    duration: {
        type:Number,
        required: true,
        digits: true,
      },
      cost: {
        type:Number,
        required: true,
        digits: true,
      },
      coupons: {
        type:Object,
       
        digits: true,
      },
      sites: {
        type:Object,
      
        digits: true,
      },
        
    

}, { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour