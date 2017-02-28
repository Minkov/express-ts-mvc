"use strict";
exports.__esModule = true;
var session = require("express-session");
var connectMongo = require("connect-mongo");
var MongoDbStoreFactory = (function () {
    function MongoDbStoreFactory(db) {
        this.db = db;
    }
    MongoDbStoreFactory.prototype.getStore = function () {
        var MongoStore = connectMongo(session);
        return new MongoStore({
            db: this.db
        });
    };
    return MongoDbStoreFactory;
}());
exports.MongoDbStoreFactory = MongoDbStoreFactory;
