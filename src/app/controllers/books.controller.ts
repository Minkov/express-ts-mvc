import { Request, Response } from "express";

import { BaseData } from "./../data/base/base.data";
import { Book } from "./../models/book.model";
import { BaseController } from "./base/base.controller";

export class BooksController implements BaseController<Book> {
    data: BaseData<Book>;

    constructor(data: BaseData<Book>) {
        this.data = data;
    }

    getAll(req, res) {
        return this.data.getAll()
            .then((books: Book[]) => {
                const model = {
                    model: books,
                    user: req.user
                };

                return res.render("books/books-all", model);
            });
    }

    getForm(req, res) {
        return res.render("books/book-add");
    }

    getById(req, res) {
        let id = req.params.id;
        return this.data.getById(id)
            .then((book: Book) => {
                let model = {
                    model: book,
                    user: req.user
                };

                return res.render("books/book-details", model);
            });
    }

    add(req, res) {
        let body = req.body;
        return this.data.add(body)
            .then(book => {
                res.redirect("/");
            });
    }
}