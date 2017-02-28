"use strict";
exports.__esModule = true;
var User = (function () {
    function User(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    User.toModel = function (obj) {
        return {
            username: obj.username,
            password: obj.password
        };
    };
    User.fromModel = function (model) {
        var id = model.id || model._id;
        var username = model.username;
        var password = model.password;
        return new User(id, username, password);
    };
    return User;
}());
exports.User = User;
