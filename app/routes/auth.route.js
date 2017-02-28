"use strict";
exports.__esModule = true;
var encryptor_1 = require("./../utils/encryptor");
var passport = require("passport");
var express_1 = require("express");
var user_model_1 = require("./../models/user.model");
var AuthRoute = (function () {
    function AuthRoute(data) {
        this.data = data;
        this.router = express_1.Router();
        this.init();
    }
    AuthRoute.prototype.init = function () {
        var _this = this;
        this.router
            .get("/auth/login", function (req, res) {
            return res.render("auth/login");
        })
            .get("/auth/register", function (req, res) {
            return res.render("auth/register");
        })
            .post("/auth/login", passport.authenticate("local", { failureRedirect: "/auth/login" }), function (req, res) {
            res.redirect("/");
        })
            .post("/auth/register", function (req, res) {
            var encryptor = new encryptor_1.Encryptor();
            var password = encryptor.encrypt(req.body.password);
            var user = new user_model_1.User("", req.body.username, password);
            _this.data.add(user);
            return res.send(true);
        })
            .post("/auth/logout", function (req, res) {
            req.logOut();
            res.redirect("/");
        });
    };
    AuthRoute.prototype.getRouter = function () {
        return this.router;
    };
    return AuthRoute;
}());
exports.AuthRoute = AuthRoute;
