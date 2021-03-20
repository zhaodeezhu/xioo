"use strict";
/** 基础Middleware，主要用于继承 */
var Plugin = /** @class */ (function () {
    function Plugin(app) {
        this.app = app;
    }
    return Plugin;
}());
module.exports = Plugin;
