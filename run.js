const slimple = require('slimple');
const App = require('./app/App.js');

slimple.run({
    port: 8081,
    servicePath: '/services'
}, new App());