const routes = require('express').Router();
const lesson1Controller = require('../controllers');

routes.get('/', lesson1Controller.awesomeFunction);

module.exports = routes;
