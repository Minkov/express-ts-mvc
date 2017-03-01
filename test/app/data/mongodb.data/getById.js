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
});