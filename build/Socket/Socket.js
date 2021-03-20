"use strict";
var structrue_1 = require("./structrue");
var Socket = /** @class */ (function () {
    function Socket(app) {
        this.app = app;
    }
    Socket.Path = structrue_1.Path;
    Socket.Route = structrue_1.Route;
    return Socket;
}());
module.exports = Socket;
