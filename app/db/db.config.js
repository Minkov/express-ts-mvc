"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var DbConfig = (function () {
    function DbConfig() {
    }
    DbConfig.initMongoDb = function (connectionString) {
        return mongodb_1.MongoClient.connect(connectionString);
    };
    return DbConfig;
}());
exports.DbConfig = DbConfig;
