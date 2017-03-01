const expect = require("chai").expect;

let sinon = require("sinon");

let { MongoDbData } = require("../../../../build/app/data/mongodb.data");

describe("getAll()", () => {
    let data;
    let items = [];

    class Test {

    }
    let modelFuncs = {
        toModel: (obj) => obj,
        fromModel: (model) => model
    }

    beforeEach(() => {
        let db = {
            collection() {}
        };

        sinon.stub(db, "collection", () => {
            return {
                find() {
                    return {
                        toArray() {
                            return Promise.resolve(items);
                        }
                    }
                }
            }
        });

        data = new MongoDbData(db, Test, modelFuncs);
    });

    describe("Invalid tests", () => {
        it("should return empty array, when items are null", (done) => {
            items = null;
            data.getAll()
                .then(items => {
                    expect(items).to.eql([]);
                    done();
                })
        });
    });

    describe("Correct tests", () => {
        describe("where there are no items", () => {
            it("should return empty array", (done) => {
                items = [];
                data.getAll()
                    .then(resultItems => {
                        expect(resultItems).to.eql(items);
                        done();
                    });
            });
        });


        describe("when there are items", () => {
            it("should return array with one item", (done) => {
                items = [new Test()];
                data.getAll()
                    .then(resultItems => {
                        expect(resultItems).have.length(items.length);
                        expect(resultItems).to.eql(items);
                        done();
                    });
            });


            it("should return array with one item", (done) => {
                items = [new Test(), new Test(), new Test()];
                data.getAll()
                    .then(resultItems => {
                        expect(resultItems).have.length(items.length);
                        expect(resultItems).to.eql(items);
                        done();
                    });
            });
        });
    });
});