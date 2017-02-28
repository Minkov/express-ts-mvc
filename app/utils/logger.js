"use strict";
exports.__esModule = true;
var morgan = require("morgan");
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.getLoggerMiddleware = function () {
        return morgan("combined");
    };
    return Logger;
}());
exports.Logger = Logger;
