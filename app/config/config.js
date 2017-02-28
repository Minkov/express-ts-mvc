"use strict";
exports.__esModule = true;
var connectionString = process.env.CONNECTION_STRING ||
    "mongodb://localhost/books-db";
exports.connectionString = connectionString;
var port = process.env.PORT || 3001;
exports.port = port;
var secret = "purple unicorn";
exports.secret = secret;
