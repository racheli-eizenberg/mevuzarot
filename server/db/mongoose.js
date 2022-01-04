const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hadle-tours-api', 
{
    
   
  // useCreateIndex: true,
   //useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
});

