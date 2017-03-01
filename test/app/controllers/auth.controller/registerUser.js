const expect = require("chai").expect;

let sinon = require("sinon");

let { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } = require("../../../../build/app/config");

let { StringValidator } = require("../../../../build/app/validators/string.validator");

let { AuthController } = require("../../../../build/app/controllers/auth.controller");

describe("AuthController#registerUser", () => {
    let data = {
        findOne: (query) => {},
        add: (item) => {}
    };

    let encryptor = {
        encrypt: (pass) => pass
    };

    let res = {
        redirectUrl: "",
        statusCode: 200,
        redirect: (url) => {
            res.redirectUrl = url;
            return res;
        },
        status: (statusCode) => {
            res.statusCode = statusCode;
            return res;
        }
    };

    let req = {};

    let controller;

    let validator = new StringValidator(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH);

    beforeEach(() => {
        controller = new AuthController(data, validator, encryptor);
    });

    afterEach(() => {
        data.findOne.restore();
    });

    describe("when credentials are valid", () => {
        beforeEach(() => {
            sinon.stub(data, "findOne", () => {
                return Promise.resolve(null);
            });
            req.body = {
                username: "Valid Username",
                password: "Pa$$w0rD"
            }
        });


        it("should redirect to /auth/login", (done) => {
            controller.registerUser(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.equal("/auth/login");
                    done();
                });
        });
    });

    describe("when credentials are invalid", () => {
        beforeEach(() => {
            sinon.stub(data, "findOne", () => {
                return Promise.resolve(null);
            });
        });

        describe("too short username", () => {
            beforeEach(() => {
                req.body = {
                    username: "a".repeat(USERNAME_MIN_LENGTH - 1),
                    password: "Pa$$w0rD"
                }
            });

            it("should redirect to /auth/login", (done) => {
                controller.registerUser(req, res)
                    .then(() => {
                        expect(res.redirectUrl).to.eql("/auth/register?error=ShortUsername");
                        done();
                    });
            });
        });

        describe("too long username", () => {
            beforeEach(() => {
                req.body = {
                    username: "a".repeat(USERNAME_MAX_LENGTH + 1),
                    password: "Pa$$w0rD"
                }
            });

            it("should redirect to /auth/login", (done) => {
                controller.registerUser(req, res)
                    .then(() => {
                        expect(res.redirectUrl).to.eql("/auth/register?error=ShortUsername");
                        done();
                    });
            });
        });
    });
});