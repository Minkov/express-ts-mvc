"use strict";
exports.__esModule = true;
var mongodb_store_factory_1 = require("./app/stores/mongodb.store.factory");
var auth_route_1 = require("./app/routes/auth.route");
var user_model_1 = require("./app/models/user.model");
var passport_auth_provider_1 = require("./app/auth/passport.auth.provider");
var path = require("path");
var config_1 = require("./app/config");
var authors_route_1 = require("./app/routes/authors.route");
var authors_controller_1 = require("./app/controllers/authors.controller");
var author_model_1 = require("./app/models/author.model");
var book_model_1 = require("./app/models/book.model");
var books_controller_1 = require("./app/controllers/books.controller");
var books_route_1 = require("./app/routes/books.route");
var ExpressApplication_1 = require("./app/ExpressApplication");
var db_1 = require("./app/db");
var logger_1 = require("./app/utils/logger");
var mongodb_data_1 = require("./app/data/mongodb.data");
var logger;
var db;
var storeFactory;
var booksData;
var authorsData;
var usersData;
var app;
var authProvider;
var booksController;
var authorsController;
Promise.resolve()
    .then(function () {
    return db_1.DbConfig.initMongoDb(config_1.connectionString);
})
    .then(function (dbInstance) {
    db = dbInstance;
    booksData = new mongodb_data_1.MongoDbData(db, book_model_1.Book, book_model_1.Book);
    authorsData = new mongodb_data_1.MongoDbData(db, author_model_1.Author, author_model_1.Author);
    usersData = new mongodb_data_1.MongoDbData(db, user_model_1.User, user_model_1.User);
    app = new ExpressApplication_1.ExpressApplication();
    logger = new logger_1.Logger();
    storeFactory = new mongodb_store_factory_1.MongoDbStoreFactory(db);
})
    .then(function () {
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "app", "views"));
})
    .then(function () {
    // app.useMiddleware(bodyParser.json());
    // app.useMiddleware(bodyParser.urlencoded({ extended: true }));
    app.useMiddleware(logger.getLoggerMiddleware());
})
    .then(function () {
    authProvider = new passport_auth_provider_1.PassportAuthProvider(usersData, config_1.secret, storeFactory);
    authProvider.addToApp(app);
})
    .then(function () {
    booksController = new books_controller_1.BooksController(booksData);
    authorsController = new authors_controller_1.AuthorsController(authorsData);
})
    .then(function () {
    var booksRoute = new books_route_1.BooksRoute(booksController);
    app.addRoute(booksRoute);
    var authorsRoute = new authors_route_1.AuthorsRoute(authorsController);
    app.addRoute(authorsRoute);
    var authRoute = new auth_route_1.AuthRoute(usersData);
    app.addRoute(authRoute);
})
    .then(function () {
    return app.start(config_1.port);
})
    .then(function () {
    console.log("Server running at :" + config_1.port);
});
