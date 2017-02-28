"use strict";
exports.__esModule = true;
var Book = (function () {
    function Book(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
    Book.fromModel = function (model) {
        var id = model.id || model._id;
        var title = model.title;
        var description = model.description;
        var imgUrl = model.imgUrl;
        return new Book(id, title, description, imgUrl);
    };
    Book.toModel = function (obj) {
        return {
            title: obj.title,
            description: obj.description,
            imgUrl: obj.imgUrl
        };
    };
    return Book;
}());
exports.Book = Book;
