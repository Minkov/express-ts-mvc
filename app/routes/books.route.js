"use strict";
exports.__esModule = true;
var express = require("express");
var BooksRoute = (function () {
    function BooksRoute(controller) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }
    BooksRoute.prototype.initRoutes = function () {
        var _this = this;
        this.router
            .get("/", function (req, res) { return _this.controller.getAll(req, res); })
            .get("/books/add", function (req, res) { return _this.controller.getForm(req, res); })
            .get("/books/:id", this.controller.getById)
            .post("/books", function (req, res) { return _this.controller.add(req, res); });
    };
    BooksRoute.prototype.getRouter = function () {
        return this.router;
    };
    return BooksRoute;
}());
exports.BooksRoute = BooksRoute;
