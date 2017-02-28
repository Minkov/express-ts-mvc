import { Encryptor } from './../utils/encryptor';
import * as passport from "passport";
import { Router } from "express";
import { User } from "./../models/user.model";
import { BaseData } from "./../data/base/base.data";
import { BaseRoute } from "./base/base.route";

export class AuthRoute implements BaseRoute {
    router: Router;
    data: BaseData<User>;
    constructor(data: BaseData<User>) {
        this.data = data;
        this.router = Router();
        this.init();
    }

    init() {
        this.router
            .get("/auth/login", (req, res) => {
                return res.render("auth/login");
            })
            .get("/auth/register", (req, res) => {
                return res.render("auth/register");
            })

            .post("/auth/login", passport.authenticate("local", { failureRedirect: "/auth/login" }), (req, res) => {
                res.redirect("/");
            })
            .post("/auth/register", (req, res) => {
                const encryptor = new Encryptor();
                const password = encryptor.encrypt(req.body.password);
                let user = new User("", req.body.username, password);
                this.data.add(user);
                return res.send(true);
            })
            .post("/auth/logout", (req, res) => {
                req.logOut();
                res.redirect("/");
            });
    }

    public getRouter(): any {
        return this.router;
    }
}