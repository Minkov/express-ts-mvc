import { BaseValidator } from "./../validators/base/base.validator";
import { Encryptor } from "./../utils/encryptor";
import { BaseData } from "./../data/base/base.data";
import { User } from "./../models/user.model";
import { BaseController } from "./base/base.controller";
import { BaseAuthController } from "./base/base.auth.controller";

export class AuthController implements BaseAuthController {
    data: BaseData<User>;
    validator: BaseValidator;

    constructor(data: BaseData<User>, validator: BaseValidator) {
        this.data = data;
        this.validator = validator;
    }

    public getLoginForm(req, res) {
        return res.render("auth/login");
    }

    public getRegisterForm(req, res) {
        return res.render("auth/register", {
            error: req.query.error
        });
    }

    public loginUser(req, res) {
        if (req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    }

    public registerUser(req, res) {
        const encryptor = new Encryptor();
        const username = req.body.username;
        const password = req.body.password;

        let user = new User("", username, password);
        return Promise.resolve(user)
            .then((user) => {
                if (!this.validator.isValid(user.username)) {
                    throw new Error("ShortUsername");
                }
                return this.data.findOne({ username: user.username }, false);
            })
            .then((dbUser: User) => {
                if (dbUser) {
                    throw new Error("UserExists");
                }

                return this.data.add(user);
            })
            .then((user: User) => {
                return res.redirect("/auth/login");
            })
            .catch((err: Error) => {
                return res.status(401)
                    .redirect(`/auth/register?error=${err.message}`);
            });
    }

    public logoutUser(req, res) {
        req.logOut();
        res.redirect("/");
    }
}