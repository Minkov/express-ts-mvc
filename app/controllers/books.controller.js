"use strict";
exports.__esModule = true;
var BooksController = (function () {
    function BooksController(data) {
        this.data = data;
    }
    BooksController.prototype.getAll = function (req, res) {
        this.data.getAll()
            .then(function (books) {
            var model = {
                model: books,
                user: req.user
            };
            return res.render("books/books-all", model);
        });
    };
    BooksController.prototype.getForm = function (req, res) {
        return res.render("books/book-add");
    };
    BooksController.prototype.getById = function (req, res) {
    };
    BooksController.prototype.add = function (req, res) {
        var body = req.body;
        this.data.add(body)
            .then(function (book) {
            res.redirect("/");
        });
    };
    return BooksController;
}());
exports.BooksController = BooksController;
