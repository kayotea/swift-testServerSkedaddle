/*
 * ITEM MODEL 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//create schema
var MeetSchema = new mongoose.Schema({
    title: String,
    creator: {type: Schema.Types.ObjectId, ref: 'Person'},
    datetime: Date,
    address: String,
    people: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    pins: []
});

//register schema as model
var Meet = mongoose.model('Meet', MeetSchema);