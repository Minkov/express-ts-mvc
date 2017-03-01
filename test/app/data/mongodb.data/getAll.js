const expect = require("chai").expect;

let sinon = require("sinon");

let { MongoDbData } = require("../../../../build/app/data/mongodb.data");

describe("getAll()", () => {
    let data;
    let items = [];

    class Test {
        static toModel(obj) {
            return obj;
        }

        static fromModel(model) {
            return model;
        }
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

        data = new MongoDbData(db, Test, Test);
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

        it("should return empty array, when there are no items", (done) => {
            items = [];
            data.getAll()
                .then(resultItems => {
                    expect(resultItems).to.eql(items);
                    done();
                });
        });


        describe("should return array", () => {
            it("Of one item, when there is one item", (done) => {
                items = [new Test()];
                data.getAll()
                    .then(resultItems => {
                        expect(resultItems).have.length(items.length);
                        expect(resultItems).to.eql(items);
                        done();
                    });
            });


            it("Of many items, when there are many items", (done) => {
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