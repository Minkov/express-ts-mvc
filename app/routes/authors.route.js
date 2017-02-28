"use strict";
exports.__esModule = true;
var express = require("express");
var AuthorsRoute = (function () {
    function AuthorsRoute(controller) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }
    AuthorsRoute.prototype.initRoutes = function () {
        var _this = this;
        this.router
            .get("/", function (req, res) { return _this.controller.getAll(req, res); })
            .get("/authors/add", function (req, res) { return _this.controller.getForm(req, res); })
            .get("/authors/:id", this.controller.getById)
            .post("/authors", function (req, res) { return _this.controller.add(req, res); });
    };
    AuthorsRoute.prototype.getRouter = function () {
        return this.router;
    };
    return AuthorsRoute;
}());
exports.AuthorsRoute = AuthorsRoute;
