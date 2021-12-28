const mongoose = require('mongoose')
const validator = require('validator')

  
  
var TourSchema = new mongoose.Schema({
    id: {
        required: true,
        digits: true,
        idExist: true,
        trim: true,
        validate(value) {
            if (!localStorage.getItem('tourIdArr').indexOf(value) == -1) {
                throw new Error('tour id already exists')
            }
        }
    },
    date: {
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    duration: {
        required: true,
        type: Number,
        default: 0,
    },
    cost: {
        required: true,
        type: Number,
        default: 0,
       
    },
    siteId: {
        type: String,
        required: true,
        trim: true
    },
    coupons: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }
);

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour