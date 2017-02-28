"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var MongoDbData = (function () {
    function MongoDbData(db, Klass, modelFuncs) {
        this.db = db;
        var collectionName = this.getCollectionName(Klass);
        this.collection = this.db.collection(collectionName);
        this.modelFuncs = modelFuncs;
    }
    MongoDbData.prototype.getAll = function () {
        var _this = this;
        return this.collection.find()
            .toArray()
            .then(function (models) { return models.map(function (model) { return _this.modelFuncs.fromModel(model); }); });
    };
    MongoDbData.prototype.findOne = function (query) {
        var _this = this;
        return this.collection.findOne(query)
            .then(function (model) {
            if (model == null) {
                return model;
            }
            return _this.modelFuncs.fromModel(model);
        });
    };
    MongoDbData.prototype.getById = function (id) {
        var _this = this;
        var objectId = new mongodb_1.ObjectID(id);
        return this.collection.findOne({ _id: objectId })
            .then(function (model) { return _this.modelFuncs.fromModel(model); });
    };
    MongoDbData.prototype.add = function (item) {
        return this.collection.insertOne(item)
            .then(function (result) {
            return item;
        });
    };
    MongoDbData.prototype.getCollectionName = function (Klass) {
        var klassName = Klass.prototype.constructor.name;
        return klassName.toLowerCase() + "s";
    };
    return MongoDbData;
}());
exports.MongoDbData = MongoDbData;
