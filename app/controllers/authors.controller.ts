import { Author } from "./../models/author.model";
import { Request, Response } from "express";

import { BaseData } from "./../data/base/base.data";
import { BaseController } from "./base/base.controller";

export class AuthorsController implements BaseController<Author> {
    data: BaseData<Author>;

    constructor(data: BaseData<Author>) {
        this.data = data;
    }

    getAll(req: Request, res: Response) {
        this.data.getAll()
            .then((books: Author[]) => {
                const model = {
                    model: books
                };

                return res.render("authors/authors-all", model);
            });
    }

    getForm(req: Request, res: Response) {
        return res.render("authors/author-add");
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