import { BaseAuthController } from "./../controllers/base/base.auth.controller";
import * as passport from "passport";
import { Router } from "express";
import { User } from "./../models/user.model";
import { BaseData } from "./../data/base/base.data";
import { BaseRoute } from "./base/base.route";

export class AuthRoute implements BaseRoute {
    controller: BaseAuthController;
    router: Router;
    constructor(controller: BaseAuthController) {
        this.controller = controller;
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/auth/login", (req, res) => {
                return this.controller.getLoginForm(req, res);
            })
            .get("/auth/register", (req, res) => {
                this.controller.getRegisterForm(req, res);
            })
            .post("/auth/login", passport.authenticate("local"), (req, res) => {
                return this.controller.loginUser(req, res);
            })
            .post("/auth/register", (req, res) => {
                return this.controller.registerUser(req, res);
            })
            .post("/auth/logout", (req, res) => {
                return this.controller.logoutUser(req, res);
            });
    }

    public getRouter(): any {
        return this.router;
    }
}