"use strict";
/**
 * 读取用户的配置信息
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-19 20:01:32
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 20:01:56
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var path = __importStar(require("path"));
var Config = /** @class */ (function () {
    function Config(app) {
        this.app = app;
        this.readAllConfig();
    }
    /** 读取config文件下的内容 */
    Config.prototype.readAllConfig = function () {
        var env = process.env.NODE_ENV;
        this.app.projectRoot;
        var ServerConfigSource = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './config'));
        // 服务端的配置
        var ServerConfig = new ServerConfigSource.server();
        var redis = ServerConfig.redis, httpServer = ServerConfig.httpServer, mysql = ServerConfig.mysql, socket = ServerConfig.socket, xioos = ServerConfig.xioos, props = __rest(ServerConfig, ["redis", "httpServer", "mysql", "socket", "xioos"]);
        this.redis = redis;
        this.http = httpServer;
        this.mysql = mysql;
        this.socketConfig = socket;
        // 读取xioos配置数据
        this.xioos = xioos;
        this.other = props;
    };
    return Config;
}());
module.exports = Config;
