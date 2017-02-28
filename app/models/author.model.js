"use strict";
exports.__esModule = true;
var Author = (function () {
    function Author(name) {
        this.name = name;
    }
    Author.toModel = function (obj) {
        return {
            name: obj.name
        };
    };
    Author.fromModel = function (model) {
        return new Author(model.name);
    };
    return Author;
}());
exports.Author = Author;
