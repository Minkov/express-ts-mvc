import { Author } from "./../models/author.model";
import { BaseController } from "./../controllers/base/base.controller";
import { BaseRoute } from "./base/base.route";
import * as express from "express";

export class AuthorsRoute implements BaseRoute {
    controller: BaseController<Author>;
    router: express.Router;

    constructor(controller: BaseController<Author>) {
        this.router = express.Router();
        this.controller = controller;
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/", (req, res) => this.controller.getAll(req, res))
            .get("/authors/add", (req, res) => this.controller.getForm(req, res))
            .get("/authors/:id", this.controller.getById)
            .post("/authors", (req, res) => this.controller.add(req, res));
    }

    public getRouter(): any {
        return this.router;
    }
}