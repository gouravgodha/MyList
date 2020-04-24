#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var config = require('../config.json');
var debug = require('debug')('express-locallibrary-tutorial:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

server.timeout = 5* 60 * 1000;

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // Named pipe
        return val;
    }

    if (port >= 0) {
        // Port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    
    if(process.env.NODE_ENV=="production")
        console.log('\x1b[40mListening on ' + bind);
    else if(process.env.NODE_ENV=="development" || process.env.NODE_ENV=="testing")
        console.log('Listening on ' + bind);

    console.log(`Application running in ${process.env.NODE_ENV} environment.`);
    debug('Listening on ' + bind);
}