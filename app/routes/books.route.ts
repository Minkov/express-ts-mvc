import { Book } from "./../models/book.model";
import { BaseController } from "./../controllers/base/base.controller";
import { BaseRoute } from "./base/base.route";
import * as express from "express";

export class BooksRoute implements BaseRoute {
    controller: BaseController<Book>;
    router: express.Router;

    constructor(controller: BaseController<Book>) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/", (req, res) => this.controller.getAll(req, res))
            .get("/books/add", (req, res) => this.controller.getForm(req, res))
            .get("/books/:id", this.controller.getById)
            .post("/books", (req, res) => this.controller.add(req, res));
    }

    public getRouter(): any {
        return this.router;
    }
}