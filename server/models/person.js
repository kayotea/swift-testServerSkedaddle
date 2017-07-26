/*
 * ITEM MODEL 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//create schema
var PersonSchema = new mongoose.Schema({
    username: String,
    email: String,
    meets: [{type: Schema.Types.ObjectId, ref: 'Meet'}],
    lng: Number,
    lat: Number
});

//register schema as model
var Person = mongoose.model('Person', PersonSchema);