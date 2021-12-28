
const express = require('express');
require('./server/db/mongoose');
const bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
     routers = require('./server/routes/routes.js');
     siteRouters=require('./server/routes/sites.js');
    
//const port = 3001;

const app=express();
const port = process.env.PORT || 3001

app.use('/create_tour', express.static(path.join(__dirname, 'client/html/create_tour_form.html')));
app.use('/toursList', express.static(path.join(__dirname, 'client/html/toursTable.html')));
app.use('/updateTour', express.static(path.join(__dirname, 'client/html/update_tour_form.html')));
app.use('/viewSites', express.static(path.join(__dirname, 'client/html/viewSites.html')));
app.use('/viewCoupons', express.static(path.join(__dirname, 'client/html/viewCoupon.html')));

app.use('/js', express.static(path.join(__dirname, 'client/js')));


app.use('/css', express.static(path.join(__dirname, 'client/css')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);
 app.use(siteRouters);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
