/*
 * SETUP
 */
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path'),
      app = express();

app.use(bodyParser.json());//use bodyParser with json
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, './public/dist')));//connect angular

/*
 * ROUTES
 */
require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

/*
 * SERVER PORT 
 */
app.listen(8000, function(){
    console.log('listening on port 8000');
});