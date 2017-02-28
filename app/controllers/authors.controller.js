"use strict";
exports.__esModule = true;
var AuthorsController = (function () {
    function AuthorsController(data) {
        this.data = data;
    }
    AuthorsController.prototype.getAll = function (req, res) {
        this.data.getAll()
            .then(function (books) {
            var model = {
                model: books
            };
            return res.render("authors/authors-all", model);
        });
    };
    AuthorsController.prototype.getForm = function (req, res) {
        return res.render("authors/author-add");
    };
    AuthorsController.prototype.getById = function (req, res) {
    };
    AuthorsController.prototype.add = function (req, res) {
        var body = req.body;
        this.data.add(body)
            .then(function (book) {
            res.redirect("/");
        });
    };
    return AuthorsController;
}());
exports.AuthorsController = AuthorsController;
