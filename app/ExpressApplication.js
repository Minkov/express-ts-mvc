"use strict";
exports.__esModule = true;
var express = require("express");
var ExpressApplication = (function () {
    function ExpressApplication() {
        this.app = express();
    }
    ExpressApplication.prototype.start = function (port) {
        var _this = this;
        port = +port;
        return new Promise(function (resolve, reject) {
            _this.app.listen(port, function () {
                resolve();
            });
        });
    };
    ExpressApplication.prototype.addRoute = function (route) {
        var router = route.getRouter();
        this.app.use(router);
    };
    ExpressApplication.prototype.set = function (key, value) {
        this.app.set(key, value);
    };
    ExpressApplication.prototype.useMiddleware = function (middleware) {
        this.app.use(middleware);
    };
    return ExpressApplication;
}());
exports.ExpressApplication = ExpressApplication;
