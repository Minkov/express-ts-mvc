import { Request, Response } from "express";

import { BaseData } from "./../data/base/base.data";
import { Book } from "./../models/book.model";
import { BaseController } from "./base/base.controller";

export class BooksController implements BaseController<Book> {
    data: BaseData<Book>;

    constructor(data: BaseData<Book>) {
        this.data = data;
    }

    getAll(req: Request, res: Response) {
        this.data.getAll()
            .then((books: Book[]) => {
                const model = {
                    model: books,
                    user: req.user
                };

                return res.render("books/books-all", model);
            });
    }

    getForm(req: Request, res: Response) {
        return res.render("books/book-add");
    }

    getById(req, res) {

    }

    add(req: Request, res: Response) {
        let body = req.body;
        this.data.add(body)
            .then(book => {
                res.redirect("/");
            });
    }
}