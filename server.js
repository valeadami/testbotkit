var express = require('express');
var bodyParser = require('body-parser');
//aggiunto in data 18/01/2019
var hbs = require('express-hbs');
var http = require('http');
const session = require('express-session');

module.exports = function(controller) {

    var webserver = express();

    // Parse request bodies
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    webserver.engine('hbs', hbs.express4({partialsDir: __dirname + '/../views/partials'}));
    webserver.set('view engine', 'hbs');
    webserver.set('views', __dirname + '/../views/');
    // webserver.set('views', __dirname + '/../views/');
    // Setup a static directory 'public', totally optional
    webserver.use(express.static('public'));
    //SESSIONE
    //inizializzo la sessione
    webserver.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false, maxAge: 180000,name:'JSESSIONID'}
  }));
//uso le variabili di sessione
    webserver.use(function (req, res, next) {
        
        req.session.username='';
        req.session.matId='';
        req.session.stuId='';
    
        next();
    })
    //FINE SESSIONE
    //commentato il 18/01/2019 dopo webhook
    // You can pass in whatever hostname you want as the second argument
    // of the express listen function, it defaults to 0.0.0.0 aka localhost 
   /*webserver.listen(process.env.PORT || 3000,  null, function() {
        console.log('Express webserver configured and listening!')
    });
  */
//ora uso il socket
  
/* per prova 02/02/2019*/
   var server = http.createServer(webserver);

    server.listen(process.env.PORT || 3000, null, function() {

        console.log('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);

    });/* */
  
    // Register our Facebook webhook routes
    // Pass in the express server, and the botkit controller into
    // the routes file to extend both of them 
    require('./incoming-webhook')(webserver, controller)
    webserver.get('/', function(req,res) {
/*
       res.render('index', {
          layout: 'layouts/default',
          base_url: req.hostname
        });*/
        res.redirect('chat.html');
    
    });
    controller.webserver = webserver;
    //aggiunta il 18/01/2019
    //controller.httpserver = server;
    controller.httpserver = server;
    return webserver;

}