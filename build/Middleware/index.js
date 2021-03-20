"use strict";
/** 基础Middleware，主要用于继承 */
var Middleware = /** @class */ (function () {
    function Middleware(app) {
        this.app = app;
    }
    return Middleware;
}());
module.exports = Middleware;
