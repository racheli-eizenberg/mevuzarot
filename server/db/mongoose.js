const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hadle-tours-api', 
{
    useNewUrlParser: true,
    // useFindAndModify: false,?????????????????????????????????????
});

