/*
 * VARIABLES
 */

var mongoose = require('mongoose');//get mongoose
var fs = require('fs');//for loading model files
var path = require('path');//use to get models path

//1 - connect to database
mongoose.connect('mongodb://localhost/skedaddle_db');

//2 - point to where models live
var models_path = path.join(__dirname, '../models');

//3 - load models in models path
fs.readdirSync(models_path).forEach(function(file){
    if (file.indexOf('.js') >= 0){
        //run model file w/ schema
        require(models_path + '/' + file);
    }
});