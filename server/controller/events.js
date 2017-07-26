/*
 * VARIABLES
 */
var mongoose = require('mongoose');
var Meet = mongoose.model('Meet');
var Person = mongoose.model('Person');
mongoose.Promise = global.Promise;

var path = require('path');

/*
 * LOGIC
 */

module.exports = {

    readItems: function(req, res){
        Meet.find({})
        .then(data => {
            console.log('success in events.js/findItems()');
            res.json(data);
        })
        .catch(err => {
            console.log('error in events.js/findItems()');
            res.json(err);
        })
    },

    createItem: function(req, res){
        console.log("CREATE ITEM")
        var item = new Meet(req.body);
        console.log(item)
        item.save(item)
        .then(meet => {
            console.log('success in events.js/createItem()');
            console.log("meet:", meet);
            Person.update({_id: item.creator},{$push: {meets: item._id}})
            .then(person => {
                console.log('event saved to creator!', person);
                res.json(meet);
            })
            .catch(error => {
                console.log('error finding person belonging to new event')
                res.json(error)
            })
        })
        .catch(err => {
            console.log('error in events.js/createItem()');
            res.json(err);
        })
    },

    findItem: function(req, res) {
        console.log("FINDITEM",req.body);
        Meet.findOne(req.body)
        .then(data => {
            console.log(data)
            console.log('event found :)')
            res.json(data)
        })
        .catch(err => {
            console.log('something went wrong finding this event :(')
            res.json(err)
        })
    },

    deleteItem: (req, res) => {
        console.log("deleteitem(): item is:",req.body);
        Person.findOne({_id: req.body.creator})
         Meet.deleteOne(req.body)
         .then(data => {
             console.log('success in events.js/deleteItem()');
             res.json(data);
         })
         .catch(err => {
             console.log('error in events.js/deleteItem()');
             res.json(err);
        })
    },

    updateItem: (req, res) => {
        console.log("updateItem(): item id is:", req.params.id);
        console.log("item content is:", req.body);

        Meet.update({_id: req.params.id}, req.body)
        .then(data => {
            console.log("event found:", data)
            if (data) {
                console.log('task updated');
                Meet.findOne({_id: req.params.id})
                .then(meet => {
                    console.log('passing back event');
                    console.log("event:",meet);
                    res.json(meet);
                })
                .catch(error => {
                    console.log('error passing back event');
                })
            } else {
                console.log('event not updated');
                res.json(data);
            }
        })
        .catch(error => {
            console.log("error updating event")
        })

    }
}