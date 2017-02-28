import { BaseStoreFactory } from './../stores/base/base.store.factory';
import { Application } from "./../base/application";
import { User } from "./../models/user.model";
import { BaseData } from "../data/base/base.data";
import * as passport from "passport";
import { Strategy } from "passport-local";

import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";

import { ObjectID } from "mongodb";

import { BaseAuthProvider } from "./base/base.auth.provider";
export class PassportAuthProvider implements BaseAuthProvider {
    data: BaseData<User>;
    secret: string;
    storeFactory: BaseStoreFactory;

    constructor(data: BaseData<User>, secret: string, storeFactory: BaseStoreFactory) {
        this.data = data;
        this.secret = secret;
        this.storeFactory = storeFactory;
    }

    public addToApp(app: Application) {
        app.useMiddleware(cookieParser());
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true }));
        app.useMiddleware(session({
            secret: this.secret,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 1000 * 60 },
            store: this.storeFactory.getStore()
        }));

        app.useMiddleware(passport.initialize());
        app.useMiddleware(passport.session());

        passport.use(new Strategy((username: string, password: string, done: Function) => {
            this.data.findOne({ username, password })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }

                    return done(null, user);
                })
                .catch(err => done(err));
        }));

        passport.serializeUser((user: User, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id: string, done) => {
            this.data.getById(id)
                .then(user => {
                    done(null, user);
                })
                .catch(err => done(err));
        });

    }
}