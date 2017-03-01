const expect = require("chai").expect;

let sinon = require("sinon");

let { BooksController } = require("../../../../build/app/controllers/books.controller.js");

describe("BooksController tests", () => {
    let items = [];
    let data;
    let controller;

    let req = {};

    let res = {
        model: null,
        viewName: "",
        render(viewName, model) {
            this.model = model;
            this.viewName = viewName;
            return this;
        }
    };

    beforeEach(() => {
        res.model = null;
        res.viewName = "";
        data = {
            getAll() {}
        };

        sinon.stub(data, "getAll", () => {
            return Promise.resolve(items);
        });

        controller = new BooksController(data);
    });

    it("Should render with \"books/books-all\" and model with books array", (done) => {
        controller.getAll(req, res)
            .then(() => {
                expect(res.model.model).eql(items)
                expect(res.viewName).eql("books/books-all");
                done();
            });
    });
});