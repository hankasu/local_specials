/**
 * Created by henry on 12/22/13.
 */
/*
 * app.js - Express server with routes module
 */

/*jslint         node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
    http    = require( 'http'     ),
    express = require( 'express'  ),
    routes  = require( './routes' ),
    app     = express(),
    engine  = require('ejs-locals'),
    server  = http.createServer( app );
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
app.configure( function () {
   app.use( express.bodyParser() );
   app.use( express.methodOverride() );
   app.use( express.static( __dirname + '/public' ) );
   app.use( app.router );
   app.engine('ejs', engine);
   app.set('views', __dirname + '/views');
   app.set('view engine', 'ejs');
});

app.configure( 'development', function () {
   app.use( express.logger() );
   app.use( express.errorHandler({
      dumpExceptions : true,
      showStack      : true
   }) );
});

app.configure( 'production', function () {
   app.use( express.errorHandler() );
});

routes.configRoutes( app, server );
// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen( 3000 );
console.log(
    'Express server listening on port 3000'
);
// ------------------ END START SERVER --------------------