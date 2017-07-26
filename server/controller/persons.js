/*
 * VARIABLES
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
mongoose.Promise = global.Promise;

var path = require('path');

/*
 * LOGIC
 */

module.exports = {

    readItems: function(req, res){
        Person.find({})
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
        var item = new Person(req.body);
        console.log(item)
        item.save(item)
        .then(data => {
            Person.findOne({_id: item._id})
            .then(person => {
                console.log('success in events.js/createItem()');
                res.json(person);
            })
            .catch(err => {
                res.json(err)
            })
        })
        .catch(err => {
            console.log('error in events.js/createItem()');
            console.log(err)
            res.json(err);
        })
    },

    findItem: function(req, res) {
        console.log("FINDITEM");
        Person.findOne(req.body)
        .populate('meets')
        .exec()
        .then(data => {
            console.log(data)
            console.log('person found :)')
            res.json(data)
        })
        .catch(err => {
            console.log('something went wrong finding this person :(')
            res.json(err)
        })
    },

    deleteItem: (req, res) => {
        console.log("deleteitem(): item is:",req.body);
         Person.deleteOne(req.body)
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

        Person.update({_id: req.params.id}, req.body)
        .then(data => {
            console.log("event found:", data)
            if (data) {
                console.log('task updated');
                Person.findOne({_id: req.params.id})
                .then(person => {
                    console.log('passing back event');
                    console.log("event:",person);
                    res.json(person);
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