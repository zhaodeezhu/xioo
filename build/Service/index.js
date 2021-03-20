"use strict";
var Service = /** @class */ (function () {
    // /** 第一个redis连接 */
    // redis: Redis;
    // /** redis连接组 */
    // redisGroup: Redis[]
    function Service(app) {
        this.app = app;
        // this.redis = this.app.redis;
        // this.redisGroup = this.app.service.redisGroup;
    }
    return Service;
}());
module.exports = Service;
