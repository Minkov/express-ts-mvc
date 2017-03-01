import { RedisStoreFactory } from './app/stores/redis.store.factory';
import { BaseStoreFactory } from "./app/stores/base/base.store.factory";
import { MongoDbStoreFactory } from "./app/stores/mongodb.store.factory";
import { AuthRoute } from "./app/routes/auth.route";
import { User } from "./app/models/user.model";
import { BaseAuthProvider } from "./app/auth/base/base.auth.provider";
import { PassportAuthProvider } from "./app/auth/passport.auth.provider";
import * as path from "path";
import * as bodyParser from "body-parser";

import { connectionString, port, secret, redisConnectionString } from "./app/config";

import { Application } from "./app/base/application";
import { AuthorsRoute } from "./app/routes/authors.route";
import { AuthorsController } from "./app/controllers/authors.controller";
import { Author } from "./app/models/author.model";

import { BaseController } from "./app/controllers/base/base.controller";
import { BaseData } from "./app/data/base/base.data";
import { Book } from "./app/models/book.model";
import { BooksController } from "./app/controllers/books.controller";
import { BooksRoute } from "./app/routes/books.route";

import { ExpressApplication } from "./app/ExpressApplication";
import { DbConfig } from "./app/db";
import { Logger } from "./app/utils/logger";
import { MongoDbData } from "./app/data/mongodb.data";

let logger;

let db;

let storeFactory: BaseStoreFactory;

let booksData: BaseData<Book>;
let authorsData: BaseData<Author>;
let usersData: BaseData<User>;

let app: Application;
let authProvider: BaseAuthProvider;

let booksController: BaseController<Book>;
let authorsController: BaseController<Author>;

Promise.resolve()
    .then(() => {
        return DbConfig.initMongoDb(connectionString);
    })
    // init
    .then(dbInstance => {
        db = dbInstance;
        booksData = new MongoDbData<Book>(db, Book, Book);
        authorsData = new MongoDbData<Author>(db, Author, Author);
        usersData = new MongoDbData<User>(db, User, User);
        app = new ExpressApplication();
        logger = new Logger();

        storeFactory = new MongoDbStoreFactory(db);
        
        // storeFactory = new RedisStoreFactory(redisConnectionString);
    })

    // add view engine
    .then(() => {
        app.set("view engine", "pug");
        app.set("views", path.join(__dirname, "app", "views"));
    })

    // add middlewares
    .then(() => {
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true }));
        app.useMiddleware(logger.getLoggerMiddleware());
    })

    // add static files
    .then(() => {
        const staticDir = path.join(__dirname, "../build", "app", "public");
        app.addStaticResource("/static", staticDir);
        const libsDir = path.join(__dirname, "../node_modules");
        app.addStaticResource("/libs", libsDir);
    })

    // add auth

    .then(() => {
        authProvider = new PassportAuthProvider(usersData, secret, storeFactory);
        authProvider.addToApp(app);
    })

    // init controller
    .then(() => {
        booksController = new BooksController(booksData);
        authorsController = new AuthorsController(authorsData);
    })

    // add routes
    .then(() => {
        let booksRoute = new BooksRoute(booksController);
        app.addRoute(booksRoute);

        let authorsRoute = new AuthorsRoute(authorsController);
        app.addRoute(authorsRoute);

        let authRoute = new AuthRoute(usersData);
        app.addRoute(authRoute);
    })

    // start application
    .then(() => {
        return app.start(port);
    })
    .then(() => {
        console.log(`Server running at :${port}`);
    });
