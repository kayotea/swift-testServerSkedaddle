/*
 * VARIABLES
 */
var meets = require('../controller/events.js'),
    people = require('../controller/persons.js'),
    path = require('path');

/*
 * ROUTES
 */
module.exports = function(app){
    
    /* PEOPLE */
    app.post('/new/person', (req, res) => {
        people.createItem(req, res);
    });
    app.post('/find/person', (req, res) => {
        people.findItem(req, res);
    });
    app.get('/persons', (req, res) => {
        people.readItems(req, res);
    });
    app.post('/delete/person', (req, res) => {
        people.deleteItem(req, res);
    });
    app.post('/update/person/:id', (req, res)=> {
        people.updateItem(req, res);
    });
    /* EVENTS */
    app.post('/new/event', (req, res) => {
        console.log("reached new event")
        meets.createItem(req, res);
    });
    app.get('/events', (req, res) => {
        meets.readItems(req, res);
    });
    app.post('/find/event', (req, res) => {
        meets.findItem(req, res);
    });
    app.post('/delete/event', (req, res) => {
        meets.deleteItem(req, res);
    });
    app.post('/update/event/:id', (req, res)=> {
        meets.updateItem(req, res);
    });

    /*
    app.all("*", (req,res) => {
        res.sendfile(path.resolve("./public/dist/index.html"));
    });
    */
}