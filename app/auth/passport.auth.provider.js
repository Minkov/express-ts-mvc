"use strict";
exports.__esModule = true;
var passport = require("passport");
var passport_local_1 = require("passport-local");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var PassportAuthProvider = (function () {
    function PassportAuthProvider(data, secret, storeFactory) {
        this.data = data;
        this.secret = secret;
        this.storeFactory = storeFactory;
    }
    PassportAuthProvider.prototype.addToApp = function (app) {
        var _this = this;
        app.useMiddleware(cookieParser());
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true }));
        app.useMiddleware(session({
            secret: this.secret,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 1000 * 60 },
            store: this.storeFactory.getStore()
        }));
        app.useMiddleware(passport.initialize());
        app.useMiddleware(passport.session());
        passport.use(new passport_local_1.Strategy(function (username, password, done) {
            _this.data.findOne({ username: username, password: password })
                .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })["catch"](function (err) { return done(err); });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function (id, done) {
            _this.data.getById(id)
                .then(function (user) {
                console.log(user);
                done(null, user);
            })["catch"](function (err) { return done(err); });
        });
    };
    return PassportAuthProvider;
}());
exports.PassportAuthProvider = PassportAuthProvider;
